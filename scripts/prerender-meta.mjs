// Runs automatically after `npm run build` (the "postbuild" script).
// For every published prompt it writes build/prompts/<slug>/index.html — a copy of
// the app shell with that guide's title & description in the <head>, so links shared
// on WhatsApp / Instagram / LinkedIn show a proper preview instead of the generic one.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const build = join(root, "build");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const site = (process.env.SITE_URL || pkg.homepage || "").replace(/\/+$/, "");

const src = readFileSync(join(root, "src/data/prompts.js"), "utf8");
const { prompts } = await import(`data:text/javascript;base64,${Buffer.from(src).toString("base64")}`);

const shell = readFileSync(join(build, "index.html"), "utf8");
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const withMeta = (html, { title, description, url, image }) =>
  (image
    ? html
        .replace(/<meta name="twitter:card" content="[^"]*"/, '<meta name="twitter:card" content="summary_large_image"')
        .replace("</head>", `<meta property="og:image" content="${esc(image)}" /><meta name="twitter:image" content="${esc(image)}" /></head>`)
    : html)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${esc(url)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1article`);

// Root shell: make og:url absolute.
writeFileSync(join(build, "index.html"), shell.replace(/(<meta property="og:url" content=")[^"]*/, `$1${site}/`));

const write = (rel, meta) => {
  const dir = join(build, rel);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), withMeta(shell, meta));
};

write("prompts", {
  title: "Prompt Library · Adarsh Priyadarshi",
  description: "Every prompt from my Instagram reels with a complete step-by-step build guide.",
  url: `${site}/prompts`,
});

const live = prompts.filter((p) => !p.draft);
for (const p of live) {
  write(`prompts/${p.slug}`, {
    title: `${p.title} · Adarsh Priyadarshi`,
    description: p.summary,
    url: `${site}/prompts/${p.slug}`,
    image: p.cover ? (/^https?:/.test(p.cover) ? p.cover : `${site}${p.cover}`) : undefined,
  });
}

const slugs = prompts.map((p) => p.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) console.warn(`⚠  Duplicate prompt slugs: ${[...new Set(dupes)].join(", ")}`);

console.log(`✓ Link previews generated for ${live.length} prompt guide(s) + library page.`);
