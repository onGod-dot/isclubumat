import { useState } from "react";
import { Check, Plus, Minus } from "lucide-react";

const benefits = [
  "Access to all workshops, bootcamps, and tech talks",
  "Membership in a specialised department of your choice",
  "Collaborative project experience for your portfolio",
  "Networking with industry professionals and alumni",
  "Priority registration for hackathons and competitions",
  "IS Club certificate of membership each academic year",
  "Access to the club's learning resource library",
  "Career guidance and internship referrals",
];

const faqs = [
  {
    q: "Who can join IS Club?",
    a: "Any student at UMaT regardless of programme, level, or department. We welcome everyone with a curiosity for technology.",
  },
  {
    q: "Is there a membership fee?",
    a: "A small annual dues fee applies to cover operations. Details are shared during registration.",
  },
  {
    q: "Do I need prior tech experience?",
    a: "Not at all. We have departments and resources for complete beginners and advanced students alike.",
  },
  {
    q: "How active do I need to be?",
    a: "Participate at whatever level suits your schedule. We encourage regular involvement but understand academic commitments.",
  },
];

const interests = [
  "Software Development", "AI & Machine Learning", "Cybersecurity",
  "Cloud Computing", "Networking", "Data Science",
  "UI/UX Design", "Entrepreneurship", "Research",
];

export default function MembershipSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="membership" className="bg-[#F8FAFC] border-t border-gray-100 py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Membership</p>
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — benefits + FAQ */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight mb-6">
              Join the club.<br />Shape the future.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Membership gives you access to a thriving technology community, hands-on project
              experience, and the network to launch your career.
            </p>

            <ul className="space-y-3 mb-12">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 inline-flex h-5 w-5 rounded-full bg-[color:var(--club-blue-deep)] items-center justify-center flex-shrink-0">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* FAQ */}
            <p className="is-eyebrow mb-4">FAQs</p>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {faqs.map((f, i) => (
                <div key={i}>
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-950 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      {openFaq === i ? <Minus size={12} /> : <Plus size={12} />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — registration form */}
          <div className="border border-gray-100 rounded-2xl p-8 bg-white">
            <h3 className="text-xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] tracking-tight mb-6">Register your interest</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                  <input type="text" required placeholder="e.g. Kwame Asante" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Student ID *</label>
                  <input type="text" required placeholder="e.g. UMT/IS/22/001" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Department *</label>
                  <input type="text" required placeholder="e.g. Information Systems" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Level *</label>
                  <select required className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition">
                    <option value="">Select level</option>
                    {["100", "200", "300", "400", "Postgraduate"].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone *</label>
                  <input type="tel" required placeholder="+233 XX XXX XXXX" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                  <input type="email" required placeholder="you@umat.edu.gh" className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Areas of Interest *</label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="accent-[color:var(--club-blue-deep)] w-3.5 h-3.5" />
                      <span className="text-xs text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Why do you want to join?</label>
                <textarea rows={3} placeholder="Tell us briefly what excites you about IS Club..." className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition resize-none" />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl py-3 text-sm font-bold btn-blue"
              >
                Submit Application
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
