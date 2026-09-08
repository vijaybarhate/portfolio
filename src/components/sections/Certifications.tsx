import React from "react";
import { certifications } from "../../data/certifications";
import SectionHead from "../layout/SectionHead";
import Reveal from "../layout/Reveal";

const shortIssuer = (issuer: string) =>
  issuer.split("×")[0].split("(")[0].split(" via ")[0].trim();

const Certifications: React.FC = () => (
  <section id="certifications" className="px-5 md:px-10 py-24 md:py-36 border-t border-line">
    <SectionHead num="04" label="Certifications" meta={`(${String(certifications.length).padStart(2, "0")})`} />

    <div>
      {certifications.map((cert, i) => (
        <Reveal key={cert.title} delay={i * 0.04}>
          <div className="group grid grid-cols-[4.5rem_1fr] md:grid-cols-[7rem_1fr_16rem] gap-x-4 md:gap-x-8 items-baseline border-b border-line py-5 md:py-6 transition-colors duration-300 hover:bg-ink hover:text-paper -mx-3 px-3 md:-mx-5 md:px-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted group-hover:text-paper/70 transition-colors duration-300 whitespace-nowrap">
              {cert.date}
            </span>
            <h3 className="font-medium text-base md:text-xl tracking-tight leading-snug">{cert.title}</h3>
            <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.1em] text-muted group-hover:text-paper/70 transition-colors duration-300 md:text-right">
              {cert.issuer}
            </span>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-muted md:hidden leading-loose">
        Issued by {[...new Set(certifications.map((c) => shortIssuer(c.issuer)))].join(" · ")}
      </p>
    </Reveal>
  </section>
);

export default Certifications;
