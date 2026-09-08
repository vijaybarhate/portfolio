import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "work", num: "01", label: "Work" },
  { id: "about", num: "02", label: "About" },
  { id: "capabilities", num: "03", label: "Capabilities" },
  { id: "certifications", num: "04", label: "Certs" },
  { id: "contact", num: "05", label: "Contact" },
];

const SectionNav: React.FC = () => {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-[130] hidden lg:flex flex-col gap-4"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`${s.num} — ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            data-cursor={s.label}
            className="group flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.18em]"
          >
            <span
              className={`transition-colors duration-300 ${
                isActive ? "text-accent-deep" : "text-muted opacity-0 group-hover:opacity-100 group-hover:text-ink"
              }`}
            >
              {s.num}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-1.5 w-6 bg-accent"
                  : "h-1.5 w-1.5 bg-ink/25 group-hover:bg-ink/60"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default SectionNav;
