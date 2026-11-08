import { prompts } from "../data/prompts";

const isDev = process.env.NODE_ENV === "development";

export const publishedPrompts = prompts
  .filter((p) => isDev || !p.draft)
  .slice()
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

export const getPrompt = (slug) => publishedPrompts.find((p) => p.slug === slug);

export const promptCategories = Array.from(new Set(publishedPrompts.map((p) => p.category).filter(Boolean)));

export const reelEmbedUrl = (url) => {
  if (!url) return null;
  const m = url.match(/instagram\.com\/(?:[^/]+\/)?(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
  if (!m) return null;
  const type = m[1] === "reels" ? "reel" : m[1];
  return `https://www.instagram.com/${type}/${m[2]}/embed/`;
};

export const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export const matchesQuery = (p, q) => {
  if (!q) return true;
  const hay = [p.title, p.summary, p.category, ...(p.tags || []), ...(p.tools || []).map((t) => t.name)]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
};
