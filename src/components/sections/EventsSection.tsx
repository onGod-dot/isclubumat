const events = [
  {
    title: "Annual Hackathon",
    type: "Hackathon",
    date: "Aug 15–16, 2025",
    time: "8:00 AM",
    venue: "UMaT ICT Lab",
    desc: "48 hours of building. Teams compete to solve real industry problems using technology.",
    status: "upcoming",
  },
  {
    title: "Capture the Flag",
    type: "Competition",
    date: "Sep 5, 2025",
    time: "10:00 AM",
    venue: "Online & On-campus",
    desc: "Test your cybersecurity skills in our annual CTF challenge open to all UMaT students.",
    status: "upcoming",
  },
  {
    title: "Tech Talk: AI in Africa",
    type: "Tech Talk",
    date: "Sep 20, 2025",
    time: "2:00 PM",
    venue: "Main Auditorium",
    desc: "Industry experts share how artificial intelligence is being applied across sectors in Africa.",
    status: "upcoming",
  },
  {
    title: "UI/UX Design Bootcamp",
    type: "Bootcamp",
    date: "Oct 10–12, 2025",
    time: "9:00 AM",
    venue: "UMaT Design Studio",
    desc: "A three-day hands-on bootcamp covering Figma, design systems, and user research.",
    status: "upcoming",
  },
  {
    title: "Games Night",
    type: "Social",
    date: "Oct 25, 2025",
    time: "6:00 PM",
    venue: "Student Centre",
    desc: "Casual evening of tech trivia, game dev showcases, and networking with fellow members.",
    status: "upcoming",
  },
  {
    title: "Career Session: Big Tech",
    type: "Career",
    date: "Nov 8, 2025",
    time: "1:00 PM",
    venue: "Lecture Hall B",
    desc: "Alumni working at top tech companies share their journeys, tips, and opportunities.",
    status: "upcoming",
  },
];

const typeColors: Record<string, string> = {
  Hackathon: "bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)]",
  Competition: "bg-red-50 text-red-700",
  "Tech Talk": "bg-violet-50 text-violet-700",
  Bootcamp: "bg-amber-50 text-amber-700",
  Social: "bg-green-50 text-green-700",
  Career: "bg-sky-50 text-sky-700",
};

export default function EventsSection() {
  return (
    <section id="events" className="bg-white py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Events</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight max-w-lg">
            Upcoming events &amp; activities.
          </h2>
          <a
            href="#"
            className="text-sm font-semibold text-[color:var(--club-blue-deep)] hover:text-black transition whitespace-nowrap"
          >
            View full calendar →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e) => (
            <div
              key={e.title}
              className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-[color:var(--club-blue-deep)]/40 hover:-translate-y-0.5 transition-all duration-200 bg-[#F8FAFC]"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${typeColors[e.type] ?? "bg-gray-100 text-gray-600"}`}>
                  {e.type}
                </span>
                <span className="text-xs text-gray-400">{e.date}</span>
              </div>
              <div>
                <div className="font-bold text-gray-950 text-base mb-1">{e.title}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
              </div>
              <div className="text-xs text-gray-400 space-y-0.5 mt-auto">
                <div>🕐 {e.time}</div>
                <div>📍 {e.venue}</div>
              </div>
              <a
                href="#"
                className="mt-1 text-center rounded-xl py-2.5 text-sm font-semibold bg-gray-950 text-white hover:bg-[color:var(--club-blue-deep)] transition-colors duration-150"
              >
                Register
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
