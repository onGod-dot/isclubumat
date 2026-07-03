import { createServerFn } from "@tanstack/react-start";

export type DriveEntry = {
  id: string;
  name: string;
  mimeType: string;
  isFolder: boolean;
};

export const listDriveFolder = createServerFn({ method: "GET" })
  .inputValidator((data: { folderId: string }) => {
    if (!data || typeof data.folderId !== "string" || !/^[A-Za-z0-9_-]+$/.test(data.folderId)) {
      throw new Error("Invalid folderId");
    }
    return data;
  })
  .handler(async ({ data }): Promise<DriveEntry[]> => {
    const url = `https://drive.google.com/embeddedfolderview?id=${data.folderId}#list`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
    });
    if (!res.ok) throw new Error(`Drive fetch failed: ${res.status}`);
    const html = await res.text();

    const entries: DriveEntry[] = [];
    const entryRegex =
      /<div class="flip-entry" id="entry-([A-Za-z0-9_-]+)"[\s\S]*?<img src="https:\/\/drive-thirdparty\.googleusercontent\.com\/16\/type\/([^"]+)"[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div>/g;
    let m: RegExpExecArray | null;
    while ((m = entryRegex.exec(html)) !== null) {
      const mimeType = decodeURIComponent(m[2]);
      entries.push({
        id: m[1],
        mimeType,
        name: m[3].trim(),
        isFolder: mimeType === "application/vnd.google-apps.folder",
      });
    }
    return entries;
  });