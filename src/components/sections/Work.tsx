import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "../../data/projects";
import SectionHead from "../layout/SectionHead";
import Reveal from "../layout/Reveal";

const featured = projects[0];
const rest = projects.slice(1);

type Tone = "cmd" | "out" | "ok" | "dim";

const TERMINALS: Record<string, { title: string; lines: { t: string; c: Tone }[] }> = {
  "valorant-tweaks": {
    title: "PowerShell — Optimize-LOQ",
    lines: [
      { t: "PS> .\\Optimize-LOQ.ps1 -Mode Ultimate", c: "cmd" },
      { t: "[OK] P-Core affinity mask bound", c: "ok" },
      { t: "[OK] Nagle's algorithm disabled", c: "ok" },
      { t: "[OK] DPC latency -> MSI mode", c: "ok" },
      { t: "[OK] MMCSS priority: Games", c: "ok" },
      { t: "FPS uplift +38% avg · stutter 0.2%", c: "dim" },
    ],
  },
  "result-analyzer": {
    title: "bash — analyze.py",
    lines: [
      { t: "$ python analyze.py --report", c: "cmd" },
      { t: "Synthetic records generated: 500", c: "out" },
      { t: "Pass ratio 87.4%  ▇▇▇▇▇▇▆", c: "ok" },
      { t: "Grade distribution charted", c: "out" },
      { t: "Exported -> /reports/*.png", c: "dim" },
    ],
  },
  "expense-tracker": {
    title: "bash — expense-cli",
    lines: [
      { t: "$ expense report --month Aug", c: "cmd" },
      { t: "FOOD    ▇▇▇▇▇▇▇▇  ₹3,420", c: "out" },
      { t: "TRAVEL  ▇▇▇▇      ₹1,180", c: "out" },
      { t: "! Budget alert: 82% of cap", c: "ok" },
      { t: "CSV backup written", c: "dim" },
    ],
  },
  "fee-management": {
    title: "console — fee-admin",
    lines: [
      { t: "== School Fee Management ==", c: "cmd" },
      { t: "> pay  Student:22CS047  Aug", c: "cmd" },
      { t: "₹12,500 logged · receipt #481", c: "out" },
      { t: "Duplicate check: CLEAR", c: "ok" },
      { t: "Ledger synced to MySQL", c: "dim" },
    ],
  },
};

const TerminalThumb: React.FC<{ id: string }> = ({ id }) => {
  const term = TERMINALS[id];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
        <span className="ml-2 font-mono text-[8px] uppercase tracking-[0.2em] text-paper/40">
          {term.title}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[3px] px-3 py-2 font-mono text-[8px] leading-snug">
        {term.lines.map((l, i) => (
          <span
            key={i}
            className={
              l.c === "cmd"
                ? "text-paper/85"
                : l.c === "ok"
                  ? "text-accent"
                  : l.c === "dim"
                    ? "text-paper/35"
                    : "text-paper/55"
            }
          >
            {l.t}
          </span>
        ))}
      </div>
    </div>
  );
};

const Thumb: React.FC<{ index: number; project: Project }> = ({ index, project }) => {
  const variant = index % 4;
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="relative h-44 w-72 overflow-hidden rounded-sm border border-line bg-ink text-paper shadow-2xl">
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : TERMINALS[project.id] ? (
        <TerminalThumb id={project.id} />
      ) : (
        <svg viewBox="0 0 288 176" className="absolute inset-0 h-full w-full" aria-hidden>
          {variant === 0 && (
            <g fill="none" stroke="#eae8e2" strokeOpacity="0.35">
              {[26, 52, 78, 104].map((r) => (
                <circle key={r} cx="144" cy="88" r={r} />
              ))}
              <circle cx="144" cy="88" r="10" fill="#ff4d00" stroke="none" />
            </g>
          )}
          {variant === 1 && (
            <g stroke="#eae8e2" strokeOpacity="0.3">
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1={i * 26 - 40} y1="190" x2={i * 26 + 60} y2="-10" />
              ))}
              <line x1="-10" y1="150" x2="300" y2="30" stroke="#ff4d00" strokeWidth="2.5" />
            </g>
          )}
          {variant === 2 && (
            <g fill="#eae8e2" fillOpacity="0.3">
              {Array.from({ length: 8 }).map((_, r) =>
                Array.from({ length: 12 }).map((_, c) => (
                  <circle key={`${r}-${c}`} cx={16 + c * 24} cy={14 + r * 22} r="2.6" />
                ))
              )}
              <rect x="112" y="66" width="64" height="44" fill="none" stroke="#ff4d00" strokeWidth="2.5" />
            </g>
          )}
          {variant === 3 && (
            <g fill="none" stroke="#eae8e2" strokeOpacity="0.35">
              {[0, 1, 2, 3, 4].map((i) => (
                <path
                  key={i}
                  d={`M -10 ${40 + i * 26} Q 72 ${10 + i * 26} 144 ${46 + i * 26} T 300 ${38 + i * 26}`}
                />
              ))}
              <circle cx="230" cy="42" r="7" fill="#ff4d00" stroke="none" />
            </g>
          )}
        </svg>
      )}
      {!project.image && (
        <span className="absolute bottom-2 right-3 font-display font-extrabold text-5xl uppercase text-outline" style={{ WebkitTextStrokeColor: "#eae8e2" }}>
          {initials}
        </span>
      )}
      <span className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-paper/50 mix-blend-difference">
        {String(index + 2).padStart(2, "0")} — Preview
      </span>
    </div>
  );
};

