import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { semesters } from "@/components/sections/ResourcesSection";
import logoUrl from "@/assets/is-club-logo.jpeg";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Learning Resources IS Club UMAT" },
      { name: "description", content: "Course materials, past questions, and notes IS Club UMAT." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
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
            Pick a course folder to browse and download files.
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
                  <Link
                    key={course.id}
                    to="/resources/$folderId"
                    params={{ folderId: course.id }}
                    className="group flex flex-col items-center text-center rounded-xl border border-gray-100 bg-[#F8FAFC] p-5 hover:border-[color:var(--club-blue-deep)]/30 hover:bg-white hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 transition-all duration-200"
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
                  </Link>
                ))}
              </div>

              <div className="mt-14 border-b border-gray-100" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
