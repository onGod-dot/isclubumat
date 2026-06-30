export default function AboutSection() {
  return (
    <section id="about" className="bg-white border-t border-gray-100 py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-6">About IS Club</p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — heading */}
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight">
            Who we are &amp;<br />what we stand for.
          </h2>

          {/* Right — body text */}
          <div className="space-y-4 text-gray-500 text-base leading-relaxed">
            <p>
              IS Club UMAT is the Information Systems &amp; Technology Club at the University of Mines and
              Technology. We are a student-led community dedicated to bridging the gap between academic
              knowledge and real-world technology practice.
            </p>
            <p>
              Our vision is to be the leading technology community in Ghana's tertiary education space 
              producing graduates who are not just employable, but capable of building the companies and
              systems of tomorrow.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
