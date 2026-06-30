import { Lightbulb, Users, Award, HeartHandshake, Target, Eye } from "lucide-react";

const stats = [
  { value: "500+", label: "Members" },
  { value: "12", label: "Active Projects" },
  { value: "30+", label: "Events Hosted" },
  { value: "8", label: "Industry Partners" },
];

const values = [
  { title: "Innovation", desc: "We push boundaries and explore emerging technologies to solve real-world problems.", icon: Lightbulb },
  { title: "Collaboration", desc: "We build together — across disciplines, departments, and year groups.", icon: Users },
  { title: "Excellence", desc: "We hold ourselves to high standards in everything we learn, build, and ship.", icon: Award },
  { title: "Inclusion", desc: "Every student with a passion for technology has a home here, regardless of background.", icon: HeartHandshake },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <p className="is-eyebrow mb-4">About IS Club</p>

        {/* Heading + intro */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight">
            Who we are &amp;<br />what we stand for.
          </h2>
          <div className="space-y-4 text-gray-500 text-base leading-relaxed pt-1">
            <p>
              IS Club UMAT is the Information Systems &amp; Technology Club at the University of Mines and
              Technology. We are a student-led community dedicated to bridging the gap between academic
              knowledge and real-world technology practice.
            </p>
            <p>
              Our vision is to be the leading technology community in Ghana's tertiary education space —
              producing graduates who are not just employable, but capable of building the companies and
              systems of tomorrow.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-100 divide-x divide-y sm:divide-y-0 divide-gray-100 rounded-2xl overflow-hidden mb-16">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center bg-[#F8FAFC]">
              <div className="text-3xl sm:text-4xl font-black text-gray-950">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission / Vision row */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          <div className="border border-gray-100 rounded-2xl p-8 bg-[#F8FAFC]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--club-blue-deep)] text-white mb-4">
              <Target size={18} strokeWidth={2.25} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--club-blue-deep)] mb-3">Our Mission</p>
            <p className="text-gray-700 leading-relaxed">
              To empower students at UMaT with the technical skills, industry exposure, and collaborative
              mindset needed to drive innovation in Africa's technology ecosystem.
            </p>
          </div>
          <div className="border border-gray-100 rounded-2xl p-8 bg-[#F8FAFC]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--club-lime)] text-[color:var(--club-blue-deep)] mb-4">
              <Eye size={18} strokeWidth={2.25} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--club-blue-deep)] mb-3">Our Vision</p>
            <p className="text-gray-700 leading-relaxed">
              A campus where every student regardless of department has access to quality technology
              education, mentorship, and the opportunity to build things that matter.
            </p>
          </div>
        </div>

        {/* Core values */}
        <p className="is-eyebrow mb-6">Core Values</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
            <div key={v.title} className="group border border-gray-100 rounded-2xl p-6 hover:border-[color:var(--club-blue-deep)]/40 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-200">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)] ring-1 ring-inset ring-[color:var(--club-blue-deep)]/10 mb-4 group-hover:bg-[color:var(--club-blue-deep)] group-hover:text-white transition-colors">
                <Icon size={18} strokeWidth={2} />
              </span>
              <div className="text-base font-bold text-gray-950 mb-2">{v.title}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
