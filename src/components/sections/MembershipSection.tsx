import { useState } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--club-blue-deep)] focus:border-transparent transition";

const emptyForm = {
  name: "",
  studentId: "",
  department: "",
  level: "",
  phone: "",
  email: "",
  reason: "",
};

function RegistrationForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState(emptyForm);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/forms/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, interests: selectedInterests }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      toast.success("Application submitted! You'll receive an SMS confirmation shortly.");
      setForm(emptyForm);
      setSelectedInterests([]);
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit your application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name</label>
          <input type="text" required placeholder="e.g. Kwame Asante" className={inputClass} value={form.name} onChange={update("name")} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Student ID</label>
          <input type="text" required placeholder="e.g. UMT/IS/22/001" className={inputClass} value={form.studentId} onChange={update("studentId")} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Department</label>
          <input type="text" required placeholder="e.g. Information Systems" className={inputClass} value={form.department} onChange={update("department")} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Level</label>
          <select required className={inputClass} value={form.level} onChange={update("level")}>
            <option value="">Select level</option>
            {["100", "200", "300", "400", "Postgraduate"].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
          <input type="tel" required placeholder="024 123 4567" className={inputClass} value={form.phone} onChange={update("phone")} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
          <input type="email" required placeholder="you@umat.edu.gh" className={inputClass} value={form.email} onChange={update("email")} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-2">Areas of Interest</label>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <label
              key={interest}
              className="flex items-center gap-1.5 cursor-pointer rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-[color:var(--club-blue-deep)]/40 hover:text-[color:var(--club-blue-deep)] transition has-[:checked]:border-[color:var(--club-blue-deep)] has-[:checked]:text-[color:var(--club-blue-deep)] has-[:checked]:bg-[color:var(--club-blue-deep)]/5"
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedInterests.includes(interest)}
                onChange={() => toggleInterest(interest)}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Why do you want to join?</label>
        <textarea
          rows={3}
          placeholder="Tell us briefly what excites you about IS Club..."
          className={`${inputClass} resize-none`}
          value={form.reason}
          onChange={update("reason")}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold btn-blue disabled:opacity-60"
      >
        {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

export default function MembershipSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="membership" className="bg-[#F8FAFC] border-t border-gray-100 py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <p className="is-eyebrow mb-4">Membership</p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading + FAQ */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] leading-[0.95] tracking-tight mb-6">
              Join the club.<br />Shape the future.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Membership gives you access to a thriving technology community, hands-on project
              experience, and the network to launch your career.
            </p>

            <p className="is-eyebrow mb-4">FAQs</p>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white">
              {faqs.map((f, i) => (
                <div key={i}>
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-950 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {f.q}
                    <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 flex-shrink-0">
                      {openFaq === i ? <Minus size={12} /> : <Plus size={12} />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{f.a}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile only — CTA button below FAQ */}
            <button
              onClick={() => setFormOpen(true)}
              className="lg:hidden mt-8 w-full rounded-xl py-3 text-sm font-bold btn-blue"
            >
              Register your interest
            </button>
          </div>

          {/* Right — inline form, desktop only */}
          <div className="hidden lg:block border border-gray-100 rounded-2xl p-8 bg-white">
            <h3 className="text-xl font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] tracking-tight mb-1">
              Register your interest
            </h3>
            <p className="text-sm text-gray-400 mb-6">Fill in the form and we'll be in touch.</p>
            <RegistrationForm />
          </div>

        </div>
      </div>

      {/* Mobile dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-[Archivo_Black] uppercase text-[color:var(--club-blue-deep)] tracking-tight">
              Register your interest
            </DialogTitle>
            <DialogDescription>Fill in the form and we'll be in touch.</DialogDescription>
          </DialogHeader>
          <RegistrationForm onSuccess={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
