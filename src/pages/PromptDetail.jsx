import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDate, getPrompt, publishedPrompts, reelEmbedUrl } from "../lib/prompts";
import { useActiveSection, useCopy, useDocumentMeta } from "../lib/hooks";
import { CodeBlock, Icon, Reveal, RichText } from "../components/ui";
import PromptCard from "../components/PromptCard";
import NotFound from "./NotFound";

const ShareButton = ({ title }) => {
  const [copied, copy] = useCopy();
  const share = async () => {
    const url = window.location.href.split("#")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (e) {
        if (e && e.name === "AbortError") return;
      }
    }
    copy(url);
  };
  return (
    <button type="button" className="btn btn-primary" onClick={share}>
      <Icon name={copied ? "bx-check" : "bx-share-alt"} /> {copied ? "Link copied!" : "Share guide"}
    </button>
  );
};

const ReelEmbed = ({ url }) => {
  const [loaded, setLoaded] = useState(false);
  const embed = reelEmbedUrl(url);
  if (!embed) return null;
  return (
    <div className={`reel ${loaded ? "is-loaded" : ""}`}>
      {!loaded && (
        <div className="reel-skeleton">
          <Icon name="bxl-instagram" />
          <span>Loading reel…</span>
        </div>
      )}
      <iframe src={embed} title="Instagram reel" loading="lazy" allowFullScreen onLoad={() => setLoaded(true)} />
    </div>
  );
};

