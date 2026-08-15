// One-time repair: fixes row 3 (weekday names) on the "8/16-8/22" tab that
// ensure-weekly-tab created before the weekday-row fix, then deletes the
// pre-existing "08/16-08/22" tab which had garbage/wrong dates and no real
// data in it (dashes only).
import { NextResponse } from "next/server";
import { getGoogleAccessToken, sheetsFetch } from "../_lib/googleSheets";

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function GET() {
  try {
    const accessToken = await getGoogleAccessToken();

    // Fix row 3 on the correctly-dated tab.
    await sheetsFetch(accessToken, "/values:batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        valueInputOption: "RAW",
        data: [{ range: `'8/16-8/22'!B3:H3`, values: [WEEKDAY_NAMES] }],
      }),
    });

    // Find the sheetId of the broken duplicate tab to delete it.
    const meta = await sheetsFetch(accessToken, "?fields=sheets.properties");
    const props: { sheetId: number; title: string }[] = (meta.sheets || []).map(
      (s: { properties: { sheetId: number; title: string } }) => s.properties
    );
    const broken = props.find((p) => p.title === "08/16-08/22");
    if (!broken) {
      return NextResponse.json({ ok: true, row3Fixed: true, deleted: false, reason: "08/16-08/22 not found (already gone?)" });
    }

    await sheetsFetch(accessToken, ":batchUpdate", {
      method: "POST",
      body: JSON.stringify({ requests: [{ deleteSheet: { sheetId: broken.sheetId } }] }),
    });

    return NextResponse.json({ ok: true, row3Fixed: true, deletedTab: "08/16-08/22", deletedSheetId: broken.sheetId });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
