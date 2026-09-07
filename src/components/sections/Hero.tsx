import React, { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroField = lazy(() => import("../three/HeroField"));

class FieldBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.12]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-dvh flex flex-col justify-between px-5 md:px-10 pt-24 md:pt-32 pb-8 overflow-hidden"
    >
      <motion.div style={{ opacity: fieldOpacity }} className="absolute inset-0">
        <Suspense fallback={null}>
          <FieldBoundary>
            <HeroField />
          </FieldBoundary>
        </Suspense>
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 contents">
        <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted border-b border-line pb-4">
          <span>Portfolio — 2026</span>
          <span className="hidden sm:inline">B.E. Computer Engineering</span>
          <span>Navi Mumbai, IN</span>
        </div>

        <div className="py-10 md:py-0">
          <h1 className="font-display font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-[clamp(2rem,10vw,12.5rem)]">
            <span className="block overflow-hidden">
              <motion.span custom={0} variants={line} initial="hidden" animate={ready ? "show" : "hidden"} className="block">
                Vijay
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span custom={1} variants={line} initial="hidden" animate={ready ? "show" : "hidden"} className="block">
                Barhate<span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 md:mt-8 font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted"
          >
            Python Developer <span className="text-accent">&amp;</span> Data Analyst
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
            transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="Say hi"
            aria-label="Scroll to contact"
            className="relative hidden sm:flex h-24 w-24 lg:h-28 lg:w-28 shrink-0 items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
              <defs>
                <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current font-mono uppercase" fontSize="8.2" letterSpacing="2.2">
                <textPath href="#badge-circle">
                  Open to internships · Data · Python ·
                </textPath>
              </text>
            </svg>
            <ArrowDown size={20} className="text-accent" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
