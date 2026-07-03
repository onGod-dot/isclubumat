import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Folder, ChevronDown, ChevronRight, Download, ExternalLink, Loader2, FileText, FileSpreadsheet, FileImage, File as FileIcon } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { semesters } from "@/components/sections/ResourcesSection";
import logoUrl from "@/assets/is-club-logo.jpeg";
import { listDriveFolder, type DriveEntry } from "@/lib/drive.functions";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Learning Resources IS Club UMAT" },
      { name: "description", content: "Course materials, past questions, and notes IS Club UMAT." },
    ],
  }),
  component: ResourcesPage,
});

const DRIVE = (id: string) => `https://drive.google.com/drive/folders/${id}`;
const DL = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;
const VIEW = (id: string) => `https://drive.google.com/file/d/${id}/view`;

function iconFor(mime: string) {
  if (mime.startsWith("image/")) return FileImage;
  if (mime === "application/vnd.google-apps.folder") return Folder;
  if (mime.includes("spreadsheet") || mime.includes("excel")) return FileSpreadsheet;
  if (mime === "application/pdf" || mime.includes("document") || mime.includes("word") || mime.startsWith("text/")) return FileText;
  return FileIcon;
}

function CourseFolder({ folderId, title }: { folderId: string; title: string }) {
  const [open, setOpen] = useState(false);
  const fetchFolder = useServerFn(listDriveFolder);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["drive-folder", folderId],
    queryFn: () => fetchFolder({ data: { folderId } }),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="rounded-xl border border-gray-100 bg-[#F8FAFC] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white transition-colors"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
        )}
        <Folder size={18} className="flex-shrink-0" style={{ color: "var(--club-lime)" }} />
        <span className="text-sm font-medium text-gray-800 truncate flex-1">{title}</span>
        <a
          href={DRIVE(folderId)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[11px] font-semibold text-gray-400 hover:text-[color:var(--club-blue-deep)] inline-flex items-center gap-1"
          title="Open in Drive"
        >
          Drive <ExternalLink size={11} />
        </a>
      </button>

      {open && (
        <div className="border-t border-gray-100 bg-white px-2 py-2">
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-gray-500 px-3 py-4">
              <Loader2 size={14} className="animate-spin" /> Loading files…
            </div>
          )}
          {isError && (
            <div className="px-3 py-3 text-xs text-red-600 flex items-center justify-between gap-2">
              <span>Couldn't load files.</span>
              <button onClick={() => refetch()} className="font-semibold underline">Retry</button>
            </div>
          )}
          {data && data.length === 0 && (
            <div className="px-3 py-4 text-xs text-gray-500">This folder is empty.</div>
          )}
          {data && data.length > 0 && (
            <ul className="divide-y divide-gray-50">
              {data.map((entry: DriveEntry) => {
                const Icon = iconFor(entry.mimeType);
                if (entry.isFolder) {
                  return (
                    <li key={entry.id} className="px-2 py-1.5">
                      <CourseFolder folderId={entry.id} title={entry.name} />
                    </li>
                  );
                }
                return (
                  <li
                    key={entry.id}
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Icon size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate flex-1" title={entry.name}>
                      {entry.name}
                    </span>
                    <a
                      href={VIEW(entry.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-gray-400 hover:text-[color:var(--club-blue-deep)] inline-flex items-center gap-1"
                      title="Preview"
                    >
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href={DL(entry.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-1 rounded-md bg-[color:var(--club-blue-deep)] text-white text-[11px] font-semibold px-2.5 py-1.5 hover:opacity-90 transition-opacity"
                    >
                      <Download size={12} /> Download
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function ResourcesPage() {
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
            Every semester's slides, past questions, and notes sourced from the IS Club Google Drive.
            Click any folder to open it directly.
          </p>
        </div>
      </div>

      {/* All semesters each as a group with 4-column folder grid */}
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
                <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded-full">
                  {sem.courses.length} folders
                </span>
                <a
                  href={sem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs font-semibold text-[color:var(--club-blue-deep)] hover:underline"
                >
                  Open semester folder ↗
                </a>
              </div>

              {/* Expandable course folders with in-page file downloads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sem.courses.map((course) => (
                  <CourseFolder key={course.id} folderId={course.id} title={course.title} />
                ))}
              </div>

              {/* Divider */}
              <div className="mt-14 border-b border-gray-100" />
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
