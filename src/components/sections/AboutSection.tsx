const stats = [
  { value: "500+", label: "Members" },
  { value: "12", label: "Active Projects" },
  { value: "30+", label: "Events Hosted" },
  { value: "8", label: "Industry Partners" },
];

const values = [
  { title: "Innovation", desc: "We push boundaries and explore emerging technologies to solve real-world problems." },
  { title: "Collaboration", desc: "We build together — across disciplines, departments, and year groups." },
  { title: "Excellence", desc: "We hold ourselves to high standards in everything we learn, build, and ship." },
  { title: "Inclusion", desc: "Every student with a passion for technology has a home here, regardless of background." },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--club-blue-deep)] mb-4">About IS Club</p>

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
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--club-blue-deep)] mb-3">Our Mission</p>
            <p className="text-gray-700 leading-relaxed">
              To empower students at UMaT with the technical skills, industry exposure, and collaborative
              mindset needed to drive innovation in Africa's technology ecosystem.
            </p>
          </div>
          <div className="border border-gray-100 rounded-2xl p-8 bg-[#F8FAFC]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--club-blue-deep)] mb-3">Our Vision</p>
            <p className="text-gray-700 leading-relaxed">
              A campus where every student regardless of department has access to quality technology
              education, mentorship, and the opportunity to build things that matter.
            </p>
          </div>
        </div>

        {/* Core values */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--club-blue-deep)] mb-6">Core Values</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div key={v.title} className="border border-gray-100 rounded-2xl p-6 hover:border-[color:var(--club-blue-deep)]/40 hover:-translate-y-0.5 transition-all duration-200">
              <div className="text-base font-bold text-gray-950 mb-2">{v.title}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
