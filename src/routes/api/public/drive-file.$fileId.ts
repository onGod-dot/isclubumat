import { createFileRoute } from "@tanstack/react-router";

const GOOGLE_APPS_EXPORTS: Record<string, { mime: string; ext: string }> = {
  "application/vnd.google-apps.document": {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ext: "docx",
  },
  "application/vnd.google-apps.spreadsheet": {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ext: "xlsx",
  },
  "application/vnd.google-apps.presentation": {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ext: "pptx",
  },
  "application/vnd.google-apps.drawing": { mime: "image/png", ext: "png" },
};

export const Route = createFileRoute("/api/public/drive-file/$fileId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const fileId = params.fileId;
        if (!/^[A-Za-z0-9_-]{10,}$/.test(fileId)) {
          return new Response("Invalid file id", { status: 400 });
        }

        const key = process.env.GOOGLE_DRIVE_API_KEY;
        if (!key) return new Response("Drive API key not configured", { status: 500 });

        // Get metadata first so we know how to fetch it and what to name the download.
        const metaRes = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType&key=${key}`,
        );
        if (!metaRes.ok) {
          const body = await metaRes.text();
          console.error(`Drive meta failed [${metaRes.status}]: ${body}`);
          return new Response(`Drive error (${metaRes.status})`, { status: metaRes.status });
        }
        const meta = (await metaRes.json()) as { name: string; mimeType: string };

        const exportCfg = GOOGLE_APPS_EXPORTS[meta.mimeType];
        let upstream: Response;
        let downloadName = meta.name;
        let contentType = meta.mimeType;

        if (exportCfg) {
          // Google-native doc: export to Office format.
          upstream = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=${encodeURIComponent(exportCfg.mime)}&key=${key}`,
          );
          contentType = exportCfg.mime;
          if (!/\.[a-zA-Z0-9]+$/.test(downloadName)) {
            downloadName = `${downloadName}.${exportCfg.ext}`;
          }
        } else {
          upstream = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${key}`,
          );
        }

        if (!upstream.ok || !upstream.body) {
          const body = await upstream.text().catch(() => "");
          console.error(`Drive download failed [${upstream.status}]: ${body}`);
          return new Response(`Drive error (${upstream.status})`, { status: upstream.status });
        }

        const headers = new Headers();
        headers.set("Content-Type", contentType);
        const len = upstream.headers.get("content-length");
        if (len) headers.set("Content-Length", len);
        // RFC 5987 filename* for unicode-safe names.
        const safeAscii = downloadName.replace(/[^\x20-\x7E]+/g, "_").replace(/"/g, "'");
        headers.set(
          "Content-Disposition",
          `attachment; filename="${safeAscii}"; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
        );
        headers.set("Cache-Control", "private, max-age=0, no-store");

        return new Response(upstream.body, { status: 200, headers });
      },
    },
  },
});