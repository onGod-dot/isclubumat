const links = {
  "Quick Links": ["Home", "About", "Departments", "Events", "Projects", "Gallery", "News"],
  "Resources": ["Programming", "AI & ML", "Cybersecurity", "Cloud", "Data Science", "Career"],
  "Community": ["Join IS Club", "Executive Board", "Membership", "Sponsors", "Contact"],
};

export default function FooterSection() {
  return (
    <footer className="bg-gray-950 text-white px-5 sm:px-8 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-black text-lg tracking-tight">IS CLUB</span>
              <span className="text-xs font-semibold text-blue-400 bg-blue-950 px-2 py-0.5 rounded-full">UMAT</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              The Information Systems &amp; Technology Club at the University of Mines and Technology, Tarkwa, Ghana.
            </p>
            <div className="flex gap-4">
              {["X", "LinkedIn", "GitHub", "Instagram"].map((s) => (
                <a key={s} href="#" className="text-xs text-gray-500 hover:text-white transition">{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 pb-12 border-b border-white/10">
          <div>
            <p className="font-semibold text-sm mb-1">Stay in the loop</p>
            <p className="text-xs text-gray-500">Get club news, events, and opportunities in your inbox.</p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 sm:w-64 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-blue-700 hover:bg-blue-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} IS Club UMAT. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition">Terms of Use</a>
          </div>
          <p>Designed &amp; built by the IS Club Dev Team</p>
        </div>

      </div>
    </footer>
  );
}
