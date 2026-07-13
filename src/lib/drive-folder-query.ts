import type { DriveFile } from "@/lib/drive.functions";

export type FolderListing = { files: DriveFile[]; error?: string };

export const driveFolderQueryKey = (folderId: string) => ["drive-folder", folderId] as const;

export async function fetchFolderListing(folderId: string): Promise<FolderListing> {
  const res = await fetch(`/api/public/drive-folder/${folderId}`);
  if (!res.ok) {
    throw new Error(`Folder request failed (${res.status})`);
  }
  return res.json() as Promise<FolderListing>;
}
