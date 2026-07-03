import {
  FolderOpen,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const DRIVE = (id: string) => `https://drive.google.com/drive/folders/${id}`;

export const semesters = [
  {
    name: "L100 1st Semester",
    icon: BookOpen,
    url: DRIVE("1-4zpEgxG_2r5V7D4rCUmNTYrDsG-Maor"),
    courses: [
      { title: "Applied Electricity", id: "1z125hIDa3_O13OwB35k25-pVF9y9_Dt2" },
      { title: "Intro to Computing", id: "1U3D85lkywKTO2rCWc0nO7Uqe-QXzlUEX" },
      { title: "Linear Algebra", id: "1q0pEJNoQCQvwJuDkronsGB980mfTa78o" },
      { title: "Multimedia", id: "1X0j0KmdA1qat3G3_icsvnvxRq5qqj4Vx" },
      { title: "Python", id: "1nF0WeOOnv8cmzcdUC37WSI_cVNW8Fz8k" },
    ],
  },
  {
    name: "L100 2nd Semester",
    icon: BookOpen,
    url: DRIVE("1-IXigTE7wnv83xFdUkB02V9y6spd0qDV"),
    courses: [
      { title: "Communication Skills", id: "1yWj4FrQCsPtMPXpWdKnSR9cmd79mUs8F" },
      { title: "OOP", id: "149SIaB5r5-rGge3NvFai7rDx4pASDz41" },
      { title: "Web Development", id: "1ycxp7BHN2PM0vFEOg0t1aOzL597NjmXh" },
      { title: "Tutorial Links", id: "1f8TZb1AxfWL2YnW_Z7_zUDgI7MbXqene" },
      { title: "Course Outline (IS&T)", id: "1UT96m9Vbw94GSeJr_yIBzJQ3RJ_37HF-" },
    ],
  },
  {
    name: "L200 1st Semester",
    icon: BookOpen,
    url: DRIVE("1-VszIbP8ile8a4V5KpFjU_0Et6LoPwSe"),
    courses: [
      { title: "Advanced Database", id: "1JuelD-EMHD93AEH8cOv-emz7nHwPPzuq" },
      { title: "Computer Graphics", id: "1TlzjTivhShH8l3AMD7_b9QVYORDWpBcK" },
      { title: "Computer Architecture", id: "1NmEQ9UjVHAMDlAb4lMcVy7dyHkyPG5Hy" },
      { title: "Differential Equations", id: "1MSNemI4aQSIsYxKmWScZg_PMY-Q8pfBk" },
      { title: "Digital Business", id: "1j-3L-ahEh4KyYX2EJUkWx96WS3JnoWtp" },
      { title: "Java", id: "1qwOAUKrGHG_6E1SnbmZNmvE8jJJFeqqi" },
      { title: "Psychology", id: "1odLWb-yGzv9CwLnPOMONGJRXKgo0kRoV" },
      { title: "Tutorial Links", id: "1n7KFuDZrzXVe2NvIL3H35QhiKnhwFF4U" },
    ],
  },
  {
    name: "L200 2nd Semester",
    icon: BookOpen,
    url: DRIVE("1-a4UBBLhzSvqAt85GC9Uhzaxs7Dqn110"),
    courses: [
      { title: "Business Process Modelling", id: "1Y6eLpaeirDVnMHtDxHYhNH7EOAGCkekX" },
      { title: "Critical Thinking", id: "10bPgxx7TGzWYdDcllVeSDs_zn2fGDypH" },
      { title: "Decision Support Systems", id: "1lqU0cIiCe2a6-xIRUfU62tW1ZctpxRe9" },
      { title: "IoT", id: "1u6ldTNzz_uCSURXXmPibdSDeO4UQdnEc" },
      { title: "Organizational Behaviour", id: "1v19lkF7b1TRWJpyaP_VzK84TA4pOG9td" },
      { title: "System Analysis & Design", id: "194Q-Fpt8fgB7BDdJYZrvQQWySXFScgMc" },
      { title: "Tutorial Links", id: "1g58cmBGwGwI2TTS-pFpK2D9nBZThTpab" },
    ],
  },
  {
    name: "L300 1st Semester",
    icon: BookOpen,
    url: DRIVE("1B1fLr2_KhgU1KqZHfqB_6MOWNnzRYaGg"),
    courses: [
      { title: "AI in Engineering", id: "1rrvtBG0nq9KQi-vL4apEEYSp-Ou97HG5" },
      { title: "Business Intelligence", id: "1VC53ltAwjLzh1R2wpeWcYCekkyw5Suz6" },
      { title: "Data Structures & Algorithms", id: "1SCyXX53VCTzhjw2iZdStpfl-heJCoovg" },
      { title: "Environmental Management", id: "13Cs8dMlXKJolxrvEi2PLlg0tYGLTyktT" },
      { title: "IPM", id: "1atsxKmMVPQQijpVEB6HErHQds5X86sZ-" },
      { title: "Management Info. Systems", id: "1EMNhnAaJvFz1FuFTUPD4hpd6bdMj5WDZ" },
      { title: "Operating Systems", id: "11tdzPW0rif_TXdJpenaKnSpyiu_9ScYi" },
      { title: "Production & Statistics", id: "1yRk-BBVofraqvzhnA6hKpUvrRLbTxlV-" },
    ],
  },
  {
    name: "L300 2nd Semester",
    icon: GraduationCap,
    url: DRIVE("1V11fepusRQ4H2KLkxfa7ISMnM_BREf8Z"),
    courses: [
      { title: "Business Entrepreneurship", id: "1A6_4rZAxvtUh0yNV147NEbU5UPd56TiG" },
      { title: "Data Science", id: "1coNFDq9lqcCunpDDI6zAPyMgNyxwy5v-" },
      { title: "Human–Computer Interaction", id: "1qBz-MoofsMfFBtPkCk_YyTgoTDnT1goo" },
      { title: "Info. & Cybersecurity", id: "156IfC8IfYepj6NjwtlffpOREwJMKvOV-" },
      { title: "Research Ethics", id: "13RzhdrMxgTVOy7rr3d-wcATRP8ZMyssA" },
      { title: "Digital Marketing & E-commerce Glossary", id: "1B1XrM6IpQJidLo_PT6nfvtaPPiUnn8Jfbgo7p9acQq8" },
    ],
  },
];

export function SemesterCard({ sem }: { sem: typeof semesters[0] }) {
  const Icon = sem.icon;
  return (
    <div className="group border border-gray-100 rounded-2xl p-6 bg-[#F8FAFC] hover:border-[color:var(--club-blue-deep)]/40 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between gap-3 mb-5 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--club-blue-deep)]/5 text-[color:var(--club-blue-deep)] ring-1 ring-inset ring-[color:var(--club-blue-deep)]/10 group-hover:bg-[color:var(--club-blue-deep)] group-hover:text-white transition-colors">
            <Icon size={18} strokeWidth={2} />
          </span>
          <div>
            <div className="font-bold text-gray-950 text-sm">{sem.name}</div>
            <div className="text-[11px] text-gray-500">{sem.courses.length} courses</div>
          </div>
        </div>
        <a
          href={sem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[color:var(--club-blue-deep)] hover:underline"
        >
          Open <ArrowUpRight size={12} />
        </a>
      </div>
      <ul className="grid sm:grid-cols-2 gap-2">
        {sem.courses.map((c) => (
          <li key={c.id}>
            <a
              href={DRIVE(c.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm text-gray-700 hover:border-[color:var(--club-blue-deep)]/40 hover:text-[color:var(--club-blue-deep)] transition group/link"
            >
              <FolderOpen size={14} className="text-[color:var(--club-lime)] flex-shrink-0" />
              <span className="truncate flex-1">{c.title}</span>
              <ArrowUpRight size={12} className="opacity-0 group-hover/link:opacity-100 transition flex-shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResourcesSection() {
  const preview = semesters.slice(0, 3);

  return (
    <section id="resources" className="bg-white border-t border-gray-100 py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Learning Resources</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight max-w-lg">
            Course material, sorted by semester.
          </h2>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Slides, past questions and notes pulled straight from the IS Club shared Drive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {preview.map((sem) => <SemesterCard key={sem.name} sem={sem} />)}
        </div>

        <div className="flex justify-end">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold btn-blue"
          >
            View all
            <ArrowUpRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}

