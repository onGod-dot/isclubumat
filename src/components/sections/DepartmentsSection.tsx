import {
  Code2,
  BrainCircuit,
  ShieldCheck,
  Cloud,
  LineChart,
  Palette,
  Network,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

const departments = [
  {
    name: "Software Development",
    lead: "TBA",
    icon: Code2,
    desc: "Build web, mobile, and desktop applications using modern frameworks and engineering best practices.",
    skills: ["React", "Node.js", "TypeScript", "REST APIs", "Git"],
    projects: ["Club Website", "Student Portal", "Event Management App"],
  },
  {
    name: "Artificial Intelligence",
    lead: "TBA",
    icon: BrainCircuit,
    desc: "Explore machine learning, deep learning, NLP, and computer vision applied to African challenges.",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Jupyter"],
    projects: ["Crop Disease Detector", "NLP Research Project"],
  },
  {
    name: "Cybersecurity",
    lead: "TBA",
    icon: ShieldCheck,
    desc: "Learn ethical hacking, digital forensics, network defence, and capture-the-flag competitions.",
    skills: ["Kali Linux", "Wireshark", "Metasploit", "OSINT", "CTF"],
    projects: ["CTF Team", "Campus Security Audit"],
  },
  {
    name: "Cloud Computing",
    lead: "TBA",
    icon: Cloud,
    desc: "Design and deploy scalable infrastructure on AWS, Azure, and GCP with DevOps practices.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    projects: ["Club Infrastructure", "Serverless Workshop"],
  },
  {
    name: "Data Science",
    lead: "TBA",
    icon: LineChart,
    desc: "Analyse data, build visualisations, and derive insights that drive evidence-based decisions.",
    skills: ["Python", "Pandas", "SQL", "Power BI", "Tableau"],
    projects: ["UMaT Enrolment Analysis", "Mining Data Dashboard"],
  },
  {
    name: "UI/UX Design",
    lead: "TBA",
    icon: Palette,
    desc: "Craft intuitive, accessible, and beautiful digital experiences using design thinking methods.",
    skills: ["Figma", "Prototyping", "User Research", "Accessibility", "Design Systems"],
    projects: ["Club Rebrand", "Student App Mockups"],
  },
  {
    name: "Networking",
    lead: "TBA",
    icon: Network,
    desc: "Study network architecture, protocols, infrastructure design, and administration.",
    skills: ["Cisco", "Packet Tracer", "TCP/IP", "VLANs", "Firewalls"],
    projects: ["Campus Network Simulation"],
  },
  {
    name: "Entrepreneurship",
    lead: "TBA",
    icon: Rocket,
    desc: "Turn ideas into ventures — business modelling, pitching, funding, and startup fundamentals.",
    skills: ["Business Model Canvas", "Lean Startup", "Pitch Deck", "MVP"],
    projects: ["Startup Weekend", "Idea Competition"],
  },
];

export default function DepartmentsSection() {
  return (
    <section id="departments" className="bg-[#F8FAFC] py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Departments</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight max-w-lg">
            Find your area of expertise.
          </h2>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Every department runs its own projects, workshops, and competitions throughout the year.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((d) => {
            const Icon = d.icon;
            return (
            <div
              key={d.name}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-[color:var(--club-blue-deep)]/40 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)] ring-1 ring-inset ring-[color:var(--club-blue-deep)]/10 group-hover:bg-[color:var(--club-blue-deep)] group-hover:text-white transition-colors">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <ArrowUpRight size={16} className="text-gray-300 group-hover:text-[color:var(--club-blue-deep)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
              </div>
              <div>
                <div className="font-bold text-gray-950 text-sm mb-1">{d.name}</div>
                <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                {d.skills.slice(0, 3).map((s) => (
                  <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)]">
                    {s}
                  </span>
                ))}
                {d.skills.length > 3 && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    +{d.skills.length - 3}
                  </span>
                )}
              </div>
            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
