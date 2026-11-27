import { useEffect, useState } from "react";

export type ConsentCategory = "analytics" | "functional" | "marketing";

export interface ConsentState {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  updatedAt: number;
}

const KEY = "minai_consent_v1";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;
const CHANGE_EVENT = "minai:consent-change";
export const OPEN_SETTINGS_EVENT = "minai:open-cookie-settings";

export function hasGlobalPrivacyControl(): boolean {
  return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed.updatedAt || Date.now() - parsed.updatedAt > MAX_AGE_MS) return null;
    if (hasGlobalPrivacyControl()) parsed.marketing = false;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Omit<ConsentState, "updatedAt">) {
  const state: ConsentState = {
    ...choice,
    marketing: hasGlobalPrivacyControl() ? false : choice.marketing,
    updatedAt: Date.now(),
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CHANGE_EVENT, { detail: state }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function useConsent(): ConsentState | null {
  const [state, setState] = useState<ConsentState | null>(null);
  useEffect(() => {
    setState(readConsent());
    const onChange = (e: Event) => setState((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);
  return state;
}

type Gtag = (...args: unknown[]) => void;

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", name, params);
}
