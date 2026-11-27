import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "dist/public");
const ssrEntry = path.join(root, "dist/ssr/entry-server.js");

const { render, pages, notFoundMeta, headTags } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing the <!--app-head--> or <!--app-html--> placeholder");
}

const fileFor = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

function write(route, meta, file) {
  const html = template
    .replace("<!--app-head-->", headTags(meta))
    .replace("<!--app-html-->", render(route));
  const target = path.join(outDir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

for (const page of pages) write(page.path, page, fileFor(page.path));
write("/404", notFoundMeta, "404.html");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(
    (p) =>
      `  <url>\n    <loc>https://minai.biz${p.path === "/" ? "/" : p.path}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority.toFixed(1)}</priority>\n  </url>`,
  ),
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);

console.log(`Prerendered ${pages.length} pages + 404.html and sitemap.xml`);
