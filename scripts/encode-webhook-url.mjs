#!/usr/bin/env node

const SALT = "ISClubUMaT";

function pack(value) {
  const key = Buffer.from(SALT);
  const raw = Buffer.from(value);
  const xored = Buffer.from(raw.map((byte, index) => byte ^ key[index % key.length]));
  return xored.toString("base64");
}

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/encode-webhook-url.mjs "https://script.google.com/macros/s/.../exec"');
  process.exit(1);
}

console.log(pack(url));
