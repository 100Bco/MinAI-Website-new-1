import React, { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { CalendarCheck, CheckCircle, PhoneMissed, Star } from "lucide-react";
import { VideoFacade } from "@/components/VideoFacade";
import { HeroDashboard } from "@/components/HeroDashboard";
import logoPng from "@assets/logo-main.png";

/*
 * Desktop (lg+) scroll story. The section is a tall track with a sticky stage; scroll progress 0..1
 * is written to the CSS variable --p and every layer derives its motion from it in CSS.
 * One frame carries the story: its width, height, corner radius and bezel are interpolated so the
 * dashboard frame morphs into a phone and the phone into the video, while the content inside swaps.
 *   0.00-0.13  hero copy lifts away, the dashboard frame rises to the centre
 *   0.08-0.24  the frame morphs dashboard -> phone (content swaps around 0.13-0.17); while it narrows,
 *              the "AI answers..." headline drops in and the side cards slide out from behind it
 *   0.28-0.60  the conversation plays message by message
 *   0.62-0.86  the frame morphs phone -> video (content swaps around 0.64-0.68); while it widens the
 *              side cards are pushed out, the headline lifts away and the video title settles in
 *   0.86-1.00  the video holds, then the page continues into the next section
 * --p follows the scroll position with a little easing so wheel steps do not jump.
 * Below lg the hero copy is a normal one-screen section, then a shorter pinned track plays the same
 * frame morph (dashboard -> phone -> video) with the two numbers under the phone instead of beside it.
 */

const seg = (a: number, b: number) => `clamp(0, (var(--p) - ${a}) / ${b - a}, 1)`;
const fadeIn = (a: number, b: number) => seg(a, b);
const fadeOut = (a: number, b: number) => `calc(1 - ${seg(a, b)})`;
// smoothstep: eases in and out of a segment instead of moving linearly
const ease = (a: number, b: number) => {
  const x = seg(a, b);
  return `calc(${x} * ${x} * (3 - 2 * ${x}))`;
};

const TO_PHONE = ease(0.08, 0.24);
const TO_VIDEO = ease(0.62, 0.86);
const RISE = ease(0, 0.13);
const M_PHONE = ease(0.1, 0.3);
const M_VIDEO = ease(0.66, 0.86);

const MESSAGES: { at: number; kind: "system" | "ai" | "lead" | "booked"; text: string }[] = [
  { at: 0.28, kind: "system", text: "Missed call · New lead · 2:14 PM" },
  { at: 0.33, kind: "ai", text: "Hi! Sorry we missed your call. How can we help you today?" },
  { at: 0.38, kind: "lead", text: "Need a quote for a roof leak. Can someone come this week?" },
  { at: 0.43, kind: "ai", text: "Absolutely. I can book you for Thursday at 10 AM. Does that work?" },
  { at: 0.48, kind: "lead", text: "Perfect, see you then." },
  { at: 0.53, kind: "booked", text: "Appointment booked · Thu 10:00 AM" },
];

const SIDE_CARDS = [
  {
    side: -1,
    icon: PhoneMissed,
    tone: "bg-rose-50 text-rose-600",
    label: "Missed Call Text Back",
    value: "85%",
    text: "of customers appreciate getting a text back",
    href: "/products/missed-call-text-back",
  },
  {
    side: 1,
    icon: Star,
    tone: "bg-amber-50 text-amber-600",
    label: "5-Star Magic Review Funnel",
    value: "97%",
    text: "of people read reviews before buying",
    href: "/products/magic-review-funnel",
  },
] as const;

function Bubble({ kind, text, at: base, shift }: (typeof MESSAGES)[number] & { shift: number }) {
  const at = base + shift;
  // a message only takes up room once it arrives, so the newest one always sits at the bottom
  const slot: CSSProperties = { maxHeight: `calc(${fadeIn(at, at + 0.02)} * 180px)` };
  const style: CSSProperties = {
    opacity: fadeIn(at, at + 0.03),
    transform: `translateY(calc(${fadeOut(at, at + 0.03)} * 14px))`,
  };
  if (kind === "system" || kind === "booked") {
    const tone = kind === "system" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700";
    const Icon = kind === "system" ? PhoneMissed : CalendarCheck;
    return (
      <div style={slot} className="flex w-full shrink-0 justify-center overflow-hidden pt-2.5">
        <div style={style} className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold ${tone}`}>
          <Icon className="h-3.5 w-3.5 shrink-0" /> {text}
        </div>
      </div>
    );
  }
  const ai = kind === "ai";
  return (
    <div style={slot} className={`flex w-full shrink-0 overflow-hidden pt-2.5 ${ai ? "justify-end" : "justify-start"}`}>
    <div style={style} className="max-w-[82%]">
      {ai && <div className="mb-1 text-right text-[10px] font-bold uppercase tracking-wider text-blue-700">MinAI · auto-reply</div>}
      <div
        className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
          ai ? "rounded-br-md bg-blue-600 text-white" : "rounded-bl-md bg-slate-100 text-slate-800"
        }`}
      >
        {text}
      </div>
    </div>
    </div>
  );
}

/** The phone's screen: idle "on duty" state, then the conversation. Times are shifted per layout. */
function PhoneScreen({ shift }: { shift: number }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <img src={logoPng} alt="" className="h-5 w-auto" />
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> AI active 24/7
        </span>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden bg-gradient-to-b from-white to-slate-50 px-4 pb-4 pt-1.5">
        {/* idle screen until the first lead comes in */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
          style={{ opacity: fadeOut(0.27 + shift, 0.29 + shift) }}
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <span className="absolute inset-0 animate-ping rounded-full bg-blue-200/60 motion-reduce:hidden" />
            <PhoneMissed className="relative h-6 w-6" />
          </span>
          <p className="text-sm font-bold text-slate-900">AI is on duty 24/7</p>
          <p className="px-8 text-xs font-medium text-slate-500">Waiting for the next call, text or message...</p>
        </div>
        {MESSAGES.map((m) => (
          <Bubble key={m.text} {...m} shift={shift} />
        ))}
        <div
          className="mt-2.5 flex shrink-0 items-center gap-2 overflow-hidden rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-800"
          style={{ opacity: fadeIn(0.56 + shift, 0.59 + shift), maxHeight: `calc(${fadeIn(0.555 + shift, 0.575 + shift)} * 80px)` }}
        >
          <Star className="h-3.5 w-3.5 fill-current" /> Review request scheduled after the job
          <CheckCircle className="ml-auto h-3.5 w-3.5 text-emerald-700" />
        </div>
      </div>
    </>
  );
}

export function HeroStory({ background, copy }: { background: ReactNode; copy: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const heroLayer = useRef<HTMLDivElement>(null);
  const sideLayer = useRef<HTMLDivElement>(null);
  const frameDash = useRef<HTMLDivElement>(null);
  const frameVideo = useRef<HTMLDivElement>(null);
  const mobileTrack = useRef<HTMLDivElement>(null);
  const mobileStage = useRef<HTMLDivElement>(null);
  const mobileVideo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = -1;
    let currentM = -1;
    const update = () => {
      raf = 0;
      const vw = document.documentElement.clientWidth;
      const ds = desktop.matches
        ? Math.min(1, (vw * 0.86) / 1100, (window.innerHeight * 0.78) / 640)
        : Math.min(1, (vw - 32) / 1100);
      el.style.setProperty("--ds", ds.toFixed(4));
      const copyBox = heroLayer.current?.firstElementChild as HTMLElement | null;
      if (desktop.matches && copyBox) {
        const copyBottom = (heroLayer.current?.offsetTop ?? 0) + copyBox.offsetTop + copyBox.offsetHeight;
        el.style.setProperty("--dash-y", `${Math.round(Math.max(copyBottom + 28, window.innerHeight * 0.58))}px`);
      }
      if (!desktop.matches) {
        el.style.setProperty("--p", "0");
        const track = mobileTrack.current, stage = mobileStage.current;
        if (!track || !stage) return;
        const r = track.getBoundingClientRect();
        const stickTop = window.innerHeight - stage.offsetHeight;
        const span = Math.max(1, r.height - stage.offsetHeight);
        const target = Math.min(1, Math.max(0, (stickTop - r.top) / span));
        currentM = currentM < 0 || reduced ? target : currentM + (target - currentM) * 0.16;
        if (Math.abs(target - currentM) < 0.0004) currentM = target;
        track.style.setProperty("--p", currentM.toFixed(4));
        if (mobileVideo.current) mobileVideo.current.style.pointerEvents = currentM > 0.82 ? "auto" : "none";
        if (currentM !== target) raf = requestAnimationFrame(update);
        return;
      }
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const target = Math.min(1, Math.max(0, -r.top / span));
      current = current < 0 || reduced ? target : current + (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) current = target;
      const p = current;
      el.style.setProperty("--p", p.toFixed(4));
      if (heroLayer.current) heroLayer.current.style.pointerEvents = p < 0.07 ? "auto" : "none";
      if (frameDash.current) frameDash.current.style.pointerEvents = p < 0.04 ? "auto" : "none";
      if (sideLayer.current) sideLayer.current.style.pointerEvents = p > 0.25 && p < 0.68 ? "auto" : "none";
      if (frameVideo.current) frameVideo.current.style.pointerEvents = p > 0.84 ? "auto" : "none";
      if (current !== target) raf = requestAnimationFrame(update);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    desktop.addEventListener("change", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      desktop.removeEventListener("change", request);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-white lg:h-[420vh]"
      style={
        {
          "--p": 0,
          "--ds": 0.32,
          "--dash-y": "70vh",
          // frame sizes in its three states
          "--dw": "calc(1100px * var(--ds))",
          "--dh": "calc(640px * var(--ds))",
          "--h": "min(540px, 60vh)",
          "--w": "min(calc(var(--h) * 1.7778), 82vw)",
        } as CSSProperties
      }
    >
      <div className="relative min-h-[calc(100svh-72px)] md:min-h-[calc(100svh-6rem)] overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:min-h-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white pointer-events-none" />
        <div className="hero-grid absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: `calc(1 - ${seg(0.04, 0.2)} * 0.7)` }}>
          {background}
        </div>

        {/* 1. Hero copy: normal flow on mobile, pinned to the top of the stage on desktop */}
        <div
          ref={heroLayer}
          className="relative z-20 flex min-h-[calc(100svh-72px)] md:min-h-[calc(100svh-6rem)] items-center justify-center py-6 md:py-10 lg:absolute lg:inset-x-0 lg:top-0 lg:min-h-0 lg:items-start lg:pb-0 lg:pt-[calc(6rem+2.5vh)]"
          style={{
            opacity: fadeOut(0.02, 0.09),
            transform: `translateY(calc(${ease(0.02, 0.11)} * -90px))`,
            filter: `blur(calc(${seg(0.02, 0.09)} * 10px))`,
          }}
        >
          {copy}
        </div>

        <div className="hidden lg:block">
          {/* 2. Headline above the phone, later swapped for the video title */}
          <div
            className="absolute inset-x-0 z-20 px-6 text-center"
            style={{
              bottom: "calc(50% - 40px + var(--h) / 2 + 28px)",
              opacity: `calc(${fadeIn(0.16, 0.24)} * ${fadeOut(0.68, 0.76)})`,
              transform: `translateY(calc((1 - ${ease(0.16, 0.25)}) * 30px - ${ease(0.66, 0.78)} * 40px))`,
            }}
          >
            <p className="font-display text-4xl xl:text-5xl font-extrabold tracking-tight text-slate-900">
              AI answers calls &amp; texts <span className="text-blue-700">instantly 24/7.</span>
            </p>
            <p className="mt-3 text-lg font-medium text-slate-600">Automated follow-up until they buy.</p>
          </div>
          <div
            className="absolute inset-x-0 z-20 px-6 text-center"
            style={{
              bottom: "calc(50% - 40px + var(--h) / 2 + 28px)",
              opacity: fadeIn(0.77, 0.86),
              transform: `translateY(calc((1 - ${ease(0.76, 0.87)}) * 24px))`,
            }}
          >
            <p className="text-xl md:text-2xl font-bold font-display text-foreground tracking-wide uppercase">
              Watch This Video! <span className="text-primary">(You Need To Turn Sound On)</span>
            </p>
          </div>

          {/* 3. Side cards slide out from behind the phone */}
          <div ref={sideLayer} className="pointer-events-none">
            {SIDE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.label}
                  href={card.href}
                  className="group absolute z-10 w-[260px] rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-900/10 transition-shadow hover:shadow-blue-600/15"
                  style={{
                    top: "calc(50% + 40px)",
                    left: `calc(50% + ${card.side} * 330px - 130px)`,
                    opacity: `calc(${fadeIn(0.15, 0.22)} * ${fadeOut(0.7, 0.8)})`,
                    transform: `translateY(-50%) translateX(calc(${card.side} * ((1 - ${ease(0.14, 0.27)}) * -180px + ${ease(0.62, 0.84)} * 300px))) scale(calc(0.85 + ${ease(0.14, 0.27)} * 0.15 - ${ease(0.66, 0.8)} * 0.1)) rotate(calc(${card.side} * ((1 - ${ease(0.14, 0.27)}) * -4deg + ${ease(0.66, 0.8)} * 4deg)))`,
                  }}
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">{card.label}</p>
                  <p className="mt-2 text-5xl font-extrabold tracking-tight text-blue-700">{card.value}</p>
                  <p className="mt-2 text-sm font-medium leading-snug text-slate-600">{card.text}</p>
                  <p className="mt-4 text-sm font-bold text-blue-700 group-hover:underline">See how it works →</p>
                </Link>
              );
            })}
          </div>

          {/* 4. The one frame: dashboard -> phone -> video. Only its shape changes; the content inside swaps. */}
          <div
            className="absolute left-1/2 z-10 overflow-hidden bg-white"
            style={{
              top: "calc(50% + 40px)",
              width: `calc(var(--dw) + (300px - var(--dw)) * ${TO_PHONE} + (var(--w) - 300px) * ${TO_VIDEO})`,
              height: `calc(var(--dh) + (var(--h) - var(--dh)) * ${TO_PHONE})`,
              borderRadius: `calc(28px * var(--ds) + (36px - 28px * var(--ds)) * ${TO_PHONE} + (24px - 36px) * ${TO_VIDEO})`,
              // phone bezel grows in with the phone shape and thins out again for the video
              boxShadow: `0 0 0 calc(1px + ${TO_PHONE} * 6px - ${TO_VIDEO} * 7px) #0f172a, 0 40px 120px -30px rgba(29, 78, 216, 0.35)`,
              transform: `translate(-50%, -50%) translateY(calc((1 - ${RISE}) * (var(--dash-y) - 50vh - 40px + var(--dh) / 2)))`,
            }}
          >
            {/* dashboard content, centred so the shrinking frame crops it evenly */}
            <div
              ref={frameDash}
              className="absolute left-1/2 top-1/2"
              style={{
                width: "var(--dw)",
                height: "var(--dh)",
                transform: "translate(-50%, -50%)",
                opacity: fadeOut(0.13, 0.16),
              }}
            >
              <div className="absolute left-0 top-0 origin-top-left" style={{ transform: "scale(var(--ds))" }}>
                <HeroDashboard />
              </div>
            </div>

            {/* phone content */}
            <div
              className="absolute left-1/2 top-1/2 flex w-[300px] flex-col"
              style={{
                height: "var(--h)",
                transform: "translate(-50%, -50%)",
                opacity: `calc(${fadeIn(0.15, 0.18)} * ${fadeOut(0.64, 0.67)})`,
              }}
            >
              <PhoneScreen shift={0} />
            </div>

            {/* video content fills whatever shape the frame has */}
            <div
              ref={frameVideo}
              className="pointer-events-none absolute inset-0 bg-slate-900"
              style={{ opacity: fadeIn(0.65, 0.68) }}
            >
              <VideoFacade driveId="1UqAtNkMNQ94rE2JwkrEy9MOWDD2guL88" title="MinAI Demo Video" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: a shorter version of the same story. One frame stays pinned under the
          navbar while you swipe: dashboard -> phone with the conversation -> video. */}
      <div
        ref={mobileTrack}
        className="relative lg:hidden"
        style={
          {
            "--p": 0,
            height: "300vh",
            "--mw": "calc(100vw - 32px)",
            "--mdh": "calc(var(--mw) * 0.5818)",
            "--pw": "min(270px, calc(100vw - 96px))",
            "--ph": "min(470px, calc(100svh - 72px - 220px))",
            "--mvh": "calc(var(--mw) * 0.5625)",
          } as CSSProperties
        }
      >
        <div ref={mobileStage} className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden md:top-24 md:h-[calc(100svh-6rem)]">
          <div className="hero-grid absolute inset-0 pointer-events-none" />

          {/* headline above the phone, swapped for the video title */}
          <div
            className="absolute inset-x-0 z-20 px-5 text-center"
            style={{
              bottom: "calc(50% + var(--ph) / 2 + 18px)",
              opacity: `calc(${fadeIn(0.2, 0.28)} * ${fadeOut(0.68, 0.76)})`,
              transform: `translateY(calc((1 - ${ease(0.2, 0.29)}) * 20px - ${ease(0.66, 0.78)} * 24px))`,
            }}
          >
            <p className="font-display text-[1.6rem] sm:text-3xl font-extrabold leading-tight tracking-tight text-slate-900">
              AI answers calls &amp; texts <span className="text-blue-700">instantly 24/7.</span>
            </p>
          </div>
          <div
            className="absolute inset-x-0 z-20 px-5 text-center"
            style={{
              bottom: "calc(50% + var(--mvh) / 2 + 18px)",
              opacity: fadeIn(0.78, 0.86),
              transform: `translateY(calc((1 - ${ease(0.77, 0.87)}) * 16px))`,
            }}
          >
            <p className="text-base sm:text-xl font-bold font-display text-foreground tracking-wide uppercase">
              Watch This Video! <span className="block text-primary sm:inline">(Turn Sound On)</span>
            </p>
          </div>

          {/* the two numbers sit under the phone instead of beside it */}
          <div
            className="absolute inset-x-0 z-20 flex justify-center gap-2 px-4"
            style={{
              top: "calc(50% + var(--ph) / 2 + 16px)",
              opacity: `calc(${fadeIn(0.24, 0.32)} * ${fadeOut(0.64, 0.72)})`,
              transform: `translateY(calc((1 - ${ease(0.24, 0.33)}) * 16px + ${ease(0.64, 0.74)} * 16px))`,
            }}
          >
            {SIDE_CARDS.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2 shadow-lg shadow-slate-900/5"
              >
                <span className="text-xl font-extrabold text-blue-700">{card.value}</span>
                <span className="text-[11px] font-semibold leading-tight text-slate-600 max-w-[110px]">{card.text}</span>
              </Link>
            ))}
          </div>

          {/* the frame */}
          <div
            className="absolute left-1/2 top-1/2 z-10 overflow-hidden bg-white"
            style={{
              width: `calc(var(--mw) + (var(--pw) - var(--mw)) * ${M_PHONE} + (var(--mw) - var(--pw)) * ${M_VIDEO})`,
              height: `calc(var(--mdh) + (var(--ph) - var(--mdh)) * ${M_PHONE} + (var(--mvh) - var(--ph)) * ${M_VIDEO})`,
              borderRadius: `calc(14px + 18px * ${M_PHONE} - 14px * ${M_VIDEO})`,
              boxShadow: `0 0 0 calc(1px + ${M_PHONE} * 5px - ${M_VIDEO} * 6px) #0f172a, 0 30px 80px -30px rgba(29, 78, 216, 0.35)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2"
              style={{ width: "var(--dw)", height: "var(--dh)", transform: "translate(-50%, -50%)", opacity: fadeOut(0.16, 0.19) }}
            >
              <div className="absolute left-0 top-0 origin-top-left" style={{ transform: "scale(var(--ds))" }}>
                <HeroDashboard />
              </div>
            </div>
            <div
              className="absolute left-1/2 top-1/2 flex flex-col"
              style={{
                width: "var(--pw)",
                height: "var(--ph)",
                transform: "translate(-50%, -50%)",
                opacity: `calc(${fadeIn(0.18, 0.21)} * ${fadeOut(0.67, 0.7)})`,
              }}
            >
              <PhoneScreen shift={0.04} />
            </div>
            <div ref={mobileVideo} className="pointer-events-none absolute inset-0 bg-slate-900" style={{ opacity: fadeIn(0.68, 0.71) }}>
              <VideoFacade driveId="1UqAtNkMNQ94rE2JwkrEy9MOWDD2guL88" title="MinAI Demo Video" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
