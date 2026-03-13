const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;
const FORM_GUID = process.env.HUBSPOT_FORM_GUID;

export async function upsertContact({
  email,
  name,
  company,
  marketingOptIn,
  pageUri,
  pageName,
}: {
  email: string;
  name: string;
  company?: string;
  marketingOptIn?: boolean;
  pageUri: string;
  pageName: string;
}) {
  if (!PORTAL_ID || !FORM_GUID) return; // not configured — skip silently

  const [firstname, ...rest] = name.trim().split(/\s+/);
  const lastname = rest.join(" ") || "";

  const fields: { name: string; value: string }[] = [
    { name: "email",     value: email },
    { name: "firstname", value: firstname },
    { name: "lastname",  value: lastname },
  ];
  if (company) fields.push({ name: "company", value: company });

  const body = {
    fields,
    context: { pageUri, pageName },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I submitted this form on intenx.io",
        communications: [
          {
            value: marketingOptIn ?? false,
            subscriptionTypeId: 999,
            text: "I agree to receive occasional product updates and news from INTenX.",
          },
        ],
      },
    },
  };

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      console.error("HubSpot form submit failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("HubSpot form submit error:", err);
  }
}
