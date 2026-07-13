export const DRIVE_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const FOLDER_MIME = "application/vnd.google-apps.folder";

export type ParsedDriveEntry = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  isFolder: boolean;
};

export function driveDownloadUrl(fileId: string) {
  return `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`;
}

export function embeddedFolderViewUrl(folderId: string) {
  return `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(folderId)}#list`;
}

export async function fetchEmbeddedFolderHtml(folderId: string): Promise<string> {
  const res = await fetch(embeddedFolderViewUrl(folderId), {
    headers: { "User-Agent": DRIVE_USER_AGENT },
  });
  if (!res.ok) {
    throw new Error(`Drive folder fetch failed (${res.status})`);
  }
  return res.text();
}

/** Parse the public embeddedfolderview HTML into file/folder entries. */
export function parseEmbeddedFolderView(html: string): ParsedDriveEntry[] {
  const entries: ParsedDriveEntry[] = [];
  const chunks = html.split(/<div class="flip-entry"/);

  for (const chunk of chunks.slice(1)) {
    const idMatch = chunk.match(/^ id="entry-([^"]+)"/);
    const titleMatch = chunk.match(/class="flip-entry-title">([^<]*)</);
    if (!idMatch || !titleMatch) continue;

    const modifiedMatch = chunk.match(/class="flip-entry-last-modified">\s*<div>([^<]*)</);
    const mimeMatch = chunk.match(/\/type\/([^"]+)/);
    const isFolder =
      chunk.includes("drive/folders/") || chunk.includes("drive-sprite-folder");

    entries.push({
      id: idMatch[1],
      name: titleMatch[1].trim(),
      mimeType: isFolder ? FOLDER_MIME : (mimeMatch?.[1] ?? "application/octet-stream"),
      modifiedTime: modifiedMatch?.[1]?.trim() || undefined,
      isFolder,
    });
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
}

export function parseFilenameFromDisposition(header: string | null): string | undefined {
  if (!header) return undefined;
  const star = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (star) {
    try {
      return decodeURIComponent(star[1].trim());
    } catch {
      return star[1].trim();
    }
  }
  const plain = header.match(/filename="([^"]+)"/i);
  return plain?.[1];
}
