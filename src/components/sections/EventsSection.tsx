import { useRef, useState } from "react";
import { Clock, MapPin, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import gamesnight from "@/assets/events/gamesnight.jpeg.asset.json";
import iip from "@/assets/events/iip.png.asset.json";
import isClubMothers from "@/assets/events/is-club-mothers.png.asset.json";
import mothers3 from "@/assets/events/mothers-3.png.asset.json";

const events = [
  {
    title: "IS Club Mothers Day",
    type: "Social",
    date: "May 11, 2025",
    time: "3:00 PM",
    venue: "Student Centre",
    desc: "A special tribute to the mothers of the IS Club community — an afternoon of appreciation and celebration.",
    image: isClubMothers.url,
  },
  {
    title: "Mothers' Day Special",
    type: "Social",
    date: "May 12, 2025",
    time: "5:00 PM",
    venue: "Main Hall",
    desc: "Honoring the strength and love of mothers with performances, gifts, and heartfelt messages.",
    image: mothers3.url,
  },
  {
    title: "Industrial Internship Program",
    type: "Career",
    date: "Jul 1, 2025",
    time: "9:00 AM",
    venue: "UMaT ICT Lab",
    desc: "Kick off your industrial attachment with sessions from partner companies and IS Club mentors.",
    image: iip.url,
  },
  {
    title: "Annual Hackathon",
    type: "Hackathon",
    date: "Aug 15–16, 2025",
    time: "8:00 AM",
    venue: "UMaT ICT Lab",
    desc: "48 hours of building. Teams compete to solve real industry problems using technology.",
  },
  {
    title: "Capture the Flag",
    type: "Competition",
    date: "Sep 5, 2025",
    time: "10:00 AM",
    venue: "Online & On-campus",
    desc: "Test your cybersecurity skills in our annual CTF challenge open to all UMaT students.",
  },
  {
    title: "Tech Talk: AI in Africa",
    type: "Tech Talk",
    date: "Sep 20, 2025",
    time: "2:00 PM",
    venue: "Main Auditorium",
    desc: "Industry experts share how artificial intelligence is being applied across sectors in Africa.",
  },
  {
    title: "UI/UX Design Bootcamp",
    type: "Bootcamp",
    date: "Oct 10–12, 2025",
    time: "9:00 AM",
    venue: "UMaT Design Studio",
    desc: "A three-day hands-on bootcamp covering Figma, design systems, and user research.",
  },
  {
    title: "Games Night",
    type: "Social",
    date: "Oct 25, 2025",
    time: "6:00 PM",
    venue: "Student Centre",
    desc: "Casual evening of tech trivia, game dev showcases, and networking with fellow members.",
    image: gamesnight.url,
  },
  {
    title: "Career Session: Big Tech",
    type: "Career",
    date: "Nov 8, 2025",
    time: "1:00 PM",
    venue: "Lecture Hall B",
    desc: "Alumni working at top tech companies share their journeys, tips, and opportunities.",
  },
] as Array<{
  title: string; type: string; date: string; time: string; venue: string; desc: string; image?: string;
}>;

const typeColors: Record<string, string> = {
  Hackathon: "bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)]",
  Competition: "bg-red-50 text-red-700",
  "Tech Talk": "bg-violet-50 text-violet-700",
  Bootcamp: "bg-amber-50 text-amber-700",
  Social: "bg-green-50 text-green-700",
  Career: "bg-sky-50 text-sky-700",
};

export default function EventsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<null | (typeof events)[number]>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", indexNo: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector<HTMLElement>(".event-card");
    const gap = 20;
    const amount = card ? card.offsetWidth + gap : 340;
    sliderRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const openRegister = (e: (typeof events)[number]) => {
    setForm({ name: "", email: "", phone: "", indexNo: "", notes: "" });
    setSelected(e);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please provide your name and email.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Registered for ${selected?.title}. See you there!`);
      setSelected(null);
    }, 500);
  };

  return (
    <section id="events" className="bg-[#F8FAFC] border-t border-gray-100 py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Events</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight max-w-lg">
            Upcoming events &amp; activities.
          </h2>
          {/* Slider controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-[color:var(--club-blue-deep)] hover:text-[color:var(--club-blue-deep)] transition"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-[color:var(--club-blue-deep)] hover:text-[color:var(--club-blue-deep)] transition"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((e) => (
            <div
              key={e.title}
              className="event-card flex-none w-[calc((100%-2*20px)/3)] min-w-[280px] snap-start border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:border-[color:var(--club-blue-deep)]/40 hover:-translate-y-0.5 transition-all duration-200 bg-white"
            >
              <div className="-mx-6 -mt-6 h-40 rounded-t-2xl overflow-hidden bg-gradient-to-br from-[color:var(--club-blue-deep)]/10 to-[color:var(--club-blue-deep)]/30 flex items-center justify-center">
                {e.image ? (
                  <img src={e.image} alt={e.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-[color:var(--club-blue-deep)]/40 text-xs font-semibold uppercase tracking-widest">{e.type}</span>
                )}
              </div>
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
              <div className="text-xs text-gray-500 space-y-1.5 mt-auto border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <CalendarDays size={13} className="text-gray-400" />
                  <span>{e.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-gray-400" />
                  <span>{e.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-gray-400" />
                  <span>{e.venue}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openRegister(e)}
                className="mt-1 text-center rounded-xl py-2.5 text-sm font-semibold btn-blue"
              >
                Register
              </button>
            </div>
          ))}
        </div>

      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Register for {selected?.title}</DialogTitle>
            <DialogDescription>
              {selected?.date} · {selected?.time} · {selected?.venue}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="reg-name">Full name</Label>
              <Input id="reg-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} placeholder="Ama Mensah" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} placeholder="you@umat.edu.gh" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reg-phone">Phone</Label>
                <Input id="reg-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} placeholder="024 000 0000" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-index">Index / Reference no.</Label>
              <Input id="reg-index" value={form.indexNo} onChange={(e) => setForm({ ...form, indexNo: e.target.value })} maxLength={50} placeholder="UMT/00/00/0000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-notes">Anything we should know?</Label>
              <Textarea id="reg-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} maxLength={500} rows={3} />
            </div>
            <DialogFooter>
              <button type="button" onClick={() => setSelected(null)} className="rounded-xl px-4 py-2.5 text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="rounded-xl px-4 py-2.5 text-sm font-semibold btn-blue disabled:opacity-60">
                {submitting ? "Submitting..." : "Confirm registration"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
