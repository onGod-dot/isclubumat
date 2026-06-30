const categories = [
  {
    name: "Programming",
    icon: "⌨",
    resources: [
      { title: "The Odin Project", type: "Course", url: "https://www.theodinproject.com" },
      { title: "freeCodeCamp", type: "Course", url: "https://www.freecodecamp.org" },
      { title: "CS50 by Harvard", type: "Course", url: "https://cs50.harvard.edu" },
    ],
  },
  {
    name: "AI & Machine Learning",
    icon: "◈",
    resources: [
      { title: "Fast.ai", type: "Course", url: "https://www.fast.ai" },
      { title: "DeepLearning.AI", type: "Course", url: "https://www.deeplearning.ai" },
      { title: "Kaggle Learn", type: "Practice", url: "https://www.kaggle.com/learn" },
    ],
  },
  {
    name: "Cybersecurity",
    icon: "⊕",
    resources: [
      { title: "TryHackMe", type: "Practice", url: "https://tryhackme.com" },
      { title: "Hack The Box", type: "Practice", url: "https://www.hackthebox.com" },
      { title: "OWASP Top 10", type: "Reference", url: "https://owasp.org/Top10" },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "△",
    resources: [
      { title: "AWS Free Tier", type: "Platform", url: "https://aws.amazon.com/free" },
      { title: "Google Cloud Skills Boost", type: "Course", url: "https://cloudskillsboost.google" },
      { title: "Docker Docs", type: "Reference", url: "https://docs.docker.com" },
    ],
  },
  {
    name: "Data Science",
    icon: "≈",
    resources: [
      { title: "Kaggle Datasets", type: "Data", url: "https://www.kaggle.com/datasets" },
      { title: "Towards Data Science", type: "Articles", url: "https://towardsdatascience.com" },
      { title: "DataCamp", type: "Course", url: "https://www.datacamp.com" },
    ],
  },
  {
    name: "Career & Interviews",
    icon: "◇",
    resources: [
      { title: "LeetCode", type: "Practice", url: "https://leetcode.com" },
      { title: "Levels.fyi", type: "Salaries", url: "https://www.levels.fyi" },
      { title: "LinkedIn Learning", type: "Course", url: "https://www.linkedin.com/learning" },
    ],
  },
];

const typeColors: Record<string, string> = {
  Course: "bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)]",
  Practice: "bg-green-50 text-green-700",
  Reference: "bg-violet-50 text-violet-700",
  Platform: "bg-amber-50 text-amber-700",
  Data: "bg-sky-50 text-sky-700",
  Articles: "bg-pink-50 text-pink-700",
  Salaries: "bg-gray-100 text-gray-600",
};

export default function ResourcesSection() {
  return (
    <section id="resources" className="bg-white py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--club-blue-deep)] mb-4">Learning Resources</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight max-w-lg">
            Curated resources for every track.
          </h2>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Handpicked by our department leads to help you go from beginner to job-ready.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div key={cat.name} className="border border-gray-100 rounded-2xl p-6 bg-[#F8FAFC] hover:border-[color:var(--club-blue-deep)]/40 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl text-[color:var(--club-blue-deep)]">{cat.icon}</span>
                <span className="font-bold text-gray-950 text-sm">{cat.name}</span>
              </div>
              <ul className="space-y-3">
                {cat.resources.map((r) => (
                  <li key={r.title} className="flex items-center justify-between gap-2">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 hover:text-[color:var(--club-blue-deep)] transition truncate"
                    >
                      {r.title}
                    </a>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${typeColors[r.type] ?? "bg-gray-100 text-gray-600"}`}>
                      {r.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
