import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, Send } from "lucide-react";

const contactItems = [
  { label: "Email", value: "isclub@umat.edu.gh", href: "mailto:isclub@umat.edu.gh", icon: Mail },
  { label: "Phone", value: "+233 XX XXX XXXX", href: "tel:+233XXXXXXXXX", icon: Phone },
  { label: "Location", value: "University of Mines & Technology, Tarkwa, Ghana", href: "#", icon: MapPin },
];

const socials = [
  { name: "X / Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "GitHub", href: "#", icon: Github },
  { name: "Instagram", href: "#", icon: Instagram },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#F8FAFC] py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Contact</p>
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight mb-6">
              Get in touch.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-md">
              Have a question, partnership proposal, or just want to learn more about IS Club?
              We'd love to hear from you.
            </p>

            <div className="space-y-3">
              {contactItems.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 hover:border-[color:var(--club-blue-deep)]/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)] ring-1 ring-inset ring-[color:var(--club-blue-deep)]/10 group-hover:bg-[color:var(--club-blue-deep)] group-hover:text-white transition-colors">
                      <Icon size={17} strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{c.label}</div>
                      <div className="text-sm text-gray-900 leading-relaxed">{c.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-white hover:bg-[color:var(--club-blue-deep)] hover:border-[color:var(--club-blue-deep)] transition-all"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name *</label>
                  <input type="text" required placeholder="Your name" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                  <input type="email" required placeholder="your@email.com" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject *</label>
                <input type="text" required placeholder="e.g. Partnership Enquiry" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message *</label>
                <textarea required rows={5} placeholder="Your message..." className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition resize-none" />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white bg-[color:var(--club-blue-deep)] hover:bg-black transition-colors duration-150"
              >
                <Send size={14} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
