import { useRef } from "react";
import { Github, ExternalLink, Users, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "IS Club Website",
    desc: "Official club website built with React, TanStack Start, and Tailwind CSS.",
    stack: ["React", "TypeScript", "Tailwind"],
    category: "Web",
    status: "Live",
    team: ["Dev Team"],
    github: "#",
    demo: "#",
  },
  {
    title: "Crop Disease Detector",
    desc: "AI model that identifies crop diseases from smartphone photos using computer vision.",
    stack: ["Python", "TensorFlow", "Flask"],
    category: "AI",
    status: "In Progress",
    team: ["AI Department"],
    github: "#",
    demo: null,
  },
  {
    title: "Student Event Portal",
    desc: "Web platform for managing club events registration, attendance, and feedback.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    category: "Web",
    status: "In Progress",
    team: ["Software Dev"],
    github: "#",
    demo: null,
  },
  {
    title: "CTF Platform",
    desc: "Custom capture-the-flag challenge platform for UMaT cybersecurity competitions.",
    stack: ["Python", "Docker", "CTFd"],
    category: "Cybersecurity",
    status: "Planning",
    team: ["Cyber Team"],
    github: "#",
    demo: null,
  },
  {
    title: "UMaT Data Dashboard",
    desc: "Interactive dashboard visualising enrolment trends and academic performance data.",
    stack: ["Python", "Pandas", "Power BI"],
    category: "Data Science",
    status: "Completed",
    team: ["Data Team"],
    github: "#",
    demo: "#",
  },
  {
    title: "Campus Network Sim",
    desc: "Simulation of UMaT's campus network topology built in Cisco Packet Tracer.",
    stack: ["Cisco", "Packet Tracer"],
    category: "Networking",
    status: "Completed",
    team: ["Networking Dept."],
    github: "#",
    demo: null,
  },
];

const statusColors: Record<string, string> = {
  Live: "bg-green-50 text-green-700",
  "In Progress": "bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)]",
  Planning: "bg-amber-50 text-amber-700",
  Completed: "bg-gray-100 text-gray-600",
};

export default function ProjectsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector<HTMLElement>(".project-card");
    const gap = 20;
    const amount = card ? card.offsetWidth + gap : 340;
    sliderRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="projects" className="bg-white border-t border-gray-100 py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Projects</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight max-w-lg">
            Things we've built.
          </h2>
          {/* Slider controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-[color:var(--club-blue-deep)] hover:text-[color:var(--club-blue-deep)] transition"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-[color:var(--club-blue-deep)] hover:text-[color:var(--club-blue-deep)] transition"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((p) => (
            <div
              key={p.title}
              className="project-card flex-none w-[calc((100%-2*20px)/3)] min-w-[280px] snap-start bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-[color:var(--club-blue-deep)]/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)]">
                  {p.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColors[p.status]}`}>
                  {p.status}
                </span>
              </div>
              <div>
                <div className="font-bold text-gray-950 text-base mb-1">{p.title}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {p.stack.map((s) => (
                  <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Users size={12} />
                  {p.team[0]}
                </span>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <a href={p.github} className="inline-flex items-center gap-1 text-gray-700 hover:text-[color:var(--club-blue-deep)] transition">
                    <Github size={13} /> Code
                  </a>
                  {p.demo && (
                    <a href={p.demo} className="inline-flex items-center gap-1 text-[color:var(--club-blue-deep)] hover:text-black transition">
                      <ExternalLink size={13} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
