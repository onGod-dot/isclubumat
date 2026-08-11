import { getGoogleSheetsWebhookUrl } from "@/lib/google-sheets-config";

export type FormSubmissionType = "contact" | "membership" | "event";

type SubmissionPayload = Record<string, string | string[] | undefined>;

export async function persistFormSubmission(
  formType: FormSubmissionType,
  data: SubmissionPayload,
): Promise<void> {
  const url = getGoogleSheetsWebhookUrl();
  if (!url) return;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formType,
      submittedAt: new Date().toISOString(),
      ...data,
    }),
    redirect: "follow",
  });

  const text = await res.text();
  let result: { ok?: boolean; error?: string } = {};
  try {
    result = JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    throw new Error(`Google Sheets webhook returned invalid response: ${text.slice(0, 200)}`);
  }

  if (!res.ok || result.error) {
    throw new Error(result.error ?? `Google Sheets webhook failed (${res.status})`);
  }
}

export function logFormSubmission(formType: FormSubmissionType, data: SubmissionPayload): void {
  void persistFormSubmission(formType, data).catch((error) => {
    console.error(`Google Sheets persist failed [${formType}]:`, error);
  });
}
