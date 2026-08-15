// Temporary: inspect specific tabs' header rows to diagnose the
// duplicate-tab incident.
import { NextResponse } from "next/server";
import { getGoogleAccessToken, sheetsFetch } from "../_lib/googleSheets";

export async function GET() {
  try {
    const accessToken = await getGoogleAccessToken();
    const titles = ["08/16-08/22", "8/16-8/22", "8/9-8/15"];
    const out: Record<string, unknown> = {};
    for (const title of titles) {
      const range = `'${title.replace(/'/g, "''")}'!A1:H5`;
      try {
        const res = await sheetsFetch(accessToken, `/values/${encodeURIComponent(range)}`);
        out[title] = res.values || [];
      } catch (e) {
        out[title] = { error: String(e) };
      }
    }
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
