/** Normalize Ghana phone numbers to local 0XXXXXXXXX format for mNotify. */
export function normalizeGhanaPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (!digits) return null;

  let local = digits;
  if (local.startsWith("233") && local.length >= 12) {
    local = `0${local.slice(3)}`;
  }

  if (local.length === 9 && /^[235]/.test(local)) {
    local = `0${local}`;
  }

  if (!/^0[235]\d{8}$/.test(local)) return null;
  return local;
}
