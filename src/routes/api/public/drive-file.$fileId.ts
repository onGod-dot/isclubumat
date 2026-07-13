import { createFileRoute } from "@tanstack/react-router";
import {
  DRIVE_USER_AGENT,
  driveDownloadUrl,
  parseFilenameFromDisposition,
} from "@/lib/drive-public";

export const Route = createFileRoute("/api/public/drive-file/$fileId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const fileId = params.fileId;
        if (!/^[A-Za-z0-9_-]{10,}$/.test(fileId)) {
          return new Response("Invalid file id", { status: 400 });
        }

        const upstream = await fetch(driveDownloadUrl(fileId), {
          headers: { "User-Agent": DRIVE_USER_AGENT },
          redirect: "follow",
        });

        if (!upstream.ok || !upstream.body) {
          const body = await upstream.text().catch(() => "");
          console.error(`Drive download failed [${upstream.status}]: ${body.slice(0, 500)}`);
          return new Response(`Drive error (${upstream.status})`, { status: upstream.status });
        }

        const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
        if (contentType.includes("text/html")) {
          return new Response("File is not publicly downloadable", { status: 403 });
        }

        const disposition = upstream.headers.get("content-disposition");
        const downloadName = parseFilenameFromDisposition(disposition) ?? `drive-file-${fileId}`;

        const headers = new Headers();
        headers.set("Content-Type", contentType);
        const len = upstream.headers.get("content-length");
        if (len) headers.set("Content-Length", len);
        const safeAscii = downloadName.replace(/[^\x20-\x7E]+/g, "_").replace(/"/g, "'");
        headers.set(
          "Content-Disposition",
          disposition ??
            `attachment; filename="${safeAscii}"; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
        );
        headers.set("Cache-Control", "private, max-age=3600");

        return new Response(upstream.body, { status: 200, headers });
      },
    },
  },
});
