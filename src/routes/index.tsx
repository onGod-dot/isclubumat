import { createFileRoute } from "@tanstack/react-router";
import logoUrl from "@/assets/is-club-logo.jpeg";
import Shuffle from "@/components/Shuffle";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MembershipSection from "@/components/sections/MembershipSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IS CLUB UMAT — Connecting Minds, Advancing Technology" },
      { name: "description", content: "Information System & Technology Club at UMAT. Connecting minds, advancing technology." },
      { property: "og:title", content: "IS CLUB UMAT" },
      { property: "og:description", content: "Information System & Technology Club at UMAT. Connecting minds, advancing technology." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
    <main style={{ backgroundColor: "var(--club-blue-deep)" }} className="min-h-screen w-full p-3 sm:p-5 font-[Inter]">

      {/* ── HERO SECTION ── */}
      <section
        className="relative overflow-hidden rounded-[40px] px-5 pt-5 pb-4 sm:pb-12 sm:px-8 sm:pt-6"
        style={{
          backgroundColor: "var(--club-blue)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      >
        {/* NAV */}
        <nav className="relative z-30 flex items-center justify-between gap-4">
          <div className="relative flex items-center gap-1.5 rounded-full bg-white pl-2 pr-2 py-1.5 shadow-lg">
            <img src={logoUrl} alt="IS Club UMAT" className="h-7 w-7 rounded-full object-cover" />
            <span className="font-[Archivo_Black] text-sm tracking-tight text-black pl-0.5">IS</span>
            <span
              className="rounded-full px-3 py-1 text-xs font-[Archivo_Black] tracking-wide text-[color:var(--club-blue-deep)]"
              style={{ backgroundColor: "var(--club-lime)" }}
            >
              CLUB
            </span>
            <span className="absolute -bottom-1 left-6 h-3 w-3 rotate-45 bg-white" />
          </div>
          <ul className="hidden md:flex items-center gap-1">
            {["About Club", "Events", "Projects", "Membership"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="block rounded-full border border-white/40 px-5 py-2 text-sm text-white hover:bg-white hover:text-[color:var(--club-blue-deep)] transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://chat.whatsapp.com/FZ2wqRPis1EDtbNzd0SkiD?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-[color:var(--club-blue-deep)] transition"
          >
            Join the club
          </a>
        </nav>

        {/* HEADLINE */}
        <div className="relative mt-6 sm:mt-14 pb-2 sm:pb-8">
          <h1
            className="relative z-10 font-[Archivo_Black] text-white text-center leading-[0.85] tracking-tight uppercase break-words"
            style={{ fontSize: "clamp(3.8rem, 22vw, 8.5rem)" }}
          >
            <span className="block">
              <span style={{ color: "var(--club-lime)" }}>#</span>
              <Shuffle text="CONNECTING" tag="span" className="font-[Archivo_Black] tracking-tight" style={{ color: "white", fontSize: "inherit", lineHeight: "inherit" }} shuffleDirection="right" duration={0.4} animationMode="evenodd" shuffleTimes={2} ease="power3.out" stagger={0.03} threshold={0.1} triggerOnce={true} triggerOnHover={true} respectReducedMotion={true} textAlign="left" />
            </span>
            <Shuffle text="MINDS" tag="span" className="block font-[Archivo_Black] tracking-tight" style={{ color: "white", fontSize: "inherit", lineHeight: "inherit" }} shuffleDirection="right" duration={0.4} animationMode="evenodd" shuffleTimes={2} ease="power3.out" stagger={0.03} threshold={0.1} triggerOnce={true} triggerOnHover={true} respectReducedMotion={true} />
            <Shuffle text="ADVANCING" tag="span" className="block font-[Archivo_Black] tracking-tight" style={{ color: "white", fontSize: "inherit", lineHeight: "inherit" }} shuffleDirection="right" duration={0.4} animationMode="evenodd" shuffleTimes={2} ease="power3.out" stagger={0.04} threshold={0.1} triggerOnce={true} triggerOnHover={true} respectReducedMotion={true} />
            <Shuffle text="TECHNOLOGY" tag="span" className="block font-[Archivo_Black] tracking-tight" style={{ color: "white", fontSize: "inherit", lineHeight: "inherit" }} shuffleDirection="right" duration={0.4} animationMode="evenodd" shuffleTimes={2} ease="power3.out" stagger={0.04} threshold={0.1} triggerOnce={true} triggerOnHover={true} respectReducedMotion={true} />
          </h1>

          {/* Floating glass card — left */}
          <div
            className="absolute z-20 left-[8%] top-[34%] hidden sm:block rounded-3xl border border-white/30 bg-white/15 p-3 backdrop-blur-md shadow-2xl"
            style={{ animation: "float-bob 3.2s ease-in-out infinite", ["--card-rotate" as string]: "-6deg" }}
          >
            <img src={logoUrl} alt="" className="h-24 w-24 rounded-2xl object-cover" />
            <div className="mt-2 text-center text-white">
              <div className="text-sm font-bold">isclub.umat</div>
              <div className="text-[11px] opacity-80">23 422 members</div>
            </div>
          </div>

          {/* Floating glass card — right */}
          <div
            className="absolute z-20 right-[6%] top-[22%] hidden sm:block rounded-3xl border border-white/30 bg-white/15 p-3 backdrop-blur-md shadow-2xl"
            style={{ animation: "float-bob 3.8s ease-in-out infinite", animationDelay: "1.1s", ["--card-rotate" as string]: "7deg" }}
          >
            <img src={logoUrl} alt="" className="h-24 w-24 rounded-2xl object-cover" />
            <div className="mt-2 text-center text-white">
              <div className="text-sm font-bold">tech.umat</div>
              <div className="text-[11px] opacity-80">293 582 points</div>
            </div>
          </div>
        </div>
      </section>

    </main>

    {/* ── SECTIONS BELOW HERO ── */}
    <div className="font-[Inter]">
      <MarqueeBanner />
      <AboutSection />
      <EventsSection />
      <ProjectsSection />
      <MembershipSection />
      <ResourcesSection />
      <ContactSection />
      <FooterSection />
    </div>
  </>
  );
}
