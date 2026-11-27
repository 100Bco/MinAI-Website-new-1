import React, { useState } from "react";
import { Play } from "lucide-react";
import logoPng from "@assets/logo-main.png";

export function VideoFacade({ embedUrl, title }: { embedUrl: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative w-full h-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#0b1f5c] via-[#1a44ad] to-blue-600 text-white"
    >
      <img src={logoPng} alt="" className="h-10 w-auto brightness-0 invert opacity-90" loading="lazy" />
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-700 shadow-2xl transition-transform group-hover:scale-110">
        <Play className="h-8 w-8 translate-x-0.5 fill-current" />
      </span>
      <span className="text-sm font-bold uppercase tracking-widest opacity-90">Play demo video<span className="sr-only">: {title}</span></span>
    </button>
  );
}
