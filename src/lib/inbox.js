// Orders and feedback are emailed through Web3Forms (web3forms.com). The
// access key below is tied to the ministry inbox; it is meant to be public
// and works from any domain. Get one by entering the inbox address on
// web3forms.com — the key arrives by email.
const WEB3FORMS_ACCESS_KEY = "1deb3e46-1953-488a-a022-3b5a9095d3ae";
const ENDPOINT = "https://api.web3forms.com/submit";

// Sends `fields` (label → value) to the ministry inbox.
// Resolves to { ok, error }: `error` is null when the message was accepted,
// "setup" when the access key is missing or rejected, or "failed".
export async function sendToInbox(subject, fields) {
  if (!WEB3FORMS_ACCESS_KEY) return { ok: false, error: "setup" };
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "Seed Ministries Website",
        ...fields,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.success === true) return { ok: true, error: null };
    const badKey = /access.?key/i.test(String(result.message ?? ""));
    return { ok: false, error: badKey ? "setup" : "failed" };
  } catch {
    return { ok: false, error: "failed" };
  }
}

// Message shown in a form when sending did not work.
export const sendErrorMessage = (error) =>
  error === "setup"
    ? "Sorry, this form is not set up yet. Please contact us by phone for now."
    : "Sorry, your request could not be sent. Please check your internet connection and try again in a moment.";

// Indian mobile number, with or without +91 / leading 0, spaces or dashes.
export const isValidMobile = (mobile) =>
  /^[6-9]\d{9}$/.test(mobile.replace(/[\s-]/g, "").replace(/^(\+91|0)/, ""));

// Six-digit Indian PIN code (never starts with 0).
export const isValidPincode = (pincode) => /^[1-9]\d{5}$/.test(pincode.replace(/\s/g, ""));
