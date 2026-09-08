/* eslint-disable react-refresh/only-export-components */
/* Provider + hook intentionally co-located for a single-purpose module. */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type MotionMode = "auto" | "full" | "calm";

interface MotionPreference {
  /** User-selected mode (persisted to localStorage `vb-motion-mode`). */
  mode: MotionMode;
  setMode: (m: MotionMode) => void;
  /** Cycle auto → full → calm. Used by the footer toggle. */
  cycleMode: () => void;
  /** Effective flag: calm always reduces; full never does; auto follows the OS. */
  reduceMotion: boolean;
}

const MotionContext = createContext<MotionPreference>({
  mode: "auto",
  setMode: () => {},
  cycleMode: () => {},
  reduceMotion: false,
});

const STORAGE_KEY = "vb-motion-mode";
const ORDER: MotionMode[] = ["auto", "full", "calm"];

function readStored(): MotionMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "full" || v === "calm" || v === "auto") return v;
  } catch {
    /* private mode — fall through */
  }
  // Default FULL: ambient motion (waves, ticker) stays on for every visitor,
  // including OS-reduced-motion environments, until they opt out via Calm/Auto.
  return "full";
}

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Raw OS query (own listener — deliberately not framer's useReducedMotion,
  // so App's MotionConfig can consume this context without feedback loops).
  const [osReduce, setOsReduce] = useState<boolean>(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setOsReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const [mode, setModeState] = useState<MotionMode>(() =>
    typeof window === "undefined" ? "full" : readStored()
  );

  const setMode = useCallback((m: MotionMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  const cycleMode = useCallback(() => {
    setModeState((prev) => {
      const next = ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length];
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "full" || e.newValue === "calm" || e.newValue === "auto")) {
        setModeState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const reduceMotion = mode === "calm" ? true : mode === "full" ? false : osReduce;

  const value = useMemo(
    () => ({ mode, setMode, cycleMode, reduceMotion }),
    [mode, setMode, cycleMode, reduceMotion]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export function useMotionPreference(): MotionPreference {
  return useContext(MotionContext);
}
