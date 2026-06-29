import {
  useState,
  useRef,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { streamCompletion, type AIError } from "@/services/togetherAI";
import { buildContext, type ChatMessage } from "@/services/aiContext";
import { detectIntent, scrollToSection } from "@/services/intentRouter";
import { projects, clubInfo } from "@/data/clubData";

const ReactMarkdown = lazy(() => import("react-markdown"));

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  isTerminal?: boolean;
  isStreaming?: boolean;
  isError?: boolean;
}

// ─── Terminal commands ────────────────────────────────────────────────────────

function runCommand(cmd: string, history: string[]): string | null {
  const parts = cmd.trim().split(/\s+/);
  const base = parts[0].toLowerCase();

  if (base === "help") {
    return [
      "Available commands:",
      "  help          — show this help",
      "  ls            — list all projects",
      `  cat <slug>    — show project details`,
      "  neofetch      — show club profile",
      "  date          — current date & time",
      "  whoami        — your identity",
      "  history       — command history",
      "  clear         — clear the terminal",
    ].join("\n");
  }

  if (base === "ls") {
    return projects
      .map((p) => `  ${p.slug.padEnd(26)} [${p.category}] — ${p.status}`)
      .join("\n");
  }

  if (base === "cat") {
    const slug = parts[1];
    if (!slug) return "Usage: cat <slug>  (run `ls` to see slugs)";
    const p = projects.find((x) => x.slug === slug);
    if (!p) return `cat: ${slug}: No such project`;
    return [
      `Title:    ${p.title}`,
      `Category: ${p.category}`,
      `Status:   ${p.status}`,
      `Stack:    ${p.stack.join(", ")}`,
      ``,
      `About:`,
      `  ${p.description}`,
      ``,
      `Features:`,
      p.features.map((f) => `  • ${f}`).join("\n"),
      ``,
      `GitHub:   ${p.github ?? "—"}`,
      `Demo:     ${p.demo ?? "—"}`,
    ].join("\n");
  }

  if (base === "neofetch") {
    return [
      `  ██╗███████╗     IS Club UMAT`,
      `  ██║██╔════╝     ──────────────────────────────`,
      `  ██║███████╗     Org:       ${clubInfo.fullName}`,
      `  ██║╚════██║     University: UMaT, Tarkwa, Ghana`,
      `  ██║███████║     Founded:   ${clubInfo.founded}`,
      `  ╚═╝╚══════╝     Members:   ${clubInfo.members}`,
      `                  Projects:  ${clubInfo.activeProjects} active`,
      `                  Events:    ${clubInfo.eventsHosted} hosted`,
      `                  Email:     ${clubInfo.email}`,
      `                  GitHub:    ${clubInfo.socials.github}`,
      `                  Twitter:   ${clubInfo.socials.twitter}`,
      ``,
      `  Departments: ${clubInfo.departments.slice(0, 4).join(" · ")}`,
      `               ${clubInfo.departments.slice(4).join(" · ")}`,
    ].join("\n");
  }

  if (base === "date") {
    return new Date().toLocaleString("en-GH", { timeZone: "Africa/Accra", dateStyle: "full", timeStyle: "long" });
  }

  if (base === "whoami") {
    return "guest@isclub-umat";
  }

  if (base === "history") {
    if (!history.length) return "(no history)";
    return history.map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`).join("\n");
  }

  if (base === "clear") {
    return "__CLEAR__";
  }

  return null; // not a terminal command
}

// ─── Typewriter ───────────────────────────────────────────────────────────────

function typewriteMessage(
  content: string,
  messageId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  onDone?: () => void
) {
  let i = 0;
  function tick() {
    if (i > content.length) {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, isStreaming: false } : m))
      );
      onDone?.();
      return;
    }
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, content: content.slice(0, i), isStreaming: true } : m
      )
    );
    i++;
    setTimeout(tick, 10);
  }
  tick();
}

// ─── Error icon ──────────────────────────────────────────────────────────────

const errorMeta: Record<AIError["type"], { icon: string; label: string }> = {
  auth: { icon: "🔑", label: "Auth error" },
  rate_limit: { icon: "⏳", label: "Rate limited" },
  network: { icon: "📡", label: "Network error" },
  server: { icon: "🛠", label: "Server error" },
  unknown: { icon: "❓", label: "Unknown error" },
};

// ─── Main widget ─────────────────────────────────────────────────────────────

interface ChatWidgetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChatWidget({ isOpen, onOpenChange }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Hi! I'm **ISBot**, the IS Club UMAT assistant.\n\nAsk me anything about the club, or type `help` for terminal commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const aiHistoryRef = useRef<ChatMessage[]>([]);

  const forceScrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.parentElement!.scrollTop =
        messagesEndRef.current.parentElement!.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      forceScrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen, messages, forceScrollToBottom]);

  // Ctrl+K global toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        onOpenChange(!isOpen);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onOpenChange]);

  const uid = () => Math.random().toString(36).slice(2);

  const addBotMessage = (content: string, opts?: Partial<Message>): string => {
    const id = uid();
    setMessages((prev) => [...prev, { id, role: "bot", content, ...opts }]);
    return id;
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setInput("");
    setHistoryIdx(-1);
    setCmdHistory((h) => [text, ...h].slice(0, 50));

    // User message
    const userMsgId = uid();
    setMessages((prev) => [...prev, { id: userMsgId, role: "user", content: text }]);
    setTimeout(forceScrollToBottom, 20);

    // Terminal command?
    const cmdOut = runCommand(text, cmdHistory);
    if (cmdOut !== null) {
      if (cmdOut === "__CLEAR__") {
        setMessages([]);
        return;
      }
      addBotMessage(cmdOut, { isTerminal: true });
      return;
    }

    // Intent routing
    const section = detectIntent(text);

    // AI call
    setIsTyping(true);
    const botId = uid();
    setMessages((prev) => [...prev, { id: botId, role: "bot", content: "", isStreaming: true }]);

    // Build context
    aiHistoryRef.current = [...aiHistoryRef.current, { role: "user", content: text }];
    const context = buildContext(aiHistoryRef.current);

    let fullResponse = "";

    await streamCompletion(
      context,
      (chunk) => {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, content: fullResponse } : m))
        );
        forceScrollToBottom();
      },
      () => {
        // Streaming done — typewrite
        setIsTyping(false);
        aiHistoryRef.current = [
          ...aiHistoryRef.current,
          { role: "assistant", content: fullResponse },
        ];
        typewriteMessage(fullResponse, botId, setMessages, () => {
          forceScrollToBottom();
          if (section) scrollToSection(section);
        });
      },
      (err) => {
        setIsTyping(false);
        const meta = errorMeta[err.type];
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId
              ? { ...m, content: `${meta.icon} **${meta.label}:** ${err.message}`, isStreaming: false, isError: true }
              : m
          )
        );
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { handleSend(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? "" : cmdHistory[nextIdx]);
    }
  };

  const copyToClipboard = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-20 right-4 sm:right-6 z-50 w-[min(420px,calc(100vw-2rem))] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      style={{ backgroundColor: "#0c0c0c", fontFamily: "monospace" }}
    >
      {/* ── Header ── */}
      <div className="flex items-center px-4 py-3 border-b border-white/8 bg-[#161616]">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 mr-3">
          <button onClick={() => onOpenChange(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition" aria-label="Close" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="flex-1 text-center text-xs text-gray-400 tracking-widest uppercase">ISBot — IS Club UMAT</span>
        <button
          onClick={() => onOpenChange(false)}
          className="text-gray-600 hover:text-gray-300 transition text-sm ml-3"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm"
        style={{ height: "clamp(240px, 52vh, 380px)" }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className="group relative">
            {msg.role === "user" ? (
              <div className="flex gap-2">
                <span className="text-lime-400 select-none">{">"}</span>
                <span className="text-gray-200 break-words">{msg.content}</span>
              </div>
            ) : msg.isTerminal ? (
              <div className="flex gap-2">
                <span className="text-cyan-400 select-none flex-shrink-0">●</span>
                <pre className="text-gray-300 text-xs leading-relaxed whitespace-pre-wrap break-words overflow-x-auto">{msg.content}</pre>
              </div>
            ) : (
              <div className="flex gap-2">
                <span className={`select-none flex-shrink-0 ${msg.isError ? "text-red-400" : "text-cyan-400"}`}>
                  {isTyping && msg.isStreaming && msg.content === "" ? (
                    <span className="inline-block animate-pulse">●</span>
                  ) : "●"}
                </span>
                <div className="text-gray-200 text-sm leading-relaxed break-words min-w-0 flex-1">
                  <Suspense fallback={<span className="text-gray-400">{msg.content}</span>}>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-0.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-0.5">{children}</ol>,
                        li: ({ children }) => <li className="text-gray-300">{children}</li>,
                        code: ({ children }) => <code className="bg-white/10 px-1 py-0.5 rounded text-lime-300 text-xs">{children}</code>,
                        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{children}</a>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </Suspense>
                  {msg.isStreaming && <span className="inline-block w-1.5 h-3.5 bg-lime-400 ml-0.5 align-middle" style={{ animation: "blink 0.8s step-end infinite" }} />}
                </div>
                {/* Copy button */}
                {!msg.isStreaming && msg.content && (
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-gray-600 hover:text-gray-300 text-xs mt-0.5 h-fit"
                    aria-label="Copy"
                  >
                    {copiedId === msg.id ? "✓" : "⎘"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && messages[messages.length - 1]?.content === "" && (
          <div className="flex gap-2 items-center">
            <span className="text-cyan-400">●</span>
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"
                  style={{ animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite` }}
                />
              ))}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick actions ── */}
      <div className="flex gap-2 px-4 py-2 border-t border-white/8 overflow-x-auto">
        {["help", "ls", "neofetch", "./join", "./events"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => { setInput(cmd.replace("./", "")); inputRef.current?.focus(); }}
            className="flex-shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-gray-400 hover:border-lime-400/40 hover:text-lime-400 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* ── Input ── */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/8 bg-[#111111]">
        <span className="text-lime-400 select-none text-sm">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ask something or type a command…"
          disabled={isTyping}
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none disabled:opacity-40 font-mono"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="text-lime-400 hover:text-lime-300 disabled:opacity-30 transition text-base"
          aria-label="Send"
        >
          ↵
        </button>
      </div>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes bounce { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-4px) } }
      `}</style>
    </div>
  );
}
