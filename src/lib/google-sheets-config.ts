const SALT = "ISClubUMaT";

function unpack(encoded: string): string {
  if (!encoded) return "";
  const key = Buffer.from(SALT);
  const raw = Buffer.from(encoded, "base64");
  return Buffer.from(raw.map((byte, index) => byte ^ key[index % key.length]!)).toString("utf8");
}

/**
 * Google Sheets webhook for form submissions.
 * Sheet owner: informationsystem.club@gmail.com
 *
 * Paste your deployed Apps Script web app URL here (XOR + base64 encoded).
 * Run: node scripts/encode-webhook-url.mjs "https://script.google.com/macros/s/.../exec"
 * Leave empty to skip Google Sheets logging until configured.
 */
const ENCODED_WEBHOOK_URL = "";

export function getGoogleSheetsWebhookUrl(): string | null {
  const url = unpack(ENCODED_WEBHOOK_URL).trim();
  return url || null;
}
