// Shared handler for the paid/organic lead intake webhooks. The Source
// value is ALWAYS passed in by the caller (hardcoded per-route, never read
// from the request body) — attribution is determined by which URL the zap
// hits, not by any field inside the payload, so a bad field mapping upstream
// can't silently misattribute a lead.
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = "appgcEYqudlGfqBjE";
const LEADS_TABLE = "Leads";

function pick(body: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = body[k];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number") return String(v);
  }
  return "";
}

async function airtableFetch(path: string, init?: RequestInit) {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Airtable ${path} failed: ${res.status} ${JSON.stringify(data)}`);
  return data;
}

export async function handleLeadIntake(body: Record<string, unknown>, source: "Paid" | "Organic") {
  if (!AIRTABLE_TOKEN) throw new Error("AIRTABLE_TOKEN not set");

  const name = pick(body, ["name", "Name", "full_name", "fullName", "first_name"]);
  const email = pick(body, ["email", "Email", "email_address"]);
  const phone = pick(body, ["phone", "Phone", "phone_number", "phoneNumber"]);

  // De-dupe: a zap retry (or the platform double-firing) shouldn't create a
  // second record. "Created At" only stores a date, not a time, so the
  // finest-grained de-dupe window that field actually supports is same
  // email + same calendar day — good enough for catching webhook retries,
  // which land seconds/minutes apart, not a real distinct lead.
  if (email) {
    const formula = `AND({Email} = "${email.replace(/"/g, '\\"')}", IS_SAME({Created At}, TODAY(), "day"))`;
    const existing = await airtableFetch(
      `/${encodeURIComponent(LEADS_TABLE)}?filterByFormula=${encodeURIComponent(formula)}&pageSize=1`
    );
    if ((existing.records || []).length > 0) {
      return { ok: true, deduped: true, recordId: existing.records[0].id };
    }
  }

  const created = await airtableFetch(`/${encodeURIComponent(LEADS_TABLE)}`, {
    method: "POST",
    body: JSON.stringify({
      fields: {
        Name: name || "Unknown",
        Email: email || undefined,
        Phone: phone || undefined,
        Source: source,
        "Created At": new Date().toISOString().slice(0, 10),
      },
    }),
  });

  return { ok: true, deduped: false, recordId: created.id };
}
