import { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const contactItems = [
  { label: "Email", value: "informationsystem.club@gmail.com", href: "mailto:informationsystem.club@gmail.com", icon: Mail },
  { label: "Phone", value: "+233 XX XXX XXXX", href: "tel:+233XXXXXXXXX", icon: Phone },
  { label: "Location", value: "University of Mines & Technology, Tarkwa, Ghana", href: "#", icon: MapPin },
];

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.78a4.85 4.85 0 0 1-1.02-.09z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/is-club-umat", Icon: () => <Linkedin size={16} /> },
  { name: "TikTok", href: "https://www.tiktok.com/@is.club.umat?is_from_webapp=1&sender_device=pc", Icon: TikTokIcon },
  { name: "WhatsApp", href: "https://chat.whatsapp.com/FZ2wqRPis1EDtbNzd0SkiD?mode=gi_t", Icon: WhatsAppIcon },
  { name: "Email", href: "mailto:informationsystem.club@gmail.com", Icon: () => <Mail size={16} /> },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition";

function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Name</label>
          <input type="text" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
          <input type="email" required placeholder="your@email.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Subject</label>
        <input type="text" required placeholder="e.g. Partnership Enquiry" className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message</label>
        <textarea required rows={5} placeholder="Your message..." className={`${inputClass} resize-none`} />
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold btn-blue"
      >
        <Send size={14} /> Send Message
      </button>
    </form>
  );
}

export default function ContactSection() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="bg-[#F8FAFC] border-t border-gray-100 py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Contact</p>
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left — contact info + socials */}
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

            <div className="mt-8 flex items-center gap-2 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-white hover:bg-[color:var(--club-blue-deep)] hover:border-[color:var(--club-blue-deep)] transition-all"
                >
                  <s.Icon />
                </a>
              ))}
            </div>

            {/* Mobile only — CTA button */}
            <button
              onClick={() => setFormOpen(true)}
              className="lg:hidden mt-8 w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold btn-blue"
            >
              <Send size={14} /> Send us a message
            </button>
          </div>

          {/* Right — inline form, desktop only */}
          <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] tracking-tight mb-1">
              Send us a message
            </h3>
            <p className="text-sm text-gray-400 mb-6">We'll get back to you as soon as possible.</p>
            <ContactForm />
          </div>

        </div>
      </div>

      {/* Mobile dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] tracking-tight">
              Send us a message
            </DialogTitle>
            <DialogDescription>We'll get back to you as soon as possible.</DialogDescription>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </section>
  );
}
