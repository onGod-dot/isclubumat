import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink, FolderOpen } from "lucide-react";
import { ResourcesPageHeader } from "@/components/resources/ResourcesPageHeader";
import { FolderContents, type FolderSearch } from "@/components/resources/FolderContents";
import { findCourseByFolderId } from "@/lib/resources-catalog";

const DRIVE_OPEN = (id: string) => `https://drive.google.com/drive/folders/${id}`;

export const Route = createFileRoute("/resources/$folderId")({
  validateSearch: (search: Record<string, unknown>): FolderSearch => ({
    title: typeof search.title === "string" ? search.title : undefined,
    parent: typeof search.parent === "string" ? search.parent : undefined,
    parentTitle: typeof search.parentTitle === "string" ? search.parentTitle : undefined,
  }),
  head: ({ params, search }) => {
    const known = findCourseByFolderId(params.folderId);
    const title = search.title ?? known?.courseTitle ?? "Course Materials";
    return {
      meta: [
        { title: `${title} — Learning Resources IS Club UMAT` },
        { name: "description", content: `Download slides, past questions, and notes for ${title}.` },
      ],
    };
  },
  component: FolderPage,
});

function FolderPage() {
  const { folderId } = Route.useParams();
  const search = Route.useSearch();
  const known = findCourseByFolderId(folderId);

  const title = search.title ?? known?.courseTitle ?? "Course Materials";
  const semesterLabel = known?.semesterName;
  const back =
    search.parent ?
      {
        to: "/resources/$folderId" as const,
        params: { folderId: search.parent },
        search: search.parentTitle ? { title: search.parentTitle } : undefined,
        label: search.parentTitle ?? "Back",
      }
    : { to: "/resources" as const, label: "All resources" };

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      <ResourcesPageHeader back={back} />

      <div
        className="border-b border-gray-100 px-5 sm:px-8 py-14 sm:py-16"
        style={{ backgroundColor: "var(--club-blue-deep)" }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-white/45 mb-5 flex-wrap">
            <Link to="/resources" className="hover:text-white/80 transition">
              Learning Resources
            </Link>
            {semesterLabel && (
              <>
                <ChevronRight size={12} />
                <span>{semesterLabel}</span>
              </>
            )}
            {search.parent && search.parentTitle && (
              <>
                <ChevronRight size={12} />
                <Link
                  to="/resources/$folderId"
                  params={{ folderId: search.parent }}
                  search={{ title: search.parentTitle }}
                  className="hover:text-white/80 transition"
                >
                  {search.parentTitle}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-white/75">{title}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3 font-mono">
                {semesterLabel ?? "Course folder"}
              </p>
              <h1
                className="font-[Archivo_Black] text-white uppercase leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {title}
              </h1>
              <p className="text-white/55 text-sm sm:text-base mt-4 leading-relaxed max-w-lg">
                Browse and download slides, past questions, and notes shared by the IS Club.
              </p>
            </div>

            <a
              href={DRIVE_OPEN(folderId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <FolderOpen size={16} />
              Open in Google Drive
              <ExternalLink size={14} className="opacity-70" />
            </a>
          </div>
        </div>
      </div>

      <main className="px-5 sm:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <FolderContents folderId={folderId} currentTitle={title} />
        </div>
      </main>
    </div>
  );
}
