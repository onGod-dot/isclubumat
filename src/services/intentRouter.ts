const intents: { id: string; synonyms: string[]; selector: string }[] = [
  { id: "about", synonyms: ["about", "who are you", "what is is club", "mission", "vision", "club info"], selector: "#about" },
  { id: "departments", synonyms: ["department", "departments", "teams", "software", "ai", "cybersecurity", "cloud", "data science", "design", "networking"], selector: "#departments" },
  { id: "events", synonyms: ["event", "events", "hackathon", "bootcamp", "tech talk", "workshop", "competition", "calendar"], selector: "#events" },
  { id: "projects", synonyms: ["project", "projects", "built", "portfolio", "work", "repos", "github"], selector: "#projects" },
  { id: "membership", synonyms: ["join", "membership", "register", "sign up", "become a member", "how to join", "fee"], selector: "#membership" },
  { id: "resources", synonyms: ["resource", "resources", "learn", "course", "tutorial", "roadmap", "books", "videos"], selector: "#resources" },
  { id: "contact", synonyms: ["contact", "email", "reach", "talk to", "message", "office", "location"], selector: "#contact" },
];

export function detectIntent(message: string): string | null {
  const lower = message.toLowerCase();
  let best: { selector: string; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const syn of intent.synonyms) {
      if (lower.includes(syn)) score += syn.split(" ").length; // weight multi-word matches
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { selector: intent.selector, score };
    }
  }

  return best?.selector ?? null;
}

export function scrollToSection(selector: string): void {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
