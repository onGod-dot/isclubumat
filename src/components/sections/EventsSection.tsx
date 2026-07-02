import { useEffect, useRef } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import gamesNight from "@/assets/events/gamesnight.jpeg.asset.json";
import iip from "@/assets/events/iip.png.asset.json";
import mothers from "@/assets/events/is-club-mothers.png.asset.json";
import mothers3 from "@/assets/events/mothers-3.png.asset.json";

type EventItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  venue: string;
  image: string;
};

const events: EventItem[] = [
  { id: 1, title: "Industrial Immersion Programme", category: "Programme", date: "Aug 15–16, 2025", venue: "UMaT ICT Lab", image: iip.url },
  { id: 2, title: "Games Night", category: "Social", date: "Oct 25, 2025", venue: "Student Centre", image: gamesNight.url },
  { id: 3, title: "IS Club Mothers Day", category: "Community", date: "May 11, 2025", venue: "UMaT Campus", image: mothers.url },
  { id: 4, title: "Mothers Day Tribute", category: "Community", date: "May 11, 2025", venue: "UMaT Campus", image: mothers3.url },
  { id: 5, title: "Annual Hackathon", category: "Hackathon", date: "Aug 15–16, 2025", venue: "UMaT ICT Lab", image: iip.url },
  { id: 6, title: "Capture the Flag", category: "Competition", date: "Sep 5, 2025", venue: "Online & On-campus", image: gamesNight.url },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>(0.05);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      const container = scrollerRef.current;
      if (!section || !container) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (e.deltaY > 0 && container.scrollLeft < maxScroll - 10) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY * 2.5 });
      } else if (e.deltaY < 0 && container.scrollLeft > 10) {
        e.preventDefault();
        container.scrollBy({ left: e.deltaY * 2.5 });
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center bg-[color:var(--club-blue-deep)] text-white border-t border-white/10 py-24"
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8">
        <div
          ref={headerRef}
          className={`mb-14 text-center transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="is-eyebrow mb-4 !text-[color:var(--club-lime)]">
            <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--club-lime)]" />
            Events
          </p>
          <h2 className="font-[Archivo_Black] uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
            What we've been up to.
          </h2>
          <p className="mt-5 text-white/60 max-w-xl mx-auto text-base sm:text-lg">
            Scroll through hackathons, community events and programmes hosted by IS Club UMaT.
          </p>
        </div>
      </div>

      <div
        ref={gridRef}
        className={`transition-all duration-700 ${
          gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="-mx-6 px-6 md:mx-0 md:px-0">
          <div
            ref={scrollerRef}
            className="flex flex-col md:flex-row gap-6 md:gap-8 md:overflow-x-auto scrollbar-hide md:px-[max(2rem,calc((100vw-1200px)/2))] md:pb-10"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {events.map((ev, i) => (
              <a
                key={ev.id}
                href="#events"
                className="group relative flex-shrink-0 w-full md:w-[650px] aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500"
                style={{
                  scrollSnapAlign: "center",
                  transitionDelay: gridVisible ? `${i * 100}ms` : "0ms",
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? "translateY(0)" : "translateY(40px)",
                }}
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-[color:var(--club-lime)] text-[color:var(--club-blue-deep)]">
                    {ev.category}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 transition-all duration-500 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  <h3 className="font-[Archivo_Black] uppercase text-2xl sm:text-3xl leading-tight mb-3">
                    {ev.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={13} className="text-[color:var(--club-lime)]" />
                      {ev.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} className="text-[color:var(--club-lime)]" />
                      {ev.venue}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-[color:var(--club-blue-deep)] px-4 py-2 rounded-full">
                    View Event <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center gap-2 mt-4 text-xs text-white/50 font-mono uppercase tracking-widest">
          <span className="w-8 h-px bg-white/30" />
          Scroll to explore
          <span className="w-8 h-px bg-white/30" />
        </div>
      </div>
    </section>
  );
}
