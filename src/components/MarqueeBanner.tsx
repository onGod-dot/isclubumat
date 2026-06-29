import React from "react";

const items = [
  "Connecting Minds",
  "Advancing Technology",
  "IS Club UMAT",
  "Open Source",
  "Build Real Projects",
  "Student Innovators",
  "Grow Your Network",
  "Join the Community",
];

const MarqueeBanner = React.memo(() => {
  return (
    <div
      className="cursor-default select-none w-full sm:-rotate-[0.8deg] sm:scale-[1.02]"
      style={{ backgroundColor: "var(--club-blue-deep)", boxShadow: "0 0 40px rgba(0,0,0,0.3)" }}
    >

      {/* Row 1 — club-blue-deep bg, lime text, scrolls LEFT */}
      <div
        className="overflow-hidden group py-4 md:py-6 relative"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="flex gap-6 md:gap-10 w-max will-change-transform"
          style={{ animation: "marquee-scroll-left 28s linear infinite" }}
        >
          {[...Array(2)].map((_, copy) =>
            items.map((item) => (
              <span key={`left-${copy}-${item}`} className="flex items-center gap-6 md:gap-10">
                <span
                  className="text-lg sm:text-2xl md:text-4xl font-black uppercase whitespace-nowrap"
                  style={{ color: "var(--club-lime)" }}
                >
                  {item}
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>✦</span>
              </span>
            ))
          )}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: "linear-gradient(to right, var(--club-blue-deep), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: "linear-gradient(to left, var(--club-blue-deep), transparent)" }} />
      </div>

      {/* Row 2 — club-lime bg, deep blue text, scrolls RIGHT */}
      <div className="overflow-hidden group py-2.5 md:py-4 relative" style={{ backgroundColor: "var(--club-lime)" }}>
        <div
          className="flex gap-6 md:gap-10 w-max will-change-transform"
          style={{ animation: "marquee-scroll-right 32s linear infinite" }}
        >
          {[...Array(2)].map((_, copy) =>
            items.map((item) => (
              <span key={`right-${copy}-${item}`} className="flex items-center gap-6 md:gap-10">
                <span
                  className="text-base sm:text-lg md:text-2xl font-black uppercase whitespace-nowrap"
                  style={{ color: "var(--club-blue-deep)" }}
                >
                  {item}
                </span>
                <span className="text-xs" style={{ color: "rgba(0,0,0,0.2)" }}>◆</span>
              </span>
            ))
          )}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: "linear-gradient(to right, var(--club-lime), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: "linear-gradient(to left, var(--club-lime), transparent)" }} />
      </div>

    </div>
  );
});

MarqueeBanner.displayName = "MarqueeBanner";

export default MarqueeBanner;
