import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import logoUrl from "@/assets/is-club-logo.jpeg";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Begin Your Journey — IS Club UMAT" },
      { name: "description", content: "Career roadmaps for every technology track. Start your journey with IS Club UMAT." },
    ],
  }),
  component: JourneyPage,
});

const tracks = [
  {
    category: "Software Development",
    description: "Pick a path and start building real software.",
    color: "var(--club-blue-deep)",
    roads: [
      { title: "Frontend Developer", url: "https://roadmap.sh/frontend", desc: "HTML, CSS, JavaScript, React, and the modern web stack." },
      { title: "Backend Developer", url: "https://roadmap.sh/backend", desc: "APIs, databases, servers, and system design." },
      { title: "Full Stack", url: "https://roadmap.sh/full-stack", desc: "End-to-end web development from browser to server." },
      { title: "React", url: "https://roadmap.sh/react", desc: "The most popular UI library for building web apps." },
      { title: "Node.js", url: "https://roadmap.sh/nodejs", desc: "JavaScript runtime for scalable backend services." },
      { title: "TypeScript", url: "https://roadmap.sh/typescript", desc: "Type-safe JavaScript for large-scale applications." },
    ],
  },
  {
    category: "Mobile Development",
    description: "Build apps for iOS and Android.",
    color: "var(--club-blue)",
    roads: [
      { title: "Flutter", url: "https://roadmap.sh/flutter", desc: "Cross-platform mobile apps with a single Dart codebase." },
      { title: "React Native", url: "https://roadmap.sh/react-native", desc: "Build native mobile apps using React." },
      { title: "Android", url: "https://roadmap.sh/android", desc: "Native Android development with Kotlin and Jetpack." },
      { title: "iOS", url: "https://roadmap.sh/ios", desc: "Native iOS development with Swift and SwiftUI." },
    ],
  },
  {
    category: "Artificial Intelligence & Data",
    description: "Learn to build intelligent systems and derive insights from data.",
    color: "#4f46e5",
    roads: [
      { title: "AI & ML Engineer", url: "https://roadmap.sh/ai-data-scientist", desc: "Machine learning, deep learning, and model deployment." },
      { title: "Data Analyst", url: "https://roadmap.sh/data-analyst", desc: "SQL, Python, visualisation, and business intelligence." },
      { title: "MLOps", url: "https://roadmap.sh/mlops", desc: "Operationalise ML models in production environments." },
      { title: "Prompt Engineering", url: "https://roadmap.sh/prompt-engineering", desc: "Work effectively with large language models." },
    ],
  },
  {
    category: "Cybersecurity",
    description: "Protect systems and learn ethical hacking.",
    color: "#dc2626",
    roads: [
      { title: "Cybersecurity", url: "https://roadmap.sh/cyber-security", desc: "Defensive security, threat modelling, and incident response." },
      { title: "Linux", url: "https://roadmap.sh/linux", desc: "The foundation of every server and security tool." },
      { title: "Docker", url: "https://roadmap.sh/docker", desc: "Containerise applications for consistent deployments." },
    ],
  },
  {
    category: "Cloud & DevOps",
    description: "Deploy, scale, and automate modern infrastructure.",
    color: "#0891b2",
    roads: [
      { title: "DevOps", url: "https://roadmap.sh/devops", desc: "CI/CD, infrastructure as code, and cloud automation." },
      { title: "AWS", url: "https://roadmap.sh/aws", desc: "Amazon Web Services — the world's leading cloud platform." },
      { title: "Kubernetes", url: "https://roadmap.sh/kubernetes", desc: "Orchestrate containers at scale." },
      { title: "Terraform", url: "https://roadmap.sh/terraform", desc: "Infrastructure as code for any cloud provider." },
    ],
  },
  {
    category: "UI/UX Design",
    description: "Design products people love to use.",
    color: "#7c3aed",
    roads: [
      { title: "UX Design", url: "https://roadmap.sh/ux-design", desc: "Research, wireframing, prototyping, and usability testing." },
      { title: "Design System", url: "https://roadmap.sh/design-system", desc: "Build scalable, consistent component libraries." },
    ],
  },
  {
    category: "Computer Science Fundamentals",
    description: "The core knowledge every great engineer needs.",
    color: "#059669",
    roads: [
      { title: "Computer Science", url: "https://roadmap.sh/computer-science", desc: "Algorithms, data structures, and system fundamentals." },
      { title: "System Design", url: "https://roadmap.sh/system-design", desc: "Design scalable distributed systems." },
      { title: "Software Architecture", url: "https://roadmap.sh/software-architect", desc: "Patterns, principles, and high-level design decisions." },
      { title: "Git & Version Control", url: "https://roadmap.sh/git-github", desc: "Collaborate and manage code history effectively." },
      { title: "API Design", url: "https://roadmap.sh/api-design", desc: "Build clean, versioned, documented APIs." },
      { title: "PostgreSQL", url: "https://roadmap.sh/postgresql-dba", desc: "Advanced relational database design and administration." },
    ],
  },
  {
    category: "Programming Languages",
    description: "Master the tools of the trade.",
    color: "#d97706",
    roads: [
      { title: "Python", url: "https://roadmap.sh/python", desc: "The most versatile language — from scripts to AI." },
      { title: "JavaScript", url: "https://roadmap.sh/javascript", desc: "The language of the web, inside and out." },
      { title: "Java", url: "https://roadmap.sh/java", desc: "Enterprise-grade backend and Android development." },
      { title: "Rust", url: "https://roadmap.sh/rust", desc: "Systems programming with safety and performance." },
      { title: "Go", url: "https://roadmap.sh/golang", desc: "Fast, concurrent backend services and CLI tools." },
      { title: "C++", url: "https://roadmap.sh/cpp", desc: "High-performance software, games, and embedded systems." },
    ],
  },
];

function JourneyPage() {
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
            Career Roadmaps
          </p>
          <h1
            className="font-[Archivo_Black] text-white uppercase leading-[0.9] tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            Begin Your<br />Journey.
          </h1>
          <p className="text-white/60 text-base max-w-lg leading-relaxed mb-8">
            Pick a track, follow the roadmap, and build the skills to launch your career in technology.
            Every path here is tried, tested, and used by engineers at top companies worldwide.
          </p>
          {/* Track jump links */}
          <div className="flex flex-wrap gap-2">
            {tracks.map((t) => (
              <a
                key={t.category}
                href={`#${t.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                {t.category}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tracks */}
      <main className="px-5 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          {tracks.map((track) => (
            <div key={track.category} id={track.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>

              {/* Track heading */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2
                    className="font-[Archivo_Black] text-xl sm:text-2xl uppercase tracking-tight mb-1"
                    style={{ color: "var(--club-blue-deep)" }}
                  >
                    {track.category}
                  </h2>
                  <p className="text-sm text-gray-500">{track.description}</p>
                </div>
              </div>

              {/* Roadmap cards — 4 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {track.roads.map((road) => (
                  <a
                    key={road.title}
                    href={road.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-[#F8FAFC] p-5 hover:border-[color:var(--club-blue-deep)]/30 hover:bg-white hover:shadow-[0_10px_30px_-20px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {/* Colour accent bar */}
                    <div
                      className="w-8 h-1 rounded-full"
                      style={{ backgroundColor: track.color }}
                    />
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-gray-950 text-sm leading-tight">{road.title}</span>
                      <ArrowUpRight
                        size={14}
                        className="flex-shrink-0 text-gray-300 group-hover:text-[color:var(--club-blue-deep)] transition mt-0.5"
                      />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{road.desc}</p>
                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        roadmap.sh
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-16 border-b border-gray-100" />
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
