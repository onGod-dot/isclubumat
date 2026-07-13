import { MNOTIFY_CREDENTIALS } from "@/lib/mnotify-credentials";

const MNOTIFY_URL = "https://api.mnotify.com/api/sms/quick";

function getConfig() {
  return {
    apiKey: MNOTIFY_CREDENTIALS.apiKey,
    sender: MNOTIFY_CREDENTIALS.sender,
    adminNumbers: [...MNOTIFY_CREDENTIALS.adminNumbers],
  };
}

export function getAdminRecipients(): string[] {
  return getConfig().adminNumbers;
}

export async function sendSms({ recipients, message }: SendSmsOptions): Promise<void> {
  const { apiKey, sender } = getConfig();

  const uniqueRecipients = [...new Set(recipients.filter(Boolean))];
  if (uniqueRecipients.length === 0) {
    throw new Error("No SMS recipients");
  }

  const res = await fetch(`${MNOTIFY_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: uniqueRecipients,
      sender,
      message,
      is_schedule: false,
      schedule_date: "",
    }),
  });

  const data = (await res.json().catch(() => ({}))) as MnotifyResponse;

  if (!res.ok) {
    throw new Error(data.message ?? `mNotify request failed (${res.status})`);
  }

  if (data.status && data.status !== "success") {
    throw new Error(data.message ?? "mNotify rejected the SMS request");
  }
}
