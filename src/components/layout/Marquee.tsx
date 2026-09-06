import React from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, className = "" }) => {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex shrink-0 items-center">
          <span className="font-display font-bold uppercase tracking-tight text-lg md:text-2xl px-6 md:px-10 whitespace-nowrap">
            {item}
          </span>
          <span className="inline-block h-2 w-2 rotate-45 bg-accent shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-line py-4 md:py-5 select-none ${className}`}
    >
      <div className="flex w-max animate-marquee will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

export default Marquee;