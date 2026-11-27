import React, { useState } from "react";
import {
  BarChart3,
  Bell,
  CalendarCheck,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Phone,
  Search,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import logoPng from "@assets/logo-main.png";

/* A product mockup of the MinAI workspace (sample data, labelled "Demo workspace").
   Designed at a fixed 1100x640 and scaled by the parent through --ds. */

interface Stat {
  label: string;
  value: string;
  change: string;
  progress: number;
}

interface Tab {
  icon: LucideIcon;
  label: string;
  chartTitle: string;
  chartSub: string;
  stats: Stat[];
  bars: number[];
  target: string;
}

const TABS: Tab[] = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    chartTitle: "Leads captured",
    chartSub: "Every call, form and message, this week",
    stats: [
      { label: "New leads", value: "128", change: "+18%", progress: 72 },
      { label: "Booked appointments", value: "41", change: "+12%", progress: 56 },
      { label: "Avg. response time", value: "9s", change: "-94%", progress: 92 },
    ],
    bars: [38, 52, 46, 70, 88, 64, 58],
    target: "120 leads",
  },
  {
    icon: Inbox,
    label: "Conversations",
    chartTitle: "Messages answered",
    chartSub: "SMS, email, Facebook, Instagram and Google in one inbox",
    stats: [
      { label: "Open conversations", value: "64", change: "+9%", progress: 48 },
      { label: "Answered by AI", value: "87%", change: "+6%", progress: 87 },
      { label: "Channels connected", value: "5", change: "All live", progress: 100 },
    ],
    bars: [60, 72, 66, 80, 74, 90, 84],
    target: "500 msgs",
  },
  {
    icon: Phone,
    label: "Calls",
    chartTitle: "Missed calls recovered",
    chartSub: "Missed calls that got an instant text back",
    stats: [
      { label: "Calls this week", value: "212", change: "+14%", progress: 64 },
      { label: "Missed, texted back", value: "37", change: "100%", progress: 100 },
      { label: "Recovered leads", value: "22", change: "+31%", progress: 60 },
    ],
    bars: [30, 44, 58, 40, 66, 52, 48],
    target: "35 calls",
  },
  {
    icon: Star,
    label: "Reviews",
    chartTitle: "New Google reviews",
    chartSub: "Review requests sent after every completed job",
    stats: [
      { label: "Average rating", value: "4.8", change: "+0.3", progress: 96 },
      { label: "New reviews", value: "26", change: "+40%", progress: 70 },
      { label: "Requests sent", value: "140", change: "+22%", progress: 82 },
    ],
    bars: [22, 34, 40, 56, 62, 78, 86],
    target: "30 reviews",
  },
  {
    icon: BarChart3,
    label: "Pipeline",
    chartTitle: "Deals won",
    chartSub: "Leads moved from first message to closed job",
    stats: [
      { label: "Pipeline value", value: "$84.2k", change: "+16%", progress: 68 },
      { label: "Won this month", value: "19", change: "+11%", progress: 58 },
      { label: "Win rate", value: "31%", change: "+4%", progress: 31 },
    ],
    bars: [42, 36, 58, 64, 50, 76, 70],
    target: "$100k",
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const INBOX = [
  { channel: "SMS", color: "bg-emerald-700", name: "Jordan P.", text: "Can you come out Thursday?", tag: "AI booked" },
  { channel: "FB", color: "bg-blue-600", name: "Maria L.", text: "Do you offer financing?", tag: "AI replied" },
  { channel: "IG", color: "bg-pink-700", name: "Sam K.", text: "Loved the work on our roof!", tag: "Review sent" },
  { channel: "G", color: "bg-amber-700", name: "Google Business", text: "New 5-star review", tag: "New" },
];

export function HeroDashboard() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div aria-hidden="true" className="flex h-[640px] w-[1100px] overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left shadow-[0_40px_120px_-30px_rgba(29,78,216,0.35)]">
      {/* Sidebar */}
      <aside className="flex w-[210px] shrink-0 flex-col border-r border-slate-100 p-5">
        <img src={logoPng} alt="" width={96} height={32} className="mb-8 h-7 w-auto self-start" />
        <nav className="flex flex-col gap-1">
          {TABS.map((t, i) => {
            const Icon = t.icon;
            const on = i === active;
            return (
              <button
                key={t.label}
                type="button"
                tabIndex={-1}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors ${
                  on ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {t.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-4 text-white">
          <Sparkles className="h-5 w-5" />
          <p className="mt-2 text-[13px] font-bold leading-snug">AI assistant is answering leads 24/7</p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online now
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col bg-slate-50/70">
        <header className="flex h-[64px] shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6">
          <div className="flex w-[300px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[13px] text-slate-500">
            <Search className="h-4 w-4" /> Search contacts, messages...
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Demo workspace
            </span>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-[12px] font-bold text-white">YB</span>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[1fr_250px] gap-5 p-6">
          <div key={active} className="flex min-w-0 flex-col gap-5">
            <div className="grid grid-cols-3 gap-4">
              {tab.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="hero-rise rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{s.label}</span>
                    <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">{s.change}</span>
                  </div>
                  <div className="mt-3 text-[28px] font-extrabold leading-none text-slate-900">{s.value}</div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div className="bar-grow-x h-full rounded-full bg-blue-600/80" style={{ width: `${s.progress}%`, animationDelay: `${0.2 + i * 0.1}s` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-1 flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[15px] font-bold text-slate-900">{tab.chartTitle}</p>
                  <p className="text-[12px] text-slate-500">{tab.chartSub}</p>
                </div>
                <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white">Target: {tab.target}</span>
              </div>
              <div className="relative mt-4 flex flex-1 items-end gap-4 px-1">
                <div className="pointer-events-none absolute inset-x-0 top-[30%] border-t border-dashed border-slate-300" />
                {tab.bars.map((h, i) => (
                  <div key={DAYS[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className={`bar-grow-y w-full rounded-xl ${h >= 70 ? "bg-blue-600" : "bg-blue-100"}`}
                      style={{ height: `${h}%`, animationDelay: `${0.15 + i * 0.05}s` }}
                    />
                    <span className={`text-[11px] font-semibold ${h >= 70 ? "text-blue-700" : "text-slate-500"}`}>{DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live inbox */}
          <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-2 text-[13px] font-bold text-slate-900">
                <MessageSquare className="h-4 w-4 text-blue-600" /> Live inbox
              </p>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {INBOX.map((m, i) => (
                <div
                  key={m.name}
                  className="hero-rise flex gap-3 rounded-xl border border-slate-100 p-2.5"
                  style={{ animationDelay: `${0.5 + i * 0.25}s` }}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white ${m.color}`}>
                    {m.channel}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-slate-900">{m.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{m.text}</p>
                    <span className="mt-1 inline-block rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700">
                      {m.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5 text-[11px] font-bold text-emerald-700">
              <CalendarCheck className="h-4 w-4" /> 3 appointments booked today
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
