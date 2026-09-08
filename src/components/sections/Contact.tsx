import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Reveal from "../layout/Reveal";
import Magnetic from "../layout/Magnetic";
import { useMotionPreference } from "../layout/MotionContext";

const socials = [
  { name: "GitHub", href: "https://github.com/vijaybarhate" },
  { name: "LinkedIn", href: "https://linkedin.com/in/vijay-barhate" },
];

const maskLine = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const Contact: React.FC = () => {
  const [time, setTime] = useState("");
  const ref = useRef<HTMLElement>(null);
  const { reduceMotion: reduce, mode: motionMode, cycleMode } = useMotionPreference();
  // Inversion lerp: paper → ink ease as footer enters (smooth cut, not hard)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const headlineX = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 0.9]);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-ink text-paper">
      {/* Inversion glow — decorative, scroll-driven */}
      <motion.div
        aria-hidden
        style={reduce ? { opacity: 0 } : { opacity: glowOpacity }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
      />
      <div className="relative px-5 md:px-10 pt-24 md:pt-36 pb-8">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4 border-b border-paper/15 pb-4 mb-12 md:mb-20">
            <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
              <span className="text-accent mr-3">05</span>Contact
            </h2>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] text-paper/70 whitespace-nowrap">
              (Say hello)
            </span>
          </div>
        </Reveal>

        <div className="relative">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            style={reduce ? undefined : { x: headlineX }}
            className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-[clamp(1.5rem,8vw,8rem)] max-w-none will-change-transform"
          >
            <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <motion.span variants={maskLine} custom={0} className="block">
                Let&rsquo;s build
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.04em]">
              <motion.span variants={maskLine} custom={1} className="block">
                <span className="text-outline" style={{ WebkitTextStrokeColor: "#eae8e2" }}>
                  something
                </span>{" "}
                <span className="text-accent">good.</span>
              </motion.span>
            </span>
          </motion.p>

          <div className="mt-10 md:mt-0 lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 hidden sm:block">
            <Magnetic strength={0.4}>
              <span className="relative block">
                <span aria-hidden className={`absolute inset-0 rounded-full bg-accent/40 blur-2xl ${reduce ? "hidden" : ""}`} />
                <span aria-hidden className={`absolute -inset-3 rounded-full border border-accent/40 ${reduce ? "hidden" : ""}`} />
                <a
                  href="mailto:barhatevinay7777@gmail.com"
                  data-cursor="Go"
                  aria-label="Say hello — send an email"
                  className="relative flex h-32 w-32 md:h-40 md:w-40 flex-col items-center justify-center gap-1 rounded-full bg-accent text-paper font-mono text-[10px] uppercase tracking-[0.25em] transition-transform duration-300 hover:scale-105"
                >
                  Say hello
                  <ArrowUpRight size={18} />
                </a>
              </span>
            </Magnetic>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-10 gap-y-5">
            <a
              href="mailto:barhatevinay7777@gmail.com"
              data-cursor="Copy"
              className="link-sweep inline-flex items-center gap-2 font-mono text-[13px] sm:text-sm md:text-base uppercase tracking-[0.12em]"
            >
              barhatevinay7777@gmail.com <ArrowUpRight size={16} />
            </a>
            <a
              href="/portfolio/resume/vijay_resume.pdf"
              download="Vijay_Barhate_Resume.pdf"
              data-cursor="Save"
              className="link-sweep inline-flex items-center gap-2 font-mono text-sm md:text-base uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
            >
              Download resume <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <div className="mt-24 md:mt-36 border-t border-paper/15 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6 md:gap-8">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="link-sweep font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70 hover:text-paper"
              >
                {social.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className={`absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 ${reduce ? "" : "animate-ping"}`} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for work
          </div>

          <div className="flex items-center gap-6 md:gap-8 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/70">
            <button
              type="button"
              onClick={cycleMode}
              data-cursor="Motion"
              aria-label={`Motion: ${motionMode} — activate to cycle motion preference`}
              title="Cycle motion preference (full → calm → auto)"
              className="uppercase tracking-[0.15em] text-paper/70 hover:text-accent transition-colors duration-300"
            >
              Motion: {motionMode}
            </button>
            <span className="tabular-nums">IST {time}</span>
            <span>© 2026 VB</span>
            <Magnetic strength={0.45}>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
                aria-label="Back to top"
                data-cursor="Top"
                className="p-2 -m-2 border border-paper/20 hover:border-accent hover:text-accent transition-colors duration-300"
              >
                <ArrowUp size={14} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
