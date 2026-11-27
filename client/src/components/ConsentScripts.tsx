import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useConsent } from "@/lib/consent";

const GA_ID = "G-QHRM2K5NHH";

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

function loadGoogleAnalytics() {
  const w = window as GtagWindow;
  if (w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js expects the arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function loadChatWidget() {
  if (document.querySelector("script[data-widget-id]")) return;
  const s = document.createElement("script");
  s.src = "https://widgets.leadconnectorhq.com/loader.js";
  s.async = true;
  s.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
  s.setAttribute("data-widget-id", "69b0e7254d840e20d95cf651");
  document.body.appendChild(s);
}

export function ConsentScripts() {
  const consent = useConsent();

  useEffect(() => {
    if (consent?.analytics) loadGoogleAnalytics();
    if (consent?.functional) loadChatWidget();
    // Withdrawing consent takes full effect on the next page load (see CookieConsent).
  }, [consent?.analytics, consent?.functional]);

  return consent?.analytics ? <Analytics /> : null;
}
