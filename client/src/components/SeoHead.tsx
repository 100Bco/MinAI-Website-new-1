import { useEffect } from "react";
import { useLocation } from "wouter";
import { SITE, canonicalUrl, getPageMeta, notFoundMeta } from "@/lib/seo";

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", value: string) => () => {
  const el = document.createElement("meta");
  el.setAttribute(key, value);
  return el;
};

export function SeoHead() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const page = getPageMeta(location);
    const url = canonicalUrl(page);
    const image = `${SITE.url}${page.image}`;

    document.title = page.title;
    setTag('meta[name="description"]', meta("name", "description"), "content", page.description);
    setTag('meta[property="og:title"]', meta("property", "og:title"), "content", page.title);
    setTag('meta[property="og:description"]', meta("property", "og:description"), "content", page.description);
    setTag('meta[property="og:url"]', meta("property", "og:url"), "content", url);
    setTag('meta[property="og:image"]', meta("property", "og:image"), "content", image);
    setTag('meta[name="twitter:image"]', meta("name", "twitter:image"), "content", image);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (page === notFoundMeta) {
      canonical?.remove();
    } else {
      setTag('link[rel="canonical"]', () => {
        const el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        return el;
      }, "href", url);
    }
  }, [location]);

  return null;
}
