const HUBSPOT_API = "https://api.hubapi.com";

export async function upsertContact({
  email,
  name,
  company,
}: {
  email: string;
  name: string;
  company?: string;
}) {
  const token = process.env.HUBSPOT_API_KEY;
  if (!token) return; // not configured — skip silently

  const [firstname, ...rest] = name.trim().split(/\s+/);
  const lastname = rest.join(" ") || "";

  const properties: Record<string, string> = { email, firstname, lastname };
  if (company) properties.company = company;

  try {
    const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ properties }),
    });

    // 409 = contact already exists — that's fine
    if (!res.ok && res.status !== 409) {
      console.error("HubSpot upsert failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("HubSpot upsert error:", err);
  }
}
