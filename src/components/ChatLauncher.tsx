import { useState, lazy, Suspense, useCallback } from "react";
import { MorphPanel } from "@/components/ui/ai-input";

const ChatWidget = lazy(() => import("./ChatWidget"));

export default function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Called when user submits text from the MorphPanel
  const handleMorphSubmit = useCallback((msg: string) => {
    setPendingMessage(msg);
    setHasOpened(true);
    setIsOpen(true);
  }, []);

  return (
    <>
      {/* Lazy-mount ChatWidget only after first open */}
      {hasOpened && (
        <Suspense fallback={null}>
          <ChatWidget
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            initialMessage={pendingMessage ?? undefined}
            onInitialMessageConsumed={() => setPendingMessage(null)}
          />
        </Suspense>
      )}

      {/* MorphPanel launcher — fixed bottom-right */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-50">
        <MorphPanel
          onSubmit={handleMorphSubmit}
          label="Ask ISBot"
          placeholder="Ask about IS Club, events, projects…"
        />
      </div>
    </>
  );
}
