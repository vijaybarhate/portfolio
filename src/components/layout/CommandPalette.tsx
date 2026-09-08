import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CornerDownLeft } from "lucide-react";
import { useMotionPreference } from "./MotionContext";

interface Action {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
}

function goto(hash: string) {
  window.dispatchEvent(new CustomEvent<string>("vb:goto", { detail: hash }));
}

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { reduceMotion, mode, setMode } = useMotionPreference();

  const actions: Action[] = useMemo(
    () => [
      { id: "work", label: "Go to Work", hint: "01", keywords: "work projects portfolio", run: () => goto("#work") },
      { id: "about", label: "Go to About", hint: "02", keywords: "about profile education", run: () => goto("#about") },
      { id: "capabilities", label: "Go to Capabilities", hint: "03", keywords: "capabilities skills stack", run: () => goto("#capabilities") },
      { id: "certifications", label: "Go to Certifications", hint: "04", keywords: "certifications courses certificates", run: () => goto("#certifications") },
      { id: "contact", label: "Go to Contact", hint: "05", keywords: "contact email hire hello", run: () => goto("#contact") },
      {
        id: "email",
        label: copied ? "Email copied" : "Copy email address",
        hint: "@",
        keywords: "email copy mail gmail",
        run: () => {
          try {
            void navigator.clipboard?.writeText("barhatevinay7777@gmail.com");
          } catch {
            /* clipboard unavailable */
          }
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        keywords: "resume cv download pdf",
        run: () => {
          const a = document.createElement("a");
          a.href = "/portfolio/resume/vijay_resume.pdf";
          a.download = "Vijay_Barhate_Resume.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "↗",
        keywords: "github code repos",
        run: () => window.open("https://github.com/vijaybarhate", "_blank", "noreferrer"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "↗",
        keywords: "linkedin jobs network",
        run: () => window.open("https://linkedin.com/in/vijay-barhate", "_blank", "noreferrer"),
      },
      {
        id: "motion",
        label: `Motion: ${mode} (toggle)`,
        hint: "◐",
        keywords: "motion animation reduce calm full waves toggle",
        run: () => setMode(mode === "full" ? "calm" : mode === "calm" ? "auto" : "full"),
      },
      { id: "top", label: "Back to top", hint: "↑", keywords: "top start hero", run: () => goto("#top") },
    ],
    [copied, mode, setMode]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.keywords}`.toLowerCase().includes(q));
  }, [actions, query]);

  // Global keys: Cmd/Ctrl+K toggles, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset + autofocus on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      document.documentElement.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.documentElement.style.overflow = "";
      };
    }
  }, [open ]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    document.getElementById(`cmd-${filtered[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, filtered]);

  const runAction = (a: Action) => {
    const keepOpen = a.id === "email" || a.id === "motion";
    a.run();
    if (!keepOpen) setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-[170] flex items-start justify-center px-4 pt-[14vh]"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg overflow-hidden rounded-md border border-line bg-paper text-ink shadow-2xl">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span aria-hidden className="font-mono text-xs text-accent-deep">⌘K</span>
              <input
                ref={inputRef}
                id="cmd-input"
                name="command"
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((i) => (i + 1) % Math.max(filtered.length, 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    const a = filtered[active];
                    if (a) runAction(a);
                  }
                }}
                placeholder="Type a command — try “motion”…"
                aria-label="Command search"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
                className="h-12 w-full bg-transparent font-mono text-sm tracking-wide outline-none placeholder:text-muted"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted hover:text-accent-deep"
                >
                  Clear
                </button>
              )}
            </div>
            <ul id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[46vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  No match — try “work” or “motion”
                </li>
              )}
              {filtered.map((a, i) => (
                <li key={a.id} id={`cmd-${a.id}`} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => runAction(a)}
                    data-cursor="Go"
                    className={`flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2.5 text-left transition-colors duration-150 ${
                      i === active ? "bg-ink text-paper" : "hover:bg-ink/5"
                    }`}
                  >
                    <span className="font-medium text-sm tracking-tight">{a.label}</span>
                    <span
                      className={`flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
                        i === active ? "text-paper/70" : "text-muted"
                      }`}
                    >
                      {a.id === "email" && copied ? "done" : a.hint}
                      {i === active ? <CornerDownLeft size={12} /> : a.id === "github" || a.id === "linkedin" ? <ArrowUpRight size={12} /> : null}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              <span>↑↓ navigate</span>
              <span>↵ run</span>
              <span>esc close</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
