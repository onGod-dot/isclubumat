function truncate(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1)}…`;
}

function noHyphens(text: string): string {
  return text.replace(/[-–—]/g, " ").replace(/\s+/g, " ").trim();
}

export function membershipConfirmationMessage(name: string): string {
  const firstName = noHyphens(name.trim().split(/\s+/)[0] || "there");
  return `Hi ${firstName}, thank you for registering your interest in IS Club UMaT. We have received your application and will be in touch soon. IS Club`;
}

export function membershipAdminAlertMessage(input: {
  name: string;
  studentId: string;
  department: string;
  level: string;
  phone: string;
  email: string;
  interests: string[];
  reason?: string;
}): string {
  const interests =
    input.interests.length > 0
      ? input.interests.map(noHyphens).join(", ")
      : "Not specified";
  const reason = input.reason ? ` Reason: ${truncate(noHyphens(input.reason), 80)}.` : "";

  return truncate(
    `IS Club: New membership interest from ${noHyphens(input.name)} (${noHyphens(input.studentId)}), ${noHyphens(input.level)} ${noHyphens(input.department)}. Phone: ${input.phone}. Interests: ${interests}.${reason}`,
    320,
  );
}

export function contactConfirmationMessage(name: string, subject: string): string {
  const firstName = noHyphens(name.trim().split(/\s+/)[0] || "there");
  return `Hi ${firstName}, thank you for contacting IS Club UMaT. We have received your message about "${truncate(noHyphens(subject), 60)}" and will respond shortly. IS Club`;
}

export function contactAdminAlertMessage(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return truncate(
    `IS Club: New message from ${noHyphens(input.name)}. Subject: ${noHyphens(input.subject)}. Phone: ${input.phone}. Email: ${input.email}. Message: ${noHyphens(input.message)}`,
    320,
  );
}
