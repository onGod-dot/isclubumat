import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FolderOpen, ExternalLink } from "lucide-react";
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

const DRIVE = (id: string) => `https://drive.google.com/drive/folders/${id}`;

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

              {/* 4-column folder grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sem.courses.map((course) => (
                  <a
                    key={course.id}
                    href={DRIVE(course.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 hover:border-[color:var(--club-blue-deep)]/30 hover:bg-white hover:-translate-y-0.5 transition-all duration-150"
                  >
                    <Folder
                      size={18}
                      className="flex-shrink-0 transition-colors group-hover:text-[color:var(--club-blue-deep)]"
                      style={{ color: "var(--club-lime)" }}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[color:var(--club-blue-deep)] transition-colors truncate">
                      {course.title}
                    </span>
                  </a>
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
