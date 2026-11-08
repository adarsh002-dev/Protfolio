import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { matchesQuery, promptCategories, publishedPrompts } from "../lib/prompts";
import { useDocumentMeta } from "../lib/hooks";
import { Icon, Reveal } from "../components/ui";
import PromptCard from "../components/PromptCard";

const Prompts = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const cat = params.get("cat") || "";

  useDocumentMeta("Prompt Library", "Every prompt from my Instagram reels with a complete step-by-step build guide.");

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(
    () => publishedPrompts.filter((p) => (!cat || p.category === cat) && matchesQuery(p, q)),
    [q, cat]
  );

  return (
    <section className="container page">
      <header className="lib-hero">
        <motion.span className="mini-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Icon name="bxs-zap" /> Prompt Library · {publishedPrompts.length} {publishedPrompts.length === 1 ? "guide" : "guides"}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          From reel to <em>real build.</em>
        </motion.h1>
        <motion.p className="section-lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Every prompt I share on Instagram, with copy-ready prompts, the tools you need and a step-by-step guide.
          Found a reel you like? Search for it below.
        </motion.p>

        <motion.div className="lib-controls" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <label className="search">
            <Icon name="bx-search" />
            <input
              type="search"
              value={q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Search prompts, tools or topics…"
              aria-label="Search prompts"
            />
          </label>
          {promptCategories.length > 1 && (
            <div className="filter-chips" role="tablist" aria-label="Filter by category">
              <button type="button" className={`chip chip-btn ${!cat ? "is-on" : ""}`} onClick={() => update("cat", "")}>
                All
              </button>
              {promptCategories.map((c) => (
                <button key={c} type="button" className={`chip chip-btn ${cat === c ? "is-on" : ""}`} onClick={() => update("cat", c)}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </header>

      {results.length > 0 ? (
        <div className="prompt-grid">
          {results.map((p, i) => (
            <PromptCard key={p.slug} p={p} delay={0.04 * (i % 3)} />
          ))}
        </div>
      ) : (
        <Reveal className="card empty">
          <Icon name={publishedPrompts.length ? "bx-search-alt" : "bx-rocket"} className="empty-icon" />
          {publishedPrompts.length ? (
            <>
              <h3>No guides match “{q || cat}”.</h3>
              <p>Try a different keyword, or clear the filters.</p>
              <button type="button" className="btn btn-ghost" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </button>
            </>
          ) : (
            <>
              <h3>The first guides are on their way.</h3>
              <p>New prompts land here every time a reel goes live.</p>
              {profile.socials.instagram && (
                <a className="btn btn-primary" href={profile.socials.instagram} target="_blank" rel="noreferrer">
                  <Icon name="bxl-instagram" /> Follow on Instagram
                </a>
              )}
            </>
          )}
        </Reveal>
      )}
    </section>
  );
};

export default Prompts;
