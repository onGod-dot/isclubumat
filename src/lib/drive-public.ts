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

const FETCH_TIMEOUT_MS = 20_000;

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": DRIVE_USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        ...init?.headers,
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchEmbeddedFolderHtml(folderId: string): Promise<string> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetchWithTimeout(embeddedFolderViewUrl(folderId));
      if (!res.ok) {
        throw new Error(`Drive folder fetch failed (${res.status})`);
      }
      return await res.text();
    } catch (err) {
      lastError = err;
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

export type PublicFolderListing = {
  files: ParsedDriveEntry[];
  error?: string;
};

export async function listPublicFolderFiles(folderId: string): Promise<PublicFolderListing> {
  if (!/^[A-Za-z0-9_-]{10,}$/.test(folderId)) {
    return { files: [], error: "Invalid folder id" };
  }

  try {
    const html = await fetchEmbeddedFolderHtml(folderId);
    return { files: parseEmbeddedFolderView(html) };
  } catch (err) {
    console.error("Drive folder list failed:", err);
    return { files: [], error: "Failed to load folder from Google Drive" };
  }
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
