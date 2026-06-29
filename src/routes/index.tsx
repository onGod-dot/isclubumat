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
    <main style={{ backgroundColor: "var(--club-blue-deep)" }} className="min-h-screen w-full p-3 sm:p-5 font-[Inter]">
      <section
        className="relative overflow-hidden rounded-[40px] px-5 pt-5 pb-12 sm:px-8 sm:pt-6"
        style={{
          backgroundColor: "var(--club-blue)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      >
        {/* NAV */}
        <nav className="relative z-30 flex items-center justify-between gap-4">
          {/* speech-bubble logo */}
          <div className="relative flex items-center gap-1.5 rounded-full bg-white pl-2 pr-2 py-1.5 shadow-lg">
            <img src={logoAsset.url} alt="IS Club UMAT" className="h-7 w-7 rounded-full object-cover" />
            <span className="font-[Archivo_Black] text-sm tracking-tight text-black pl-0.5">IS</span>
            <span
              className="rounded-full px-3 py-1 text-xs font-[Archivo_Black] tracking-wide text-[color:var(--club-blue-deep)]"
              style={{ backgroundColor: "var(--club-lime)" }}
            >
              CLUB
            </span>
            {/* tail */}
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
            href="#join"
            className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-[color:var(--club-blue-deep)] transition"
          >
            Join the club
          </a>
        </nav>

        {/* HEADLINE */}
        <div className="relative mt-10 sm:mt-14 pb-8">
          <h1
            className="relative z-10 font-[Archivo_Black] text-white text-center leading-[0.85] tracking-tight uppercase break-words"
            style={{ fontSize: "clamp(2.25rem, 10vw, 8.5rem)" }}
          >
            <span className="block">
              <span style={{ color: "var(--club-lime)" }}>#</span>CONNECTING
            </span>
            <span className="block">MINDS</span>
            <span className="block">ADVANCING</span>
            <span className="block">TECHNOLOGY</span>
          </h1>

          {/* Floating glass card — sits under the # and above the A of ADVANCING */}
          <div className="absolute z-20 left-[8%] top-[34%] hidden sm:block rotate-[-6deg] rounded-3xl border border-white/30 bg-white/15 p-3 backdrop-blur-md shadow-2xl animate-[fade-in_0.6s_ease-out]">
            <img src={logoAsset.url} alt="" className="h-24 w-24 rounded-2xl object-cover" />
            <div className="mt-2 text-center text-white">
              <div className="text-sm font-bold">isclub.umat</div>
              <div className="text-[11px] opacity-80">23 422 members</div>
            </div>
          </div>

          {/* Floating glass card — right, kept away from headline */}
          <div className="absolute z-20 right-[6%] top-[22%] hidden sm:block rotate-[7deg] rounded-3xl border border-white/30 bg-white/15 p-3 backdrop-blur-md shadow-2xl">
            <img src={logoAsset.url} alt="" className="h-24 w-24 rounded-2xl object-cover" />
            <div className="mt-2 text-center text-white">
              <div className="text-sm font-bold">tech.umat</div>
              <div className="text-[11px] opacity-80">293 582 points</div>
            </div>
          </div>

          {/* Spinning sticker — small, sitting on the lower part of the Y in TECHNOLOGY */}
          <div
            className="absolute right-[14%] sm:right-[18%] bottom-[-18px] sm:bottom-[-26px] z-30 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full text-[color:var(--club-blue-deep)] shadow-xl"
            style={{ backgroundColor: "var(--club-lime)" }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="font-[Archivo_Black]" fontSize="12" fill="currentColor" letterSpacing="1">
                <textPath href="#circle">GET STARTED FOR FREE • GET STARTED FOR FREE • </textPath>
              </text>
            </svg>
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M6 30 C 14 12, 28 22, 34 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M26 6 L34 8 L31 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>

          {/* Hand-drawn cursive arrow — bottom-left, points UP-RIGHT toward the words */}
          <svg
            className="arrow-draw absolute left-[1%] bottom-[6%] hidden sm:block z-20"
            width="180" height="160" viewBox="0 0 180 160" fill="none"
            style={{ ['--dash' as any]: 600 }}
          >
            <path
              d="M10 150 C 30 120, 20 90, 55 95 C 80 98, 60 60, 95 65 C 125 70, 110 35, 150 40"
              stroke="var(--club-lime)" strokeWidth="7" strokeLinecap="round" fill="none"
            />
            <path className="arrow-head"
              d="M132 28 L154 40 L144 60"
              stroke="var(--club-lime)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
            <g className="arrow-splash" style={{ transformOrigin: '150px 40px' }}>
              <path d="M160 22 L168 14" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" />
              <path d="M165 38 L176 38" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" />
              <path d="M158 55 L166 64" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>

          {/* Hand-drawn cursive arrow — top-right, points DOWN-LEFT toward the words */}
          <svg
            className="arrow-draw absolute right-[1%] top-[2%] hidden sm:block z-20"
            width="180" height="160" viewBox="0 0 180 160" fill="none"
            style={{ ['--dash' as any]: 600 }}
          >
            <path
              d="M170 10 C 150 40, 165 70, 130 75 C 105 78, 125 110, 90 115 C 60 120, 70 145, 35 140"
              stroke="var(--club-lime)" strokeWidth="7" strokeLinecap="round" fill="none"
            />
            <path className="arrow-head"
              d="M52 128 L30 140 L42 158"
              stroke="var(--club-lime)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
            <g className="arrow-splash" style={{ transformOrigin: '30px 140px' }}>
              <path d="M20 124 L12 116" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" />
              <path d="M14 140 L4 140" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" />
              <path d="M22 156 L14 164" stroke="var(--club-lime)" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Bottom white panel with feature cards */}
        <div className="relative mt-8 -mx-5 sm:-mx-8 -mb-12 rounded-t-[40px] bg-white px-5 sm:px-10 py-10">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { title: "JOIN THE COMMUNITY", sub: "connect with 500+ student innovators", chip: "isclub.umat", chipNote: "free membership" },
              { title: "BUILD REAL PROJECTS", sub: "ship code with peers every semester", chip: "12 active", chipNote: "open repos" },
              { title: "GROW YOUR NETWORK", sub: "industry mentors & alumni access", chip: "EST. weekly", chipNote: "events on campus" },
            ].map((card) => (
              <div key={card.title} className="rounded-3xl bg-[#f3f4f6] p-6">
                <h3 className="font-[Archivo_Black] text-lg text-[color:var(--club-blue-deep)] leading-tight">{card.title}</h3>
                <p className="mt-2 text-xs text-neutral-600">{card.sub}</p>
                <div className="mt-5 flex items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--club-blue-deep)" }}
                  >
                    {card.chip}
                  </span>
                  <span
                    className="rounded-full px-3 py-1.5 text-xs font-bold text-[color:var(--club-blue-deep)]"
                    style={{ backgroundColor: "var(--club-lime)" }}
                  >
                    {card.chipNote}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
