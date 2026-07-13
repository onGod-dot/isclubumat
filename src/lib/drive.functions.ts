import { createServerFn } from "@tanstack/react-start";
import { listPublicFolderFiles } from "./drive-public";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  iconLink?: string;
  isFolder?: boolean;
};

export const listDriveFolder = createServerFn({ method: "GET" })
  .validator((data: { folderId: string }) => {
    if (!data || typeof data.folderId !== "string" || !/^[A-Za-z0-9_-]{10,}$/.test(data.folderId)) {
      throw new Error("Invalid folderId");
    }
    return data;
  })
  .handler(async ({ data }): Promise<{ files: DriveFile[]; error?: string }> => {
    const result = await listPublicFolderFiles(data.folderId);
    return {
      files: result.files.map((entry) => ({
        id: entry.id,
        name: entry.name,
        mimeType: entry.mimeType,
        modifiedTime: entry.modifiedTime,
        isFolder: entry.isFolder,
      })),
      error: result.error,
    };
  });
