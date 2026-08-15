// Idempotent daily check: if no tab exists yet covering the week right
// after the latest known tab, duplicate the latest tab (carrying over its
// Daily Goal / Weekly Goal / Metric Source columns and formulas, same as
// the manual "copy the tab to the right" process), set the new week's
// dates in row 2, and clear the old day-values so the new week starts
// blank. Safe to run daily via cron — a no-op once the week's tab exists.
import { NextResponse } from "next/server";
import { getGoogleAccessToken, sheetsFetch, listTabsWithDateRanges, duplicateTab, fmtSheetDate, fmtTabTitle, colLetter } from "../_lib/googleSheets";

export const maxDuration = 60;

const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function GET() {
  if (!GOOGLE_SERVICE_ACCOUNT_KEY) {
    return NextResponse.json({ error: "GOOGLE_SERVICE_ACCOUNT_KEY not set" }, { status: 500 });
  }

  try {
    const accessToken = await getGoogleAccessToken();
    const tabs = await listTabsWithDateRanges(accessToken);
    const withDates = tabs.filter((t) => t.dates.length > 0);

    if (!withDates.length) {
      return NextResponse.json({ error: "No tabs with a readable date row found — can't determine what week comes next." }, { status: 500 });
    }

    // The tab containing the latest date of all, and that date itself.
    let latestTab = withDates[0];
    let latestDate = withDates[0].dates[0];
    for (const t of withDates) {
      for (const d of t.dates) {
        if (d.getTime() > latestDate.getTime()) {
          latestDate = d;
          latestTab = t;
        }
      }
    }

    const nextWeekStart = new Date(latestDate.getTime() + DAY_MS);
    const nextWeekEnd = new Date(nextWeekStart.getTime() + 6 * DAY_MS);

    // Already covered by some tab?
    const alreadyExists = withDates.some((t) => t.dates.some((d) => d.getTime() === nextWeekStart.getTime()));
    if (alreadyExists) {
      return NextResponse.json({ ok: true, skipped: true, reason: `A tab already covers ${nextWeekStart.toDateString()}.` });
    }

    const newTitle = fmtTabTitle(nextWeekStart, nextWeekEnd);
    const newSheetId = await duplicateTab(accessToken, latestTab.sheetId, newTitle);

    const weekDates = Array.from({ length: 7 }, (_, i) => new Date(nextWeekStart.getTime() + i * DAY_MS));
    const dateRowValues = weekDates.map(fmtSheetDate);

    // Row 2 = dates, row 3 = weekday names (always Sun-Sat, B through H —
    // written directly rather than relying on any formula/automation carried
    // over from the duplicated tab). Clear old day-values (cols B-H, rows
    // 4-19) so the new week starts blank; leave I:L (goals/summary/source)
    // and rows 20-24 (the divider + the other automation's ROAS/CPA rows)
    // alone.
    const safeTitle = newTitle.replace(/'/g, "''");
    await sheetsFetch(accessToken, "/values:batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        valueInputOption: "RAW",
        data: [
          { range: `'${safeTitle}'!B2:${colLetter(dateRowValues.length)}2`, values: [dateRowValues] },
          { range: `'${safeTitle}'!B3:${colLetter(WEEKDAY_NAMES.length)}3`, values: [WEEKDAY_NAMES] },
        ],
      }),
    });
    await sheetsFetch(accessToken, `/values/${encodeURIComponent(`'${safeTitle}'!B4:H19`)}:clear`, {
      method: "POST",
      body: JSON.stringify({}),
    });

    return NextResponse.json({
      ok: true,
      created: newTitle,
      sheetId: newSheetId,
      duplicatedFrom: latestTab.title,
      weekStart: nextWeekStart.toDateString(),
      weekEnd: nextWeekEnd.toDateString(),
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed", detail: String(err) }, { status: 502 });
  }
}
