import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

const BASE_TITLE = "Adarsh Priyadarshi — Full Stack Developer";

export const useDocumentMeta = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} · Adarsh Priyadarshi` : BASE_TITLE;
    if (description) {
      const tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute("content", description);
    }
  }, [title, description]);
};

// Scroll to top on route change, or to the #hash target if present.
export const useScrollRestore = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (tries++ < 20) requestAnimationFrame(tick);
      };
      tick();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
};

export const useActiveSection = (ids) => {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
};

export const useCopy = (timeout = 1800) => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    },
    [timeout]
  );
  return [copied, copy];
};

// Tracks the pointer as CSS variables on an element — powers the spotlight effects.
export const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};
