import React, { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

export function LazyVideo({ src, poster, label, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={visible && !reducedMotion ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      width={720}
      height={720}
      aria-label={label}
    />
  );
}
