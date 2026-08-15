// Zap webhook target for the PAID-traffic form. Source is hardcoded here —
// never read from the request body — so attribution can't be wrong due to
// a bad field mapping upstream. Point the paid form's zap at this URL and
// nothing else needs to change on that side.
import { NextRequest, NextResponse } from "next/server";
import { handleLeadIntake } from "../_lib/leadsIntake";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const result = await handleLeadIntake(body, "Paid");
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Failed", detail: String(err) }, { status: 502 });
  }
}
