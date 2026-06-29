import { useState, lazy, Suspense } from "react";

const ChatWidget = lazy(() => import("./ChatWidget"));

export default function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpen = () => {
    setHasOpened(true);
    setIsOpen(true);
  };

  return (
    <>
      {/* Only mount ChatWidget after first open */}
      {hasOpened && (
        <Suspense fallback={null}>
          <ChatWidget isOpen={isOpen} onOpenChange={setIsOpen} />
        </Suspense>
      )}

      {/* Launcher button */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        aria-label="Toggle AI chat"
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-150 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: isOpen ? "#1a1a1a" : "#0c0c0c",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {isOpen ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="3" width="14" height="10" rx="2" stroke="#a3e635" strokeWidth="1.5" />
            <path d="M5 7h2M5 10h6" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 13v2M6 15h6" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Ctrl+K hint — only shown when chat is closed */}
      {!isOpen && (
        <div
          className="fixed bottom-5 right-[4.5rem] sm:right-[5.5rem] z-50 hidden sm:flex items-center gap-1 text-[10px] font-mono text-gray-500 pointer-events-none"
          style={{ bottom: "1.45rem" }}
        >
          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-black/60 text-gray-500">ctrl</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-black/60 text-gray-500">k</kbd>
        </div>
      )}
    </>
  );
}
