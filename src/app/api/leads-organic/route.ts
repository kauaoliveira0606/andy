// Zap webhook target for the ORGANIC-traffic form. Source is hardcoded here
// — never read from the request body — so attribution can't be wrong due
// to a bad field mapping upstream. Point the organic zap at this URL.
import { NextRequest, NextResponse } from "next/server";
import { handleLeadIntake } from "../_lib/leadsIntake";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const result = await handleLeadIntake(body, "Organic");
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Failed", detail: String(err) }, { status: 502 });
  }
}
