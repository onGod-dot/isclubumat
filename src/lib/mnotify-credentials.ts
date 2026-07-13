const SALT = "ISClubUMaT";

/** XOR + base64 unpack — keeps credentials out of plain text in source. */
function unpack(encoded: string): string {
  const key = Buffer.from(SALT);
  const raw = Buffer.from(encoded, "base64");
  return Buffer.from(raw.map((byte, index) => byte ^ key[index % key.length]!)).toString("utf8");
}

export const MNOTIFY_CREDENTIALS = {
  apiKey: unpack("CiMhGTM2JB4ZAXEdNVRBKAQ/MRIrYXcqIA=="),
  sender: unpack("AABjLzk3Fw=="),
  adminNumbers: ["0204319050", "0553586495"],
} as const;
