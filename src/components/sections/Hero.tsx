import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import WebGLScrollRig from "../three/WebGLScrollRig";
import { useMotionPreference } from "../layout/MotionContext";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

interface HeroProps {
  ready: boolean;
}

const Hero: React.FC<HeroProps> = ({ ready }) => {
  const ref = useRef<HTMLElement>(null);
  const { reduceMotion: reduce } = useMotionPreference();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.12]);

  // Kinetic editorial: scroll-velocity skew on the giant title (Sprint 1)
  const { scrollY: pageY } = useScroll();
  const rawVel = useVelocity(pageY);
  const smoothVel = useSpring(rawVel, { damping: 55, stiffness: 380 });
  const velSkew = useTransform(smoothVel, [-2200, 2200], [-5, 5]);

  // Pointer parallax (fine pointers only, no useState in path)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });
  const titleX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const titleY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [px, py, reduce]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-dvh flex flex-col justify-between px-5 md:px-10 pt-24 md:pt-32 pb-8 overflow-hidden"
    >
      <motion.div style={{ opacity: fieldOpacity }} className="absolute inset-0">
        <WebGLScrollRig progress={scrollYProgress} />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 contents">
        <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted border-b border-line pb-4">
          <span>Portfolio — 2026</span>
          <span className="hidden sm:inline">B.E. Computer Engineering</span>
          <span>Navi Mumbai, IN</span>
        </div>

        <div className="py-10 md:py-0">
          <motion.div
            style={reduce ? undefined : { x: titleX, y: titleY, skewX: velSkew }}
            className="will-change-transform"
          >
          <h1 className="font-display font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-[clamp(2rem,10vw,12.5rem)]">
            <span className="block overflow-hidden">
              <motion.span custom={0} variants={line} initial="hidden" animate={ready ? "show" : "hidden"} className="block">
                Vijay
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span custom={1} variants={line} initial="hidden" animate={ready ? "show" : "hidden"} className="block">
                Barhate<span className="text-accent-deep">.</span>
              </motion.span>
            </span>
          </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 md:mt-8 font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted"
          >
            Python Developer <span className="text-accent-deep">&amp;</span> Data Analyst
          </motion.p>
        </div>

        <div className="flex items-end justify-between gap-8 border-t border-line pt-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
            transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-base md:text-lg leading-relaxed text-ink/80"
          >
            I build practical, data-centric software — automation, analysis and clean
            architecture that feels as good as it functions.
          </motion.p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.6 }}
            whileHover={reduce ? undefined : { scale: 1.08, rotate: 6 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="Say hi"
            aria-label="Open to internships · Data · Python · — scroll to contact"
            className="relative hidden sm:flex h-24 w-24 lg:h-28 lg:w-28 shrink-0 items-center justify-center"
          >
            <span aria-hidden="true" className={`absolute inset-0 ${reduce ? "" : "animate-spin-slow"}`}>
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current font-mono uppercase" fontSize="8.2" letterSpacing="2.2">
                <textPath href="#badge-circle">
                  Open to internships · Data · Python ·
                </textPath>
              </text>
            </svg>
            </span>
            <ArrowDown size={20} aria-hidden="true" className="text-accent" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
