import { createServerFn } from "@tanstack/react-start";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  iconLink?: string;
};

export const listDriveFolder = createServerFn({ method: "GET" })
  .inputValidator((data: { folderId: string }) => {
    if (!data || typeof data.folderId !== "string" || !/^[A-Za-z0-9_-]{10,}$/.test(data.folderId)) {
      throw new Error("Invalid folderId");
    }
    return data;
  })
  .handler(async ({ data }): Promise<{ files: DriveFile[]; error?: string }> => {
    const key = process.env.GOOGLE_DRIVE_API_KEY;
    if (!key) return { files: [], error: "Drive API key not configured" };

    const params = new URLSearchParams({
      q: `'${data.folderId}' in parents and trashed = false`,
      fields: "files(id,name,mimeType,size,modifiedTime,iconLink)",
      pageSize: "1000",
      orderBy: "name",
      key,
    });

    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
      if (!res.ok) {
        const body = await res.text();
        console.error(`Drive list failed [${res.status}]: ${body}`);
        return { files: [], error: `Drive API error (${res.status})` };
      }
      const json = (await res.json()) as { files?: DriveFile[] };
      return { files: json.files ?? [] };
    } catch (err) {
      console.error("Drive list threw:", err);
      return { files: [], error: "Failed to reach Google Drive" };
    }
  });