import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  OPEN_SETTINGS_EVENT,
  hasGlobalPrivacyControl,
  readConsent,
  saveConsent,
  type ConsentState,
} from "@/lib/consent";

type Choice = Omit<ConsentState, "updatedAt">;

const CATEGORIES: { key: keyof Choice | "essential"; label: string; text: string }[] = [
  {
    key: "essential",
    label: "Essential",
    text: "Needed for the site to work, such as remembering this cookie choice. Always on.",
  },
  {
    key: "analytics",
    label: "Analytics",
    text: "Google Analytics and Vercel Analytics help us understand which pages are useful.",
  },
  {
    key: "functional",
    label: "Functional",
    text: "The live chat widget so you can message our team from any page.",
  },
  {
    key: "marketing",
    label: "Marketing",
    text: "Advertising pixels that measure our ads. We do not run any today; this stays off unless you allow it.",
  },
];

export function CookieConsent() {
  // Starts open so the banner is part of the prerendered HTML; returning visitors are hidden by the inline script in index.html.
  const [open, setOpen] = useState(true);
  const [showPrefs, setShowPrefs] = useState(false);
  const [gpc, setGpc] = useState(false);
  const [choice, setChoice] = useState<Choice>({ analytics: false, functional: false, marketing: false });

  useEffect(() => {
    setGpc(hasGlobalPrivacyControl());
    const existing = readConsent();
    if (existing) {
      setChoice({ analytics: existing.analytics, functional: existing.functional, marketing: existing.marketing });
      setOpen(false);
    }
    const onOpen = () => {
      const current = readConsent();
      if (current) setChoice({ analytics: current.analytics, functional: current.functional, marketing: current.marketing });
      setShowPrefs(true);
      setOpen(true);
      document.documentElement.removeAttribute("data-consent-set");
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, []);

  const commit = (next: Choice) => {
    const previous = readConsent();
    saveConsent(next);
    setOpen(false);
    setShowPrefs(false);
    const withdrew =
      previous &&
      ((previous.analytics && !next.analytics) ||
        (previous.functional && !next.functional) ||
        (previous.marketing && !next.marketing));
    if (withdrew) window.location.reload();
  };

  if (!open) return null;

  return (
    <div
      id="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl shadow-slate-900/10">
        <h2 id="cookie-title" className="text-base font-bold text-slate-900">
          We use cookies
        </h2>
        <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-slate-600">
          Essential cookies keep this site working. With your permission we also use analytics and a live chat widget.
          Nothing optional loads until you choose. Read our{" "}
          <Link href="/privacy" className="font-semibold text-blue-700 underline underline-offset-2">
            Privacy &amp; Cookie Policy
          </Link>
          .
        </p>
        {gpc && (
          <p className="mt-2 text-xs font-semibold text-slate-700">
            Your browser sends a Global Privacy Control signal, so marketing cookies stay off.
          </p>
        )}

        {showPrefs && (
          <fieldset className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">
            <legend className="sr-only">Cookie preferences</legend>
            {CATEGORIES.map((cat) => {
              const locked = cat.key === "essential" || (cat.key === "marketing" && gpc);
              const checked = cat.key === "essential" ? true : choice[cat.key as keyof Choice] && !(cat.key === "marketing" && gpc);
              const id = `cookie-${cat.key}`;
              return (
                <div key={cat.key} className="flex items-start justify-between gap-4 p-4">
                  <label htmlFor={id} className="text-sm">
                    <span className="block font-bold text-slate-900">{cat.label}</span>
                    <span className="block text-slate-600">{cat.text}</span>
                  </label>
                  <input
                    id={id}
                    type="checkbox"
                    className="mt-1 h-5 w-5 shrink-0 accent-blue-700"
                    checked={checked}
                    disabled={locked}
                    onChange={(e) =>
                      setChoice((c) => ({ ...c, [cat.key]: e.target.checked }))
                    }
                  />
                </div>
              );
            })}
          </fieldset>
        )}

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {showPrefs ? (
            <button
              type="button"
              onClick={() => commit(choice)}
              className="min-h-11 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-50"
            >
              Save preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPrefs(true)}
              className="min-h-11 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-700 underline underline-offset-2 hover:text-slate-900"
            >
              Preferences
            </button>
          )}
          <button
            type="button"
            onClick={() => commit({ analytics: false, functional: false, marketing: false })}
            className="min-h-11 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-50"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => commit({ analytics: true, functional: true, marketing: !gpc })}
            className="min-h-11 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
