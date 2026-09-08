import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Header from "./components/layout/Header";
import ScrollProgress from "./components/layout/ScrollProgress";
import SectionNav from "./components/layout/SectionNav";
import Cursor from "./components/layout/Cursor";
import Preloader from "./components/layout/Preloader";
import Marquee from "./components/layout/Marquee";
import CommandPalette from "./components/layout/CommandPalette";
import KonamiTerminal from "./components/layout/KonamiTerminal";
import { MotionProvider, useMotionPreference } from "./components/layout/MotionContext";
import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import About from "./components/sections/About";
import Capabilities from "./components/sections/Capabilities";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";

const marqueeItems = [
  "Open to internships",
  "Python",
  "SQL",
  "Data Analysis",
  "React",
  "Automation",
];

function scrollToHash(hash: string, lenis: Lenis | null, instant: boolean) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -56, immediate: instant });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: instant ? "auto" : "smooth" });
  }
}

function Site() {
  const [loading, setLoading] = useState(true);
  const { reduceMotion } = useMotionPreference();
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll only when motion is allowed — honors OS reduced-motion,
  // user Calm override, and Full override (explicit opt-in re-enables it).
  useEffect(() => {
    if (reduceMotion) {
      lenisRef.current = null;
      return;
    }
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      if (!document.querySelector(hash)) return;
      e.preventDefault();
      scrollToHash(hash, lenisRef.current, reduceMotion);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduceMotion]);

  // Programmatic navigation for the command palette: `vb:goto` with `#hash` detail.
  useEffect(() => {
    const onGoto = (e: Event) => {
      const hash = (e as CustomEvent<string>).detail;
      if (typeof hash !== "string" || !hash.startsWith("#")) return;
      scrollToHash(hash, lenisRef.current, reduceMotion);
    };
    window.addEventListener("vb:goto", onGoto);
    return () => window.removeEventListener("vb:goto", onGoto);
  }, [reduceMotion]);

  return (
    // Global kill-switch for framer transform/layout animation under Calm.
    // Custom loops (WebGL, ticker) gate on the same flag directly.
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
    <div className="bg-paper text-ink font-body min-h-screen">
      <Cursor />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[150] opacity-[0.05]" />

      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Header />
      <ScrollProgress />
      <SectionNav />
      <main>
        <Hero ready={!loading} />
        <Marquee items={marqueeItems} />
        <Work />
        <About />
        <Capabilities />
        <Certifications />
      </main>
      <Contact />
      <CommandPalette />
      <KonamiTerminal />
    </div>
    </MotionConfig>
  );
}

function App() {
  return (
    <MotionProvider>
      <Site />
    </MotionProvider>
  );
}

export default App;