const Feature: React.FC<{ project: Project }> = ({ project }) => (
  <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 md:pb-20 border-b border-line">
    <div className="lg:col-span-7">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Featured</span>
      <h3 className="mt-4 font-display font-bold uppercase leading-[0.95] tracking-tight text-3xl sm:text-5xl xl:text-6xl">
        {project.title}
      </h3>
      <p className="mt-6 max-w-xl text-muted leading-relaxed text-sm md:text-base">
        {project.longDescription || project.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {project.liveUrl && project.liveUrl !== "#" && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            className="link-sweep inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em]"
          >
            Visit live <ArrowUpRight size={14} />
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="Code"
          className="link-sweep inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-ink"
        >
          Source <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
    <div className="lg:col-span-5 flex flex-col justify-between gap-10">
      <ul className="space-y-3">
        {project.features.slice(0, 5).map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink/80 border-b border-line pb-3">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted leading-loose">
        {project.stack.join(" / ")}
      </p>
    </div>
    {project.image && (
      <a
        href={project.liveUrl || project.githubUrl}
        target="_blank"
        rel="noreferrer"
        data-cursor="Visit"
        aria-label={`Open ${project.title}`}
        className="group relative col-span-full block overflow-hidden rounded-sm border border-line bg-ink"
      >
        <img
          src={project.image}
          alt={`${project.title} — live interface`}
          loading="lazy"
          decoding="async"
          className="aspect-[21/9] w-full object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.25em] text-paper/70 mix-blend-difference">
          Live capture — {new Date().getFullYear()}
        </span>
      </a>
    )}
  </Reveal>
);

const Row: React.FC<{
  project: Project;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
}> = ({ project, index, onEnter, onLeave }) => {
  const num = String(index + 2).padStart(2, "0");
  return (
    <a
      href={project.liveUrl && project.liveUrl !== "#" ? project.liveUrl : project.githubUrl}
      target="_blank"
      rel="noreferrer"
      data-cursor="View"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_16rem_2.5rem] items-center gap-x-3 md:gap-x-6 border-b border-line py-6 md:py-8 -mx-3 px-3 md:-mx-5 md:px-5 transition-colors duration-300 hover:bg-ink hover:text-paper"
    >
      <span className="font-mono text-xs text-muted group-hover:text-paper/50 transition-colors duration-300">
        {num}
      </span>
      <span className="min-w-0">
        <span className="block font-display font-bold uppercase tracking-tight leading-tight text-lg md:text-2xl xl:text-3xl transition-transform duration-500 ease-out group-hover:translate-x-2">
          {project.title}
        </span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted group-hover:text-paper/50 transition-colors duration-300 md:hidden">
          {project.stack.slice(0, 3).join(" / ")}
        </span>
      </span>
      <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.12em] text-muted group-hover:text-paper/50 transition-colors duration-300 truncate">
        {project.stack.slice(0, 4).join(" / ")}
      </span>
      <ArrowUpRight
        size={20}
        className="justify-self-end text-muted transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
};

const Work: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 160, damping: 20, mass: 0.5 });
  const fine = useRef(
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  ).current;

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <section id="work" className="px-5 md:px-10 py-24 md:py-36 relative">
      <SectionHead num="01" label="Selected Work" meta={`(${String(projects.length).padStart(2, "0")})`} />
      <Feature project={featured} />
      <div className="mt-2" onMouseMove={fine ? onMove : undefined}>
        {rest.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.04}>
            <Row
              project={project}
              index={i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          </Reveal>
        ))}
      </div>

      {fine && (
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 3 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: sx, y: sy }}
              className="pointer-events-none fixed left-0 top-0 z-[120] hidden lg:block"
            >
              <div className="-translate-x-1/2 -translate-y-[115%]">
                <Thumb index={active} project={rest[active]} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default Work;
