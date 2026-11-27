import React, { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { CalendarCheck, CheckCircle, PhoneMissed, Star } from "lucide-react";
import { VideoFacade } from "@/components/VideoFacade";
import { HeroDashboard } from "@/components/HeroDashboard";
import logoPng from "@assets/logo-main.png";

/*
 * Desktop (lg+) scroll story. The section is a tall track with a sticky stage; scroll progress 0..1
 * is written to the CSS variable --p and every layer derives its motion from it in CSS:
 *   0.00-0.26  hero copy lifts away; the product dashboard rises, shrinks and dissolves into the phone
 *   0.24-0.60  "AI answers..." headline, side cards slide out, the conversation plays message by message
 *   0.60-0.90  side cards leave, the phone dissolves as the demo video widens out of it
 *   0.90-1.00  the video holds, then the page continues into the next section
 * --p follows the scroll position with a little easing so wheel steps do not jump.
 * Below lg the hero is a normal one-screen section, the dashboard follows it, and the video stays its own section.
 */

const seg = (a: number, b: number) => `clamp(0, (var(--p) - ${a}) / ${b - a}, 1)`;
const fadeIn = (a: number, b: number) => seg(a, b);
const fadeOut = (a: number, b: number) => `calc(1 - ${seg(a, b)})`;
// smoothstep: eases in and out of a segment instead of moving linearly
const ease = (a: number, b: number) => {
  const x = seg(a, b);
  return `calc(${x} * ${x} * (3 - 2 * ${x}))`;
};

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

function Bubble({ kind, text, at }: (typeof MESSAGES)[number]) {
  const style: CSSProperties = {
    opacity: fadeIn(at, at + 0.03),
    transform: `translateY(calc(${fadeOut(at, at + 0.03)} * 14px))`,
  };
  if (kind === "system") {
    return (
      <div style={style} className="mx-auto flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-bold text-rose-700">
        <PhoneMissed className="h-3.5 w-3.5" /> {text}
      </div>
    );
  }
  if (kind === "booked") {
    return (
      <div style={style} className="mx-auto flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
        <CalendarCheck className="h-3.5 w-3.5" /> {text}
      </div>
    );
  }
  const ai = kind === "ai";
  return (
    <div style={style} className={`max-w-[82%] ${ai ? "self-end" : "self-start"}`}>
      {ai && <div className="mb-1 text-right text-[10px] font-bold uppercase tracking-wider text-blue-700">MinAI · auto-reply</div>}
      <div
        className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
          ai ? "rounded-br-md bg-blue-600 text-white" : "rounded-bl-md bg-slate-100 text-slate-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export function HeroStory({ background, copy }: { background: ReactNode; copy: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const heroLayer = useRef<HTMLDivElement>(null);
  const videoLayer = useRef<HTMLDivElement>(null);
  const sideLayer = useRef<HTMLDivElement>(null);
  const dashLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = -1;
    const update = () => {
      raf = 0;
      const vw = document.documentElement.clientWidth;
      const ds = desktop.matches
        ? Math.min(1, (vw * 0.86) / 1100, (window.innerHeight * 0.78) / 640)
        : Math.min(1, (vw - 40) / 1100);
      el.style.setProperty("--ds", ds.toFixed(4));
      const copyBox = heroLayer.current?.firstElementChild as HTMLElement | null;
      if (desktop.matches && copyBox) {
        const copyBottom = (heroLayer.current?.offsetTop ?? 0) + copyBox.offsetTop + copyBox.offsetHeight;
        el.style.setProperty("--dash-y", `${Math.round(Math.max(copyBottom + 28, window.innerHeight * 0.58))}px`);
      }
      if (!desktop.matches) {
        el.style.setProperty("--p", "0");
        if (dashLayer.current) dashLayer.current.style.pointerEvents = "auto";
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
      if (dashLayer.current) dashLayer.current.style.pointerEvents = p < 0.04 ? "auto" : "none";
      if (sideLayer.current) sideLayer.current.style.pointerEvents = p > 0.33 && p < 0.6 ? "auto" : "none";
      if (videoLayer.current) videoLayer.current.style.pointerEvents = p > 0.88 ? "auto" : "none";
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
          "--h": "min(540px, 60vh)",
          "--w": "min(calc(var(--h) * 1.7778), 82vw)",
          "--side": "calc((var(--w) - 300px) / 2)",
        } as CSSProperties
      }
    >
      <div className="relative min-h-[calc(100svh-72px)] md:min-h-[calc(100svh-6rem)] overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:min-h-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white pointer-events-none" />
        <div className="hero-grid absolute inset-0 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: `calc(1 - ${seg(0.04, 0.2)} * 0.7)` }}
        >
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

        {/* 2. Product dashboard: below the copy on mobile; peeks in at the bottom of the stage on desktop,
            then rises and shrinks into the phone */}
        <div className="relative z-10 px-5 pb-10 lg:static lg:p-0">
          <div
            ref={dashLayer}
            className="relative mx-auto lg:absolute lg:left-1/2 lg:top-[calc(50%+40px)] lg:[filter:var(--dash-f)] lg:[opacity:var(--dash-o)] lg:[transform:var(--dash-t)]"
            style={
              {
                width: "calc(1100px * var(--ds))",
                height: "calc(640px * var(--ds))",
                "--dash-t": `translate(-50%, -50%) translateY(calc((1 - ${ease(0, 0.13)}) * (var(--dash-y) - 50vh - 40px + 320px * var(--ds)))) scale(calc(1 - ${ease(0.08, 0.25)} * 0.66))`,
                "--dash-o": fadeOut(0.17, 0.25),
                "--dash-f": `blur(calc(${ease(0.16, 0.25)} * 6px))`,
              } as CSSProperties
            }
          >
            <div className="absolute left-0 top-0 origin-top-left" style={{ transform: "scale(var(--ds))" }}>
              <HeroDashboard />
            </div>
          </div>
        </div>

        <div className="hidden lg:block" aria-hidden="false">
          {/* 3. Headline above the phone, later swapped for the video title */}
          <div
            className="absolute inset-x-0 z-20 px-6 text-center"
            style={{
              bottom: "calc(50% - 40px + var(--h) / 2 + 28px)",
              opacity: `calc(${fadeIn(0.24, 0.31)} * ${fadeOut(0.62, 0.68)})`,
              transform: `translateY(calc((1 - ${ease(0.24, 0.31)}) * 30px))`,
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
              opacity: fadeIn(0.84, 0.92),
              transform: `translateY(calc((1 - ${ease(0.84, 0.92)}) * 24px))`,
            }}
          >
            <p className="text-xl md:text-2xl font-bold font-display text-foreground tracking-wide uppercase">
              Watch This Video! <span className="text-primary">(You Need To Turn Sound On)</span>
            </p>
          </div>

          {/* 4. Side cards slide out from behind the phone */}
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
                    opacity: `calc(${fadeIn(0.27, 0.36)} * ${fadeOut(0.6, 0.69)})`,
                    transform: `translateY(-50%) translateX(calc(${card.side} * ((1 - ${ease(0.27, 0.39)}) * -180px + ${ease(0.6, 0.71)} * 160px))) scale(calc(0.85 + ${ease(0.27, 0.39)} * 0.15)) rotate(calc(${card.side} * (1 - ${ease(0.27, 0.39)}) * -4deg))`,
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

          {/* 5. The phone: appears where the dashboard shrank, plays the conversation, then hands over to the video */}
          <div
            className="absolute left-1/2 z-10 w-[300px] overflow-hidden rounded-[2.2rem] border-[6px] border-slate-900 bg-white shadow-2xl shadow-blue-900/20"
            style={{
              top: "calc(50% + 40px)",
              height: "var(--h)",
              opacity: `calc(${fadeIn(0.16, 0.24)} * ${fadeOut(0.7, 0.8)})`,
              transform: `translate(-50%, -50%) scale(calc(1.3 - ${ease(0.12, 0.27)} * 0.3 + ${ease(0.64, 0.8)} * 0.08))`,
              filter: `blur(calc((1 - ${ease(0.16, 0.25)}) * 6px + ${ease(0.7, 0.8)} * 4px))`,
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <img src={logoPng} alt="" className="h-5 w-auto" />
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> AI active 24/7
              </span>
            </div>
            <div className="flex h-[calc(100%-49px)] flex-col justify-end gap-2.5 bg-gradient-to-b from-white to-slate-50 p-4">
              {MESSAGES.map((m) => (
                <Bubble key={m.text} {...m} />
              ))}
              <div
                className="mt-1 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-800"
                style={{ opacity: fadeIn(0.56, 0.59) }}
              >
                <Star className="h-3.5 w-3.5 fill-current" /> Review request scheduled after the job
                <CheckCircle className="ml-auto h-3.5 w-3.5 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* 6. The demo video grows out of the phone's footprint */}
          <div
            ref={videoLayer}
            className="pointer-events-none absolute left-1/2 z-10 overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-blue-900/20"
            style={{
              top: "calc(50% + 40px)",
              width: "var(--w)",
              height: "var(--h)",
              transform: "translate(-50%, -50%)",
              opacity: fadeIn(0.64, 0.74),
              clipPath: `inset(0 calc(var(--side) * (1 - ${ease(0.64, 0.9)})) 0 calc(var(--side) * (1 - ${ease(0.64, 0.9)})) round 28px)`,
            }}
          >
            <VideoFacade driveId="1UqAtNkMNQ94rE2JwkrEy9MOWDD2guL88" title="MinAI Demo Video" />
          </div>
        </div>
      </div>
    </section>
  );
}
