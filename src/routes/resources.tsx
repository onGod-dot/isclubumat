import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  FolderOpen,
  X,
  Download,
  Loader2,
  FileText,
  File as FileIcon,
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

interface ActiveFolder {
  id: string;
  title: string;
}

function formatBytes(size?: string) {
  if (!size) return "";
  const n = Number(size);
  if (!Number.isFinite(n) || n <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

function fileTypeLabel(mime: string) {
  if (mime === "application/vnd.google-apps.folder") return "Folder";
  if (mime === "application/vnd.google-apps.document") return "Google Doc";
  if (mime === "application/vnd.google-apps.spreadsheet") return "Google Sheet";
  if (mime === "application/vnd.google-apps.presentation") return "Google Slides";
  if (mime === "application/pdf") return "PDF";
  if (mime.startsWith("image/")) return mime.replace("image/", "").toUpperCase();
  if (mime.startsWith("video/")) return mime.replace("video/", "").toUpperCase();
  if (mime.includes("word")) return "Word";
  if (mime.includes("sheet") || mime.includes("excel")) return "Excel";
  if (mime.includes("presentation") || mime.includes("powerpoint")) return "PowerPoint";
  if (mime.includes("zip")) return "ZIP";
  return "File";
}

function FolderModal({ folder, onClose }: { folder: ActiveFolder; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["drive-folder", folder.id],
    queryFn: () => listDriveFolder({ data: { folderId: folder.id } }),
    staleTime: 60_000,
  });

  const files: DriveFile[] = data?.files ?? [];
  const nonFolderFiles = files.filter(
    (f) => f.mimeType !== "application/vnd.google-apps.folder",
  );

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
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0"
          style={{ backgroundColor: "var(--club-blue-deep)" }}
        >
          <div className="flex items-center gap-3">
            <FolderOpen size={18} className="text-white/70" />
            <span className="font-[Archivo_Black] text-sm text-white uppercase tracking-tight">
              {folder.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto bg-white">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <Loader2 className="animate-spin" size={22} />
              <p className="text-sm">Loading files…</p>
            </div>
          )}
          {isError && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-2 text-red-600">
              <AlertCircle size={22} />
              <p className="text-sm font-semibold">Couldn't load files</p>
              <p className="text-xs text-gray-500">{(error as Error)?.message ?? "Unknown error"}</p>
            </div>
          )}
          {!isLoading && !isError && data?.error && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-2 text-amber-700">
              <AlertCircle size={22} />
              <p className="text-sm font-semibold">{data.error}</p>
            </div>
          )}
          {!isLoading && !isError && !data?.error && nonFolderFiles.length === 0 && (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              This folder is empty.
            </div>
          )}
          {nonFolderFiles.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {nonFolderFiles.map((f) => {
                const isDoc =
                  f.mimeType === "application/pdf" ||
                  f.mimeType.includes("word") ||
                  f.mimeType.includes("document") ||
                  f.mimeType.startsWith("text/");
                return (
                  <li
                    key={f.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                  >
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, var(--club-blue-deep) 8%, transparent)",
                        color: "var(--club-blue-deep)",
                      }}
                    >
                      {isDoc ? <FileText size={16} /> : <FileIcon size={16} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{f.name}</p>
                      <p className="text-[11px] text-gray-400">
                        {fileTypeLabel(f.mimeType)}
                        {formatBytes(f.size) && ` · ${formatBytes(f.size)}`}
                      </p>
                    </div>
                    <a
                      href={`/api/public/drive-file/${f.id}`}
                      download={f.name}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition hover:opacity-90"
                      style={{ backgroundColor: "var(--club-blue-deep)" }}
                    >
                      <Download size={13} />
                      Download
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <p className="text-xs text-gray-400">
            {nonFolderFiles.length > 0
              ? `${nonFolderFiles.length} file${nonFolderFiles.length === 1 ? "" : "s"} · Downloads stream directly`
              : "Downloads stream directly from our servers"}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResourcesPage() {
  const [activeFolder, setActiveFolder] = useState<ActiveFolder | null>(null);

  return (
    <div className="min-h-screen bg-white font-[Inter]">

      {/* Top bar */}
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

      {/* Hero */}
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

      {/* All semesters */}
      <main className="px-5 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto space-y-14">
          {semesters.map((sem) => (
            <div key={sem.name}>

              {/* Semester heading */}
              <div className="flex items-center gap-3 mb-5">
                <h2
                  className="font-[Archivo_Black] text-lg uppercase tracking-tight"
                  style={{ color: "var(--club-blue-deep)" }}
                >
                  {sem.name}
                </h2>
              </div>

              {/* 4-column folder grid — clicking opens the embed modal */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {sem.courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setActiveFolder({ id: course.id, title: course.title })}
                    className="group flex flex-col items-center text-center rounded-xl border border-gray-100 bg-[#F8FAFC] p-5 hover:border-[color:var(--club-blue-deep)]/30 hover:bg-white hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <span
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-3 transition-colors group-hover:text-white"
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

      {/* Folder file list modal */}
      {activeFolder && (
        <FolderModal folder={activeFolder} onClose={() => setActiveFolder(null)} />
      )}

    </div>
  );
}
