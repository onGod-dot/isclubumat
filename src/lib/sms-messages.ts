function truncate(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1)}…`;
}

export function membershipConfirmationMessage(name: string): string {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  return `Hi ${firstName}, thank you for registering your interest in IS Club UMaT. We have received your application and will be in touch soon. — IS Club`;
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
    input.interests.length > 0 ? input.interests.join(", ") : "Not specified";
  const reason = input.reason ? ` Reason: ${truncate(input.reason, 80)}.` : "";

  return truncate(
    `IS Club: New membership interest from ${input.name} (${input.studentId}), ${input.level} ${input.department}. Phone: ${input.phone}. Interests: ${interests}.${reason}`,
    320,
  );
}

export function contactConfirmationMessage(name: string, subject: string): string {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  return `Hi ${firstName}, thank you for contacting IS Club UMaT. We have received your message about "${truncate(subject, 60)}" and will respond shortly. — IS Club`;
}

export function contactAdminAlertMessage(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return truncate(
    `IS Club: New message from ${input.name}. Subject: ${input.subject}. Phone: ${input.phone}. Email: ${input.email}. Message: ${input.message}`,
    320,
  );
}
