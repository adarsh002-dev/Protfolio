import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { profile } from "../data/profile";
import { publishedPrompts } from "../lib/prompts";
import { useActiveSection, useScrollRestore } from "../lib/hooks";
import { Icon } from "./ui";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

/* Link that scrolls smoothly when already on the home page. */
export const SectionLink = ({ id, children, className, onClick, ...rest }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Link
      to={`/#${id}`}
      className={className}
      onClick={(e) => {
        onClick && onClick(e);
        if (pathname === "/") {
          e.preventDefault();
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          navigate(`/#${id}`, { replace: true, preventScrollReset: true });
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
};

const Nav = ({ onOpenPalette }) => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(pathname === "/" ? SECTION_IDS : []);
  const onPrompts = pathname.startsWith("/prompts");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Home">
          <span className="brand-mark">A</span>
          <span className="brand-name">{profile.firstName}</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {SECTIONS.map((s) => (
            <SectionLink key={s.id} id={s.id} className={`nav-link ${pathname === "/" && active === s.id ? "is-active" : ""}`}>
              {s.label}
            </SectionLink>
          ))}
          <Link to="/prompts" className={`nav-link nav-link-prompts ${onPrompts ? "is-active" : ""}`}>
            <Icon name="bxs-zap" /> Prompts
          </Link>
        </nav>

        <div className="nav-actions">
          <button type="button" className="kbd-btn" onClick={onOpenPalette} aria-label="Open command menu">
            <Icon name="bx-search" />
            <span className="kbd-hint">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>
          <SectionLink id="contact" className="btn btn-primary btn-sm nav-cta">
            Let's talk
          </SectionLink>
          <button
            type="button"
            className={`burger ${open ? "is-open" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-backdrop"
            className="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
        {open && (
          <motion.div
            key="menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {SECTIONS.map((s, i) => (
              <SectionLink key={s.id} id={s.id} className="mobile-link" onClick={() => setOpen(false)}>
                <span className="mobile-index">0{i + 1}</span>
                {s.label}
              </SectionLink>
            ))}
            <Link to="/prompts" className="mobile-link mobile-link-accent">
              <span className="mobile-index">05</span>
              Prompt Library <Icon name="bx-right-arrow-alt" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const CommandPalette = ({ open, onClose }) => {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const base = [
      { label: "Home", hint: "Page", icon: "bx-home-alt", to: "/" },
      ...SECTIONS.map((s) => ({ label: s.label, hint: "Section", icon: "bx-hash", to: `/#${s.id}` })),
      { label: "Prompt Library", hint: "Page", icon: "bxs-zap", to: "/prompts" },
      ...publishedPrompts.map((p) => ({ label: p.title, hint: p.category || "Prompt", icon: "bx-bolt-circle", to: `/prompts/${p.slug}` })),
      { label: "GitHub", hint: "Link", icon: "bxl-github", href: profile.socials.github },
      { label: "LinkedIn", hint: "Link", icon: "bxl-linkedin", href: profile.socials.linkedin },
      profile.socials.instagram && { label: "Instagram", hint: "Link", icon: "bxl-instagram", href: profile.socials.instagram },
      { label: "Resume", hint: "Link", icon: "bx-file", href: profile.resume },
      { label: "Copy email", hint: profile.email, icon: "bx-envelope", copy: profile.email },
    ].filter(Boolean);
    const term = q.trim().toLowerCase();
    return term ? base.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(term)) : base;
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    }
  }, [open]);
  useEffect(() => setIdx(0), [q]);

  const run = (item) => {
    if (!item) return;
    onClose();
    if (item.to) navigate(item.to);
    else if (item.href) window.open(item.href, "_blank", "noopener");
    else if (item.copy) navigator.clipboard && navigator.clipboard.writeText(item.copy);
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(items[idx]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="palette"
            role="dialog"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-search">
              <Icon name="bx-search" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Jump to a section or search prompts…" />
              <kbd>esc</kbd>
            </div>
            <ul className="palette-list">
              {items.length === 0 && <li className="palette-empty">No results for “{q}”</li>}
              {items.map((item, i) => (
                <li key={item.label + i}>
                  <button type="button" className={`palette-item ${i === idx ? "is-active" : ""}`} onMouseEnter={() => setIdx(i)} onClick={() => run(item)}>
                    <Icon name={item.icon} />
                    <span className="palette-label">{item.label}</span>
                    <span className="palette-hint">{item.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-big">
        <span>Let's build</span> <em>something.</em>
      </div>
      <div className="footer-row">
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          {profile.socials.instagram && (
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
          )}
          <Link to="/prompts">Prompt Library</Link>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} {profile.name} — Designed & built by me.</span>
      </div>
    </div>
  </footer>
);

const Background = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty("--cx", `${e.clientX}px`);
          ref.current.style.setProperty("--cy", `${e.clientY}px`);
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div className="bg" ref={ref} aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-aurora" />
      <div className="bg-cursor" />
      <div className="bg-noise" />
    </div>
  );
};

const Layout = () => {
  const [palette, setPalette] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  useScrollRestore();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      } else if (e.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Background />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Nav onOpenPalette={() => setPalette(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </>
  );
};

export default Layout;
