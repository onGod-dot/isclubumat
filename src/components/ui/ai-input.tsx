"use client";

import React from "react";
import { cx } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Color Orb ───────────────────────────────────────────────────────────────

interface OrbProps {
  dimension?: string;
  className?: string;
  tones?: {
    base?: string;
    accent1?: string;
    accent2?: string;
    accent3?: string;
  };
  spinDuration?: number;
}

const ColorOrb: React.FC<OrbProps> = ({
  dimension = "192px",
  className,
  tones,
  spinDuration = 20,
}) => {
  // IS Club theme: deep blue base with lime/sky accents
  const fallbackTones = {
    base: "oklch(38% 0.25 264)",       // --club-blue-deep
    accent1: "oklch(88% 0.24 130)",    // --club-lime
    accent2: "oklch(55% 0.22 220)",    // sky blue
    accent3: "oklch(45% 0.24 264)",    // --club-blue
  };
  const palette = { ...fallbackTones, ...tones };

  const dimValue = parseInt(dimension.replace("px", ""), 10);
  const blurStrength =
    dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4);
  const contrastStrength =
    dimValue < 50 ? Math.max(dimValue * 0.004, 1.2) : Math.max(dimValue * 0.008, 1.5);
  const pixelDot =
    dimValue < 50 ? Math.max(dimValue * 0.004, 0.05) : Math.max(dimValue * 0.008, 0.1);
  const shadowRange =
    dimValue < 50 ? Math.max(dimValue * 0.004, 0.5) : Math.max(dimValue * 0.008, 2);
  const maskRadius =
    dimValue < 30 ? "0%" : dimValue < 50 ? "5%" : dimValue < 100 ? "15%" : "25%";
  const adjustedContrast =
    dimValue < 30
      ? 1.1
      : dimValue < 50
      ? Math.max(contrastStrength * 1.2, 1.3)
      : contrastStrength;

  return (
    <div
      className={cn("color-orb", className)}
      style={
        {
          width: dimension,
          height: dimension,
          "--base": palette.base,
          "--accent1": palette.accent1,
          "--accent2": palette.accent2,
          "--accent3": palette.accent3,
          "--spin-duration": `${spinDuration}s`,
          "--blur": `${blurStrength}px`,
          "--contrast": adjustedContrast,
          "--dot": `${pixelDot}px`,
          "--shadow": `${shadowRange}px`,
          "--mask": maskRadius,
        } as React.CSSProperties
      }
    >
      <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
        }
        .color-orb::before,
        .color-orb::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
        }
        .color-orb::before {
          background:
            conic-gradient(from calc(var(--angle) * 2) at 25% 70%, var(--accent3), transparent 20% 80%, var(--accent3)),
            conic-gradient(from calc(var(--angle) * 2) at 45% 75%, var(--accent2), transparent 30% 60%, var(--accent2)),
            conic-gradient(from calc(var(--angle) * -3) at 80% 20%, var(--accent1), transparent 40% 60%, var(--accent1)),
            conic-gradient(from calc(var(--angle) * 2) at 15% 5%, var(--accent2), transparent 10% 90%, var(--accent2)),
            conic-gradient(from calc(var(--angle) * 1) at 20% 80%, var(--accent1), transparent 10% 90%, var(--accent1)),
            conic-gradient(from calc(var(--angle) * -2) at 85% 10%, var(--accent3), transparent 20% 80%, var(--accent3));
          box-shadow: inset var(--base) 0 0 var(--shadow) calc(var(--shadow) * 0.2);
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: orb-spin var(--spin-duration) linear infinite;
        }
        .color-orb::after {
          background-image: radial-gradient(circle at center, var(--base) var(--dot), transparent var(--dot));
          background-size: calc(var(--dot) * 2) calc(var(--dot) * 2);
          backdrop-filter: blur(calc(var(--blur) * 2)) contrast(calc(var(--contrast) * 2));
          mix-blend-mode: overlay;
        }
        .color-orb[style*="--mask: 0%"]::after { mask-image: none; }
        .color-orb:not([style*="--mask: 0%"])::after {
          mask-image: radial-gradient(black var(--mask), transparent 75%);
        }
        @keyframes orb-spin { to { --angle: 360deg; } }
        @media (prefers-reduced-motion: reduce) {
          .color-orb::before { animation: none; }
        }
      `}</style>
    </div>
  );
};

// ─── Context ──────────────────────────────────────────────────────────────────

const SPEED_FACTOR = 1;

interface ContextShape {
  showForm: boolean;
  successFlag: boolean;
  triggerOpen: () => void;
  triggerClose: () => void;
}

const FormContext = React.createContext({} as ContextShape);
const useFormContext = () => React.useContext(FormContext);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MorphPanelProps {
  onSubmit?: (message: string) => void;
  placeholder?: string;
  label?: string;
}

// ─── Main panel ──────────────────────────────────────────────────────────────

const FORM_WIDTH = 360;
const FORM_HEIGHT = 200;

export function MorphPanel({
  onSubmit,
  placeholder = "Ask ISBot anything about the club…",
  label = "Ask ISBot",
}: MorphPanelProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [successFlag, setSuccessFlag] = React.useState(false);

  const triggerClose = React.useCallback(() => {
    setShowForm(false);
    textareaRef.current?.blur();
  }, []);

  const triggerOpen = React.useCallback(() => {
    setShowForm(true);
    setTimeout(() => textareaRef.current?.focus());
  }, []);

  const handleSuccess = React.useCallback(
    (msg: string) => {
      onSubmit?.(msg);
      triggerClose();
      setSuccessFlag(true);
      setTimeout(() => setSuccessFlag(false), 1500);
    },
    [triggerClose, onSubmit]
  );

  React.useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        showForm
      ) {
        triggerClose();
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, [showForm, triggerClose]);

  const ctx = React.useMemo(
    () => ({ showForm, successFlag, triggerOpen, triggerClose }),
    [showForm, successFlag, triggerOpen, triggerClose]
  );

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: FORM_WIDTH, height: FORM_HEIGHT }}
    >
      <motion.div
        ref={wrapperRef}
        data-panel
        className={cx(
          "relative bottom-8 z-3 flex flex-col items-center overflow-hidden border max-sm:bottom-5",
          "bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
        )}
        style={{ borderColor: "#E5E7EB" }}
        initial={false}
        animate={{
          width: showForm ? FORM_WIDTH : "auto",
          height: showForm ? FORM_HEIGHT : 44,
          borderRadius: showForm ? 14 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 550 / SPEED_FACTOR,
          damping: 45,
          mass: 0.7,
          delay: showForm ? 0 : 0.08,
        }}
      >
        <FormContext.Provider value={ctx}>
          <DockBar label={label} />
          <InputForm
            ref={textareaRef}
            onSuccess={handleSuccess}
            placeholder={placeholder}
          />
        </FormContext.Provider>
      </motion.div>
    </div>
  );
}

// ─── Dock bar ─────────────────────────────────────────────────────────────────

function DockBar({ label }: { label: string }) {
  const { showForm, triggerOpen } = useFormContext();
  return (
    <footer className="mt-auto flex h-[44px] items-center justify-center whitespace-nowrap select-none">
      <div className="flex items-center justify-center gap-2 px-3 max-sm:h-10 max-sm:px-2">
        <div className="flex w-fit items-center gap-2">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="h-5 w-5"
              />
            ) : (
              <motion.div
                key="orb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ColorOrb dimension="24px" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Button
          type="button"
          className="flex h-fit flex-1 justify-end rounded-full px-2 !py-0.5 text-sm font-semibold"
          style={{
            color: "var(--club-blue-deep)",
            background: "transparent",
          }}
          variant="ghost"
          onClick={triggerOpen}
        >
          <span className="truncate">{label}</span>
        </Button>
      </div>
    </footer>
  );
}

// ─── Input form ───────────────────────────────────────────────────────────────

interface InputFormProps {
  ref: React.Ref<HTMLTextAreaElement>;
  onSuccess: (msg: string) => void;
  placeholder: string;
}

function InputForm({ ref, onSuccess, placeholder }: InputFormProps) {
  const { triggerClose, showForm } = useFormContext();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [value, setValue] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value.trim()) return;
    onSuccess(value.trim());
    setValue("");
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") triggerClose();
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      btnRef.current?.click();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0"
      style={{
        width: FORM_WIDTH,
        height: FORM_HEIGHT,
        pointerEvents: showForm ? "all" : "none",
      }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 550 / SPEED_FACTOR,
              damping: 45,
              mass: 0.7,
            }}
            className="flex h-full flex-col p-1"
          >
            <div className="flex justify-between py-1 px-2">
              <p
                className="z-2 ml-[38px] flex items-center gap-[6px] select-none text-sm font-semibold"
                style={{ color: "var(--club-blue-deep)" }}
              >
                ISBot
              </p>
              <button
                type="submit"
                ref={btnRef}
                className="flex -translate-y-[3px] cursor-pointer items-center justify-center gap-1 rounded-[12px] bg-transparent pr-1 text-center select-none"
              >
                <KeyHint>⌘</KeyHint>
                <KeyHint className="w-fit">Enter</KeyHint>
              </button>
            </div>
            <textarea
              ref={ref}
              placeholder={placeholder}
              name="message"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-full w-full resize-none scroll-py-2 rounded-md p-4 text-sm text-gray-800 outline-0 placeholder-gray-400 focus:ring-0"
              required
              onKeyDown={handleKeys}
              spellCheck={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 left-3"
          >
            <ColorOrb dimension="24px" />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// ─── KeyHint ─────────────────────────────────────────────────────────────────

function KeyHint({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <kbd
      className={cx(
        "flex h-6 w-fit items-center justify-center rounded-sm border border-gray-200 px-[6px] font-sans text-xs text-gray-500",
        className
      )}
    >
      {children}
    </kbd>
  );
}

export default MorphPanel;
