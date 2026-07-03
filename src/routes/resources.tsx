import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FolderOpen, X, ExternalLink, Maximize2 } from "lucide-react";
import { semesters } from "@/components/sections/ResourcesSection";
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

const DRIVE_EMBED = (id: string) =>
  `https://drive.google.com/embeddedfolderview?id=${id}#list`;

const DRIVE_OPEN = (id: string) =>
  `https://drive.google.com/drive/folders/${id}`;

interface ActiveFolder {
  id: string;
  title: string;
}

function DriveModal({ folder, onClose }: { folder: ActiveFolder; onClose: () => void }) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(10,15,28,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white"
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
            <a
              href={DRIVE_OPEN(folder.id)}
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

        {/* Drive embed */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={DRIVE_EMBED(folder.id)}
            title={folder.title}
            className="w-full h-full border-0"
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
          />
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <p className="text-xs text-gray-400">
            Click any file to preview · Use the Drive toolbar to download
          </p>
          <a
            href={DRIVE_OPEN(folder.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--club-blue-deep)] hover:underline"
          >
            <Maximize2 size={12} />
            Full screen
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

      {/* Drive embed modal */}
      {activeFolder && (
        <DriveModal folder={activeFolder} onClose={() => setActiveFolder(null)} />
      )}

    </div>
  );
}
