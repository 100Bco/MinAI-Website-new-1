import React from "react";

export function LogoMarquee({ logos }: { logos: { name: string; img: string }[] }) {
  const row = (hidden: boolean) => (
    <div className="marquee-track flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16" aria-hidden={hidden || undefined}>
      {logos.map((logo) => (
        <img
          key={logo.name}
          src={logo.img}
          alt={hidden ? "" : logo.name}
          height={28}
          className="h-[15px] w-auto shrink-0 opacity-80 grayscale-[30%] transition hover:opacity-100 hover:grayscale-0 sm:h-5 md:h-6"
        />
      ))}
    </div>
  );
  return (
    <div className="relative mx-auto flex max-w-3xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {row(false)}
      {row(true)}
    </div>
  );
}
