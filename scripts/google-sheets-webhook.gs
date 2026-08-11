/**
 * IS Club UMaT — form submissions → Google Sheet
 *
 * Google account: informationsystem.club@gmail.com
 *
 * Setup:
 * 1. Sign in to Google as informationsystem.club@gmail.com
 * 2. Create a new Google Sheet (e.g. "IS Club Form Submissions")
 * 3. Extensions → Apps Script → paste this file → Save
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me (informationsystem.club@gmail.com)
 *    - Who has access: Anyone
 * 5. Copy the web app URL
 * 6. In the project repo, run:
 *      node scripts/encode-webhook-url.mjs "YOUR_WEB_APP_URL"
 * 7. Paste the encoded string into src/lib/google-sheets-config.ts (ENCODED_WEBHOOK_URL)
 */

const SHEETS = {
  contact: "Contact",
  membership: "Membership",
  event: "Events",
};

const HEADERS = {
  contact: ["Timestamp", "Name", "Email", "Phone", "Subject", "Message"],
  membership: [
    "Timestamp",
    "Name",
    "Student ID",
    "Department",
    "Level",
    "Phone",
    "Email",
    "Interests",
    "Reason",
  ],
  event: [
    "Timestamp",
    "Event",
    "Date",
    "Time",
    "Venue",
    "Name",
    "Email",
    "Phone",
    "Index No",
    "Notes",
  ],
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents);
    const formType = body.formType;
    if (!SHEETS[formType]) {
      throw new Error("Unknown form type: " + formType);
    }

    const sheet = getOrCreateSheet(formType);
    sheet.appendRow(buildRow(formType, body));

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ error: String(err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet(formType) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = SHEETS[formType];
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    const headers = HEADERS[formType];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function buildRow(formType, body) {
  const ts = body.submittedAt || new Date().toISOString();

  if (formType === "contact") {
    return [ts, body.name, body.email, body.phone, body.subject, body.message];
  }

  if (formType === "membership") {
    const interests = Array.isArray(body.interests)
      ? body.interests.join(", ")
      : body.interests || "";
    return [
      ts,
      body.name,
      body.studentId,
      body.department,
      body.level,
      body.phone,
      body.email,
      interests,
      body.reason || "",
    ];
  }

  if (formType === "event") {
    return [
      ts,
      body.eventTitle,
      body.eventDate,
      body.eventTime,
      body.eventVenue,
      body.name,
      body.email,
      body.phone,
      body.indexNo || "",
      body.notes || "",
    ];
  }

  throw new Error("Unknown form type");
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Run once from the Apps Script editor to pre-create all tabs with headers. */
function setupAllSheets() {
  Object.keys(SHEETS).forEach(function (formType) {
    getOrCreateSheet(formType);
  });
}
