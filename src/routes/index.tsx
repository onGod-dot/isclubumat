import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/is-club-logo.asset.json";

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
    <main style={{ backgroundColor: "var(--club-blue)" }} className="min-h-screen w-full p-3 sm:p-5 font-[Inter]">
      <section
        className="relative overflow-hidden rounded-[32px] px-6 pt-6 pb-40 sm:px-10 sm:pt-8 sm:pb-56"
        style={{
          backgroundColor: "var(--club-blue)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* NAV */}
        <nav className="relative z-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white pl-2 pr-3 py-1.5 shadow-sm">
            <img src={logoAsset.url} alt="IS Club UMAT" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-[Archivo_Black] text-sm tracking-tight text-[color:var(--club-blue-deep)]">IS CLUB</span>
            <span
              className="ml-1 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide text-[color:var(--club-blue-deep)]"
              style={{ backgroundColor: "var(--club-lime)" }}
            >
              UMAT
            </span>
          </div>

          <ul className="hidden md:flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-2 py-1 backdrop-blur-sm">
            {["About", "Events", "Projects", "Membership"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="block rounded-full px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#join"
            className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-[color:var(--club-blue-deep)] transition"
          >
            Join the club
          </a>
        </nav>

        {/* HEADLINE */}
        <div className="relative z-10 mt-10 sm:mt-16 text-center">
          <h1
            className="font-[Archivo_Black] text-white leading-[0.86] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)" }}
          >
            <span className="block">
              <span style={{ color: "var(--club-lime)" }}>#</span>CONNECTING
            </span>
            <span className="block">MINDS</span>
            <span className="block">ADVANCING</span>
            <span className="block">TECH</span>
          </h1>

          {/* Floating logo card */}
          <div
            className="absolute left-1/2 top-[28%] hidden sm:block -translate-x-[140%] rotate-[-8deg] rounded-3xl border border-white/40 bg-white/15 p-3 backdrop-blur-md shadow-2xl"
          >
            <img src={logoAsset.url} alt="" className="h-24 w-24 rounded-2xl object-cover" />
            <div className="mt-2 text-center text-white">
              <div className="text-xs font-semibold">isclub.umat</div>
              <div className="text-[10px] opacity-80">est. members</div>
            </div>
          </div>

          <div
            className="absolute right-[12%] top-[42%] hidden sm:block rotate-[6deg] rounded-3xl border border-white/40 bg-white/15 p-3 backdrop-blur-md shadow-2xl"
          >
            <img src={logoAsset.url} alt="" className="h-24 w-24 rounded-2xl object-cover" />
            <div className="mt-2 text-center text-white">
              <div className="text-xs font-semibold">tech.umat</div>
              <div className="text-[10px] opacity-80">since 2020</div>
            </div>
          </div>

          {/* Sticker */}
          <div
            className="absolute right-4 sm:right-10 bottom-6 flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full text-[color:var(--club-blue-deep)] shadow-xl animate-[spin_18s_linear_infinite]"
            style={{ backgroundColor: "var(--club-lime)" }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="font-[Archivo_Black]" fontSize="10" fill="currentColor">
                <textPath href="#circle">JOIN THE CLUB • JOIN THE CLUB • </textPath>
              </text>
            </svg>
            <span className="text-3xl">↗</span>
          </div>

          {/* squiggly arrows */}
          <svg className="absolute left-[14%] bottom-32 hidden sm:block" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M5 70 C 20 30, 50 50, 70 15" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" />
            <path d="M60 10 L70 15 L65 25" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </section>
    </main>
  );
}
