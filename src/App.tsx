import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import Header from "./components/layout/Header";
import Cursor from "./components/layout/Cursor";
import Preloader from "./components/layout/Preloader";
import Marquee from "./components/layout/Marquee";
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

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
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
  }, []);

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
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -56 });
      } else {
        (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="bg-paper text-ink font-body min-h-screen">
      <Cursor />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[150] opacity-[0.05]" />

      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Header />
      <main>
        <Hero ready={!loading} />
        <Marquee items={marqueeItems} />
        <Work />
        <About />
        <Capabilities />
        <Certifications />
      </main>
      <Contact />
    </div>
  );
}

export default App;
