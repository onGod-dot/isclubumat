import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  FolderOpen,
  X,
  ExternalLink,
  Download,
  FileText,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { semesters } from "@/components/sections/ResourcesSection";
import { listDriveFolder, type DriveFile } from "@/lib/drive.functions";
import logoUrl from "@/assets/is-club-logo.jpeg";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Learning Resources IS Club UMAT" },
      { name: "description", content: "Course materials, past questions, and notes IS Club UMAT." },
    ],
  }),
  component: ResourcesPage,
});

const DRIVE_OPEN = (id: string) => `https://drive.google.com/drive/folders/${id}`;
const DRIVE_FILE_VIEW = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const DRIVE_DOWNLOAD = (id: string) => `/api/public/drive-file/${id}`;

interface ActiveFolder {
  id: string;
  title: string;
}

function fileIcon(file: DriveFile) {
  if (file.isFolder) return FolderOpen;
  if (file.mimeType.includes("pdf")) return FileText;
  return FileText;
}

function DriveModal({ folder, onClose }: { folder: ActiveFolder; onClose: () => void }) {
  const [path, setPath] = useState<ActiveFolder[]>([folder]);
  const current = path[path.length - 1];

  useEffect(() => {
    setPath([folder]);
  }, [folder]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["drive-folder", current.id],
    queryFn: () => listDriveFolder({ data: { folderId: current.id } }),
  });

  const files = data?.files ?? [];
  const listError = data?.error;

  const openFolder = (entry: DriveFile) => {
    setPath((prev) => [...prev, { id: entry.id, title: entry.name }]);
  };

  const goToCrumb = (index: number) => {
    setPath((prev) => prev.slice(0, index + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(10,15,28,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white"
        style={{ height: "min(85vh, 720px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0"
          style={{ backgroundColor: "var(--club-blue-deep)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <FolderOpen size={18} className="text-white/70 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-[Archivo_Black] text-sm text-white uppercase tracking-tight truncate">
                {folder.title}
              </p>
              {path.length > 1 && (
                <nav className="flex items-center gap-1 text-[11px] text-white/50 mt-0.5 overflow-x-auto">
                  {path.map((crumb, i) => (
                    <span key={crumb.id} className="flex items-center gap-1 flex-shrink-0">
                      {i > 0 && <ChevronRight size={10} />}
                      <button
                        type="button"
                        onClick={() => goToCrumb(i)}
                        className={`hover:text-white transition ${i === path.length - 1 ? "text-white/80" : ""}`}
                      >
                        {crumb.title}
                      </button>
                    </span>
                  ))}
                </nav>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={DRIVE_OPEN(current.id)}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in Google Drive"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              <ExternalLink size={13} />
              Open in Drive
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <Loader2 size={28} className="animate-spin" />
              <p className="text-sm">Loading files…</p>
            </div>
          )}

          {!isLoading && (isError || listError) && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400 px-6 text-center">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-sm">{listError ?? "Could not load this folder."}</p>
              <a
                href={DRIVE_OPEN(current.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[color:var(--club-blue-deep)] hover:underline"
              >
                Open in Google Drive instead
              </a>
            </div>
          )}

          {!isLoading && !isError && !listError && files.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 px-6 text-center">
              <FolderOpen size={28} />
              <p className="text-sm">This folder is empty.</p>
            </div>
          )}

          {!isLoading && !isError && !listError && files.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {files.map((file) => {
                const Icon = fileIcon(file);
                return (
                  <li key={file.id}>
                    {file.isFolder ? (
                      <button
                        type="button"
                        onClick={() => openFolder(file)}
                        className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F8FAFC] transition text-left group"
                      >
                        <span
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
                          style={{
                            backgroundColor: "color-mix(in oklab, var(--club-blue-deep) 8%, transparent)",
                            color: "var(--club-blue-deep)",
                          }}
                        >
                          <Icon size={18} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-[color:var(--club-blue-deep)] transition truncate">
                            {file.name}
                          </p>
                          {file.modifiedTime && (
                            <p className="text-xs text-gray-400 mt-0.5">{file.modifiedTime}</p>
                          )}
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-[color:var(--club-blue-deep)] flex-shrink-0" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F8FAFC] transition group">
                        <span
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
                          style={{
                            backgroundColor: "color-mix(in oklab, var(--club-lime) 15%, transparent)",
                            color: "var(--club-blue-deep)",
                          }}
                        >
                          <Icon size={18} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                          {file.modifiedTime && (
                            <p className="text-xs text-gray-400 mt-0.5">{file.modifiedTime}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <a
                            href={DRIVE_FILE_VIEW(file.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Preview in Drive"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-[color:var(--club-blue-deep)] hover:bg-white transition"
                          >
                            <ExternalLink size={15} />
                          </a>
                          <a
                            href={DRIVE_DOWNLOAD(file.id)}
                            download
                            title="Download"
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
                            style={{ backgroundColor: "var(--club-blue-deep)" }}
                          >
                            <Download size={13} />
                            Download
                          </a>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <p className="text-xs text-gray-400">
            {files.length > 0 ? `${files.length} item${files.length === 1 ? "" : "s"}` : "Browse course materials"}
          </p>
          <a
            href={DRIVE_OPEN(current.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--club-blue-deep)] hover:underline"
          >
            <ExternalLink size={12} />
            Full screen in Drive
          </a>
        </div>
      </div>
    </div>
  );
}

function ResourcesPage() {
  const [activeFolder, setActiveFolder] = useState<ActiveFolder | null>(null);

  return (
    <div className="min-h-screen bg-white font-[Inter]">
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-md px-5 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[color:var(--club-blue-deep)] transition"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="IS Club UMAT" className="h-7 w-7 rounded-full object-cover" />
            <span className="font-[Archivo_Black] text-sm text-gray-950 tracking-tight">IS CLUB</span>
          </div>
        </div>
      </header>

      <div
        className="border-b border-gray-100 px-5 sm:px-8 py-16"
        style={{ backgroundColor: "var(--club-blue-deep)" }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4 font-mono">
            Learning Resources
          </p>
          <h1
            className="font-[Archivo_Black] text-white uppercase leading-[0.9] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Course<br />Materials
          </h1>
          <p className="text-white/60 text-base max-w-lg leading-relaxed">
            Every semester's slides, past questions, and notes from the IS Club Google Drive.
            Click any folder to browse and download files without leaving this page.
          </p>
        </div>
      </div>

      <main className="px-5 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto space-y-14">
          {semesters.map((sem) => (
            <div key={sem.name}>
              <div className="flex items-center gap-3 mb-5">
                <h2
                  className="font-[Archivo_Black] text-lg uppercase tracking-tight"
                  style={{ color: "var(--club-blue-deep)" }}
                >
                  {sem.name}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {sem.courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setActiveFolder({ id: course.id, title: course.title })}
                    className="group flex flex-col items-center text-center rounded-xl border border-gray-100 bg-[#F8FAFC] p-5 hover:border-[color:var(--club-blue-deep)]/30 hover:bg-white hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-3 transition-colors"
                      style={{
                        backgroundColor: "color-mix(in oklab, var(--club-blue-deep) 6%, transparent)",
                        color: "var(--club-blue-deep)",
                      }}
                    >
                      <FolderOpen size={28} strokeWidth={1.8} />
                    </span>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-[color:var(--club-blue-deep)] transition-colors leading-tight">
                      {course.title}
                    </span>
                    <span className="mt-2 text-[11px] font-medium text-gray-400 group-hover:text-[color:var(--club-blue-deep)] transition-colors">
                      Browse files
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-14 border-b border-gray-100" />
            </div>
          ))}
        </div>
      </main>

      {activeFolder && (
        <DriveModal folder={activeFolder} onClose={() => setActiveFolder(null)} />
      )}
    </div>
  );
}
