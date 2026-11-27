import React, { useState } from "react";
import { Play } from "lucide-react";

// Google Drive's player sets cookies, so it only loads once the visitor presses play.
// The poster is the video's own Drive thumbnail, saved under /media/video-<id>.webp.
export function VideoFacade({ driveId, title }: { driveId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://drive.google.com/file/d/${driveId}/preview?autoplay=1`}
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
      className="group relative block w-full h-full overflow-hidden bg-slate-900"
    >
      <img
        src={`/media/video-${driveId}.webp`}
        alt=""
        width={1280}
        height={720}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-slate-900/25 transition-colors group-hover:bg-slate-900/15" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-700 shadow-2xl ring-8 ring-white/30 transition-transform group-hover:scale-110">
          <Play className="h-8 w-8 translate-x-0.5 fill-current" />
        </span>
        <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
          Play demo video<span className="sr-only">: {title}</span>
        </span>
      </span>
    </button>
  );
}
