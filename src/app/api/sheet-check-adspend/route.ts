// Temporary: check what's actually in the current week's Ad Spend Meta row.
import { NextResponse } from "next/server";
import { getGoogleAccessToken, sheetsFetch, findTodayTabAndColumn, nyToday } from "../_lib/googleSheets";

export async function GET() {
  try {
    const accessToken = await getGoogleAccessToken();
    const today = nyToday();
    const target = await findTodayTabAndColumn(accessToken, today);
    if (!target) return NextResponse.json({ error: "No tab found for today" }, { status: 404 });

    const safeTitle = target.title.replace(/'/g, "''");
    const range = `'${safeTitle}'!A1:H24`;
    const res = await sheetsFetch(accessToken, `/values/${encodeURIComponent(range)}`);
    return NextResponse.json({ tab: target.title, values: res.values });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
