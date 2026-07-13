import { createFileRoute } from "@tanstack/react-router";
import { listPublicFolderFiles } from "@/lib/drive-public";

export const Route = createFileRoute("/api/public/drive-folder/$folderId")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const result = await listPublicFolderFiles(params.folderId);
        const headers = new Headers({
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=600, s-maxage=600, stale-while-revalidate=1800",
        });
        return new Response(JSON.stringify(result), { status: 200, headers });
      },
    },
  },
});
