export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#F8FAFC] py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">Contact</p>
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-950 leading-tight tracking-tight mb-6">
              Get in touch.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-md">
              Have a question, partnership proposal, or just want to learn more about IS Club?
              We'd love to hear from you.
            </p>

            <div className="space-y-5">
              {[
                { label: "Email", value: "isclub@umat.edu.gh", href: "mailto:isclub@umat.edu.gh" },
                { label: "Phone", value: "+233 XX XXX XXXX", href: "tel:+233XXXXXXXXX" },
                { label: "Location", value: "University of Mines & Technology, Tarkwa, Ghana", href: "#" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 w-16 pt-0.5">{c.label}</div>
                  <a href={c.href} className="text-sm text-gray-800 hover:text-blue-600 transition leading-relaxed">{c.value}</a>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              {[
                { name: "X / Twitter", href: "#" },
                { name: "LinkedIn", href: "#" },
                { name: "GitHub", href: "#" },
                { name: "Instagram", href: "#" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name *</label>
                  <input type="text" required placeholder="Your name" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                  <input type="email" required placeholder="your@email.com" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Subject *</label>
                <input type="text" required placeholder="e.g. Partnership Enquiry" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message *</label>
                <textarea required rows={5} placeholder="Your message..." className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl py-3 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-150"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