const PromptDetail = () => {
  const { slug } = useParams();
  const p = getPrompt(slug);

  const sections = useMemo(() => {
    if (!p) return [];
    return [
      p.prompts && p.prompts.length && { id: "prompt", label: p.prompts.length > 1 ? "The prompts" : "The prompt" },
      p.tools && p.tools.length && { id: "tools", label: "What you need" },
      p.steps && p.steps.length && { id: "steps", label: "Step-by-step" },
      p.tips && p.tips.length && { id: "tips", label: "Pro tips" },
      p.fixes && p.fixes.length && { id: "fixes", label: "Something wrong?" },
      p.resources && p.resources.length && { id: "resources", label: "Resources" },
    ].filter(Boolean);
  }, [p]);
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(sectionIds);

  useDocumentMeta(p && p.title, p && p.summary);

  if (!p) return <NotFound />;

  const idx = publishedPrompts.findIndex((x) => x.slug === p.slug);
  const more = publishedPrompts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const prev = publishedPrompts[idx + 1];
  const next = publishedPrompts[idx - 1];

  const num = (id) => String(sectionIds.indexOf(id) + 1).padStart(2, "0");

  const jump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="container page guide">
      <motion.nav className="crumbs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="Breadcrumb">
        <Link to="/prompts"><Icon name="bx-left-arrow-alt" /> Prompt Library</Link>
        <span>/</span>
        <span>{p.category}</span>
      </motion.nav>

      <header className="guide-hero">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="guide-tags">
            <span className="chip chip-accent">{p.category}</span>
            {p.series && <span className="chip">{p.series}</span>}
            {p.draft && <span className="chip chip-warn">Draft — hidden on the live site</span>}
          </div>
          <h1>{p.title}</h1>
          <p className="section-lede">{p.summary}</p>
          <div className="guide-meta">
            {p.level && <span><Icon name="bx-signal-3" /> {p.level}</span>}
            {p.time && <span><Icon name="bx-time-five" /> {p.time}</span>}
            {p.steps && <span><Icon name="bx-list-ol" /> {p.steps.length} steps</span>}
            {p.date && <span><Icon name="bx-calendar" /> {formatDate(p.date)}</span>}
          </div>
          <div className="hero-ctas">
            <ShareButton title={p.title} />
            {p.reel && (
              <a href={p.reel} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <Icon name="bxl-instagram" /> Watch the reel
              </a>
            )}
          </div>
        </motion.div>
      </header>

      <div className="guide-layout">
        <aside className="guide-aside">
          <div className="guide-aside-inner">
            {sections.length > 1 && (
              <nav className="toc" aria-label="On this page">
                <span className="mini-label">On this page</span>
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} onClick={jump(s.id)} className={active === s.id ? "is-active" : ""}>
                    {s.label}
                  </a>
                ))}
              </nav>
            )}
            {reelEmbedUrl(p.reel) ? (
              <ReelEmbed url={p.reel} />
            ) : (
              p.cover && (
                <div className="guide-cover">
                  <img src={p.cover} alt={`${p.title} — reel cover`} />
                </div>
              )
            )}
          </div>
        </aside>

        <div className="guide-main">
          {p.prompts && p.prompts.length > 0 && (
            <Reveal as="section" id="prompt" className="guide-section">
              <h2><span className="h-num">{num("prompt")}</span> {p.prompts.length > 1 ? "The prompts" : "The prompt"}</h2>
              <p className="muted">
                {p.prompts.some((x) => /\[[A-Z0-9 ,_-]+\]/.test(x.text))
                  ? "Copy it, replace anything in [BRACKETS] with your own details, and paste it into your AI tool."
                  : "Tap Copy and paste it into your AI tool exactly as it is."}
              </p>
              {p.prompts.map((pr, i) => (
                <CodeBlock key={i} code={pr.text} label={pr.label || `Prompt ${i + 1}`} />
              ))}
            </Reveal>
          )}

          {p.tools && p.tools.length > 0 && (
            <Reveal as="section" id="tools" className="guide-section">
              <h2><span className="h-num">{num("tools")}</span> What you need</h2>
              <div className="tools-grid">
                {p.tools.map((t) => {
                  const Tag = t.url ? "a" : "div";
                  return (
                    <Tag key={t.name} className="card tool" {...(t.url ? { href: t.url, target: "_blank", rel: "noreferrer" } : {})}>
                      <span className="tool-name">
                        {t.name} {t.url && <Icon name="bx-up-arrow-alt" className="rot45" />}
                      </span>
                      {t.note && <span className="tool-note">{t.note}</span>}
                    </Tag>
                  );
                })}
              </div>
            </Reveal>
          )}

          {p.steps && p.steps.length > 0 && (
            <section id="steps" className="guide-section">
              <Reveal as="h2"><span className="h-num">{num("steps")}</span> Step-by-step</Reveal>
              <ol className="steps">
                {p.steps.map((s, i) => (
                  <Reveal as="li" key={i} className="step">
                    <span className="step-num">{i + 1}</span>
                    <div className="step-body">
                      <h3>{s.title}</h3>
                      <RichText text={s.body} />
                      {s.code && <CodeBlock code={s.code} lang={s.lang} />}
                      {s.image && (
                        <figure className="step-shot">
                          <a href={s.image} target="_blank" rel="noreferrer">
                            <img src={s.image} alt={s.imageAlt || s.title} loading="lazy" />
                          </a>
                          {s.imageAlt && <figcaption>{s.imageAlt}</figcaption>}
                        </figure>
                      )}
                      {s.note && (
                        <div className="step-note">
                          <Icon name="bxs-error-circle" />
                          <RichText text={s.note} />
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section>
          )}

          {p.tips && p.tips.length > 0 && (
            <Reveal as="section" id="tips" className="guide-section">
              <h2><span className="h-num">{num("tips")}</span> Pro tips</h2>
              <div className="card tips">
                {p.tips.map((t, i) => (
                  <div key={i} className="tip">
                    <Icon name="bxs-bulb" />
                    <RichText text={t} />
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {p.fixes && p.fixes.length > 0 && (
            <Reveal as="section" id="fixes" className="guide-section">
              <h2><span className="h-num">{num("fixes")}</span> Something went wrong?</h2>
              <p className="muted">Tap your problem to see the fix.</p>
              <div className="fixes">
                {p.fixes.map((x, i) => (
                  <details key={i} className="card fix">
                    <summary>
                      <span>{x.problem}</span>
                      <Icon name="bx-chevron-down" />
                    </summary>
                    <div className="fix-body">
                      <RichText text={x.fix} />
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          )}

          {p.resources && p.resources.length > 0 && (
            <Reveal as="section" id="resources" className="guide-section">
              <h2><span className="h-num">{num("resources")}</span> Resources</h2>
              <div className="resources">
                {p.resources.map((r) => (
                  <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="resource">
                    <span>{r.label}</span>
                    <Icon name="bx-up-arrow-alt" className="rot45" />
                  </a>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal className="card guide-end">
            <div>
              <h3>Built it? Share it with someone.</h3>
              <p className="muted">Send this link to anyone who asked “how did you make that?”</p>
            </div>
            <ShareButton title={p.title} />
          </Reveal>

          {(prev || next) && (
            <nav className="pager" aria-label="More guides">
              {prev ? (
                <Link to={`/prompts/${prev.slug}`} className="card pager-link">
                  <span className="mini-label"><Icon name="bx-left-arrow-alt" /> Older</span>
                  <span>{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link to={`/prompts/${next.slug}`} className="card pager-link pager-next">
                  <span className="mini-label">Newer <Icon name="bx-right-arrow-alt" /></span>
                  <span>{next.title}</span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section className="guide-more">
          <h2 className="section-title small">More <em>guides</em></h2>
          <div className="prompt-grid">
            {more.map((m, i) => (
              <PromptCard key={m.slug} p={m} delay={0.05 * i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default PromptDetail;
