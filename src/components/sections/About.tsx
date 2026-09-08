import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionHead from "../layout/SectionHead";
import Reveal from "../layout/Reveal";

const education = [
  {
    degree: "B.E. Computer Engineering",
    school: "Saraswati College of Engineering, Kharghar — University of Mumbai",
    period: "2023 — 2027",
  },
  {
    degree: "Class XII — CBSE",
    school: "Ambuja Vidya Niketan, Chandrapur · Computer Science 89/100",
    period: "2023",
  },
  {
    degree: "Class X — CBSE",
    school: "Manikgarh Cement Eng. School · IT 91/100",
    period: "2021",
  },
];

const Word: React.FC<{
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
  children: React.ReactNode;
}> = ({ progress, range, accent, children }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-accent-deep" : undefined}>
      {children}{" "}
    </motion.span>
  );
};

const ScrollWords: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className="text-2xl md:text-4xl leading-snug font-medium tracking-tight max-w-3xl">
      {words.map((raw, i) => {
        const accent = raw.startsWith("*");
        const word = accent ? raw.slice(1) : raw;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const About: React.FC = () => (
  <section id="about" className="px-5 md:px-10 py-24 md:py-36 border-t border-line">
    <SectionHead num="02" label="About" meta="(Profile)" />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-4">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted leading-loose lg:sticky lg:top-28">
            Vijay Dilip Barhate
            <br />
            Navi Mumbai, India
            <br />
            <span className="text-accent-deep">Open to internships</span>
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-8">
        <ScrollWords text="I am a computer engineering student who treats software as a craft — bridging *complex *data and intuitive experiences with Python, SQL and clean architecture." />

        <div className="mt-14 md:mt-20">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-2">Education</h3>
          </Reveal>
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.06}>
              <div className="group grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1 border-b border-line py-5">
                <div className="min-w-0">
                  <p className="font-medium text-base md:text-lg">{item.degree}</p>
                  <p className="mt-1 text-sm text-muted">{item.school}</p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted sm:text-right pt-1 whitespace-nowrap">
                  {item.period}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
