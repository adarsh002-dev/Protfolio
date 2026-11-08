import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import portrait from "../assets/Profile4.webp";
import { profile, stats } from "../data/profile";
import { skillGroups, marquee } from "../data/skills";
import { projects } from "../data/projects";
import { experience, education } from "../data/career";
import { publishedPrompts } from "../lib/prompts";
import { spotlight, useDocumentMeta, useCopy } from "../lib/hooks";
import { Icon, Reveal, SectionHead } from "../components/ui";
import { SectionLink } from "../components/Layout";
import PromptCard from "../components/PromptCard";

/* ─────────────────────────── HERO ─────────────────────────── */
// Scales a line of text so it exactly fills its container's width.
const useFitText = () => {
  const box = useRef(null);
  const line = useRef(null);
  const [size, setSize] = useState(null);
  useEffect(() => {
    const fit = () => {
      if (!box.current || !line.current) return;
      line.current.style.fontSize = "100px";
      const w = line.current.scrollWidth;
      if (!w) return;
      const px = (box.current.clientWidth / w) * 98.5; // small safety margin for glyph overhang
      line.current.style.fontSize = `${px}px`;
      setSize(px);
    };
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  return [box, line, size];
};

const LocalTime = () => {
  const fmt = () =>
    new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{t} IST</span>;
};

const SplitLetters = ({ text, delay = 0 }) => (
  <>
    {text.split("").map((ch, i) => (
      <span key={i} className="mask">
        <motion.span
          className="mask-inner"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ delay: delay + i * 0.04, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      </span>
    ))}
  </>
);

const Hero = () => {
  const hero = useRef(null);
  const [box1, line1, size1] = useFitText();
  const [box2, line2, size2] = useFitText();
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  return (
    <section className="hero container" id="top" ref={hero}>
      <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
        <span className="hero-meta-item">
          <span className="hero-meta-k">Role</span> Full stack developer & AI builder
        </span>
        <span className="hero-meta-item">
          <span className="hero-meta-k">Based in</span> {profile.location}<span className="hero-time"> · <LocalTime /></span>
        </span>
        <span className="hero-meta-item hero-meta-status">
          <span className="status-dot" /> {profile.available ? "Available for work" : "Heads-down"}
        </span>
      </motion.div>

      <motion.h1 className="hero-name" style={{ y: nameY, opacity: fade }} aria-label={profile.name}>
        <span className="fit-box" ref={box1} aria-hidden="true">
          <span className="fit-line" ref={line1} style={size1 ? { fontSize: size1 } : undefined}>
            <SplitLetters text={first} delay={0.15} />
          </span>
        </span>
        <span className="fit-box" ref={box2} aria-hidden="true">
          <span className="fit-line fit-line-2" ref={line2} style={size2 ? { fontSize: size2 } : undefined}>
            <motion.span
              className="name-photo"
              initial={{ clipPath: "inset(0% 100% 0% 0% round 999px)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0% round 999px)" }}
              transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={portrait} alt="" />
            </motion.span>
            <em><SplitLetters text={last} delay={0.35} /></em>
          </span>
        </span>
      </motion.h1>

      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-lede">
          I build <strong>AI-powered products</strong> end to end — from the first prompt to production — and share
          exactly how I do it.
        </p>
        <div className="hero-ctas">
          <SectionLink id="work" className="btn btn-primary">
            See my work <Icon name="bx-right-arrow-alt" />
          </SectionLink>
          <Link to="/prompts" className="btn btn-ghost">
            <Icon name="bxs-zap" /> Prompt Library
          </Link>
        </div>
        <SectionLink id="about" className="scroll-cue" aria-label="Scroll to about">
          <span className="scroll-cue-line" />
          Scroll to explore
        </SectionLink>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────── MARQUEE ─────────────────────────── */
const Marquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      {[...marquee, ...marquee].map((m, i) => (
        <span key={i} className="marquee-item">
          {m} <Icon name="bxs-star" />
        </span>
      ))}
    </div>
  </div>
);

/* ─────────────────────────── ABOUT ─────────────────────────── */
const About = () => (
  <section className="section container" id="about">
    <SectionHead index="01" eyebrow="About" title="Engineer by craft," accent="builder by habit." />
    <div className="bento">
      <Reveal className="card bento-bio" onMouseMove={spotlight}>
        {profile.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="bio-actions">
          <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer">
            <Icon name="bx-download" /> Resume
          </a>
          <a className="btn btn-ghost" href={profile.videoResume} target="_blank" rel="noreferrer">
            <Icon name="bx-play-circle" /> Video resume
          </a>
        </div>
      </Reveal>

      {stats().map((s, i) => (
        <Reveal key={s.label} delay={0.05 * i} className="card stat" onMouseMove={spotlight}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </Reveal>
      ))}

      <Reveal className="card bento-now" onMouseMove={spotlight}>
        <span className="mini-label"><span className="status-dot" /> Currently</span>
        <p>
          Building AI products at{" "}
          <a href={experience[0].link} target="_blank" rel="noreferrer">{experience[0].company}</a> and documenting my
          prompts in the <Link to="/prompts">Prompt Library</Link>.
        </p>
      </Reveal>

      <Reveal className="card bento-traits" onMouseMove={spotlight}>
        <span className="mini-label">Off the keyboard</span>
        <div className="chips">
          {profile.traits.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─────────────────────────── SKILLS ─────────────────────────── */
const Skills = () => (
  <section className="section container" id="skills">
    <SectionHead index="02" eyebrow="Toolbox" title="The stack I" accent="reach for.">
      From pixel-level UI to APIs, databases and LLM pipelines — I'm comfortable owning the whole product.
    </SectionHead>
    <div className="skills-grid">
      {skillGroups.map((g, i) => (
        <Reveal key={g.title} delay={0.05 * i} className="card skill-card" onMouseMove={spotlight}>
          <div className="skill-head">
            <span className="skill-icon"><Icon name={g.icon} /></span>
            <h3>{g.title}</h3>
            <span className="skill-count">{String(g.items.length).padStart(2, "0")}</span>
          </div>
          <div className="chips">
            {g.items.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ─────────────────────────── WORK ─────────────────────────── */
const ProjectCover = ({ p }) =>
  p.image ? (
    <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
  ) : (
    <div className="gen-cover">
      <span className="gen-cover-kind">{p.kind}</span>
      <span className="gen-cover-title">{p.title}</span>
    </div>
  );

const Work = () => (
  <section className="section container" id="work">
    <SectionHead index="03" eyebrow="Selected work" title="Things I've" accent="shipped." />
    <div className="work-grid">
      {projects.map((p, i) => (
        <Reveal key={p.title} delay={0.05 * (i % 2)} className={`card project ${p.featured ? "project-featured" : ""}`} onMouseMove={spotlight}>
          <div className="project-cover">
            <ProjectCover p={p} />
          </div>
          <div className="project-body">
            <div className="project-meta">
              <span className="mini-label">{p.kind}</span>
              <span className="project-num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.description}</p>
            <div className="chips chips-sm">
              {p.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
            <div className="project-links">
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" className="link-arrow">
                  Live site <Icon name="bx-up-arrow-alt" className="rot45" />
                </a>
              )}
              <a href={p.github} target="_blank" rel="noreferrer" className="link-arrow">
                Code <Icon name="bxl-github" />
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal className="work-more">
      <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
        More on GitHub <Icon name="bx-right-arrow-alt" />
      </a>
    </Reveal>
  </section>
);

/* ─────────────────────────── PROMPTS TEASER ─────────────────────────── */
const PromptsTeaser = () => {
  const latest = publishedPrompts.slice(0, 3);
  return (
    <section className="section container" id="prompts">
      <Reveal className="card prompt-banner" onMouseMove={spotlight}>
        <div className="prompt-banner-copy">
          <span className="mini-label"><Icon name="bxs-zap" /> Prompt Library</span>
          <h2>
            Saw it on my reel? <em>Get the full guide.</em>
          </h2>
          <p>
            Every prompt from my Instagram reels — with copy-ready prompts, the exact tools, and a step-by-step build
            guide you can follow in one sitting.
          </p>
          <div className="hero-ctas">
            <Link to="/prompts" className="btn btn-primary">
              Browse all guides <Icon name="bx-right-arrow-alt" />
            </Link>
            {profile.socials.instagram && (
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <Icon name="bxl-instagram" /> Follow for more
              </a>
            )}
          </div>
        </div>
        <div className="prompt-banner-art" aria-hidden="true">
          <div className="pb-window">
            <div className="code-head"><span className="code-dots"><i /><i /><i /></span><span className="code-lang">prompt.txt</span></div>
            <pre>
              <span className="tok-c">{"// copy → paste → build"}</span>{"\n"}
              <span className="tok-k">You are</span> a senior engineer.{"\n"}
              <span className="tok-k">Build</span> [the thing from the reel]{"\n"}
              <span className="tok-k">using</span> React + Node.{"\n"}
              <span className="tok-k">Return</span> every file in full.<span className="caret" />
            </pre>
          </div>
        </div>
      </Reveal>

      {latest.length > 0 && (
        <div className="prompt-grid prompt-grid-home">
          {latest.map((p, i) => (
            <PromptCard key={p.slug} p={p} delay={0.05 * i} />
          ))}
        </div>
      )}
    </section>
  );
};

/* ─────────────────────────── EXPERIENCE ─────────────────────────── */
const Experience = () => (
  <section className="section container" id="experience">
    <SectionHead index="04" eyebrow="Experience" title="Where I've" accent="made an impact." />
    <div className="timeline">
      {experience.map((x, i) => (
        <Reveal key={x.company} delay={0.05 * i} className="tl-item">
          <div className="tl-when">
            <span>{x.start} — {x.end}</span>
            <span className="tl-loc">{x.location}</span>
          </div>
          <div className="tl-dot" />
          <div className="card tl-card" onMouseMove={spotlight}>
            <h3>
              {x.role}{" "}
              <a href={x.link} target="_blank" rel="noreferrer" className="tl-company">@ {x.company}</a>
            </h3>
            <p className="tl-summary">{x.summary}</p>
            <ul className="tl-list">
              {x.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="chips chips-sm">
              {x.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal className="edu">
      <h3 className="edu-title"><Icon name="bxs-graduation" /> Education</h3>
      <div className="edu-grid">
        {education.map((e) => (
          <div key={e.title} className="card edu-card" onMouseMove={spotlight}>
            <span className="mini-label">{e.period}</span>
            <h4>{e.title}</h4>
            <p>{e.place}</p>
            <span className="edu-note">{e.note}</span>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

/* ─────────────────────────── CONTACT ─────────────────────────── */
const Contact = () => {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, copy] = useCopy();

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm("service_63s3qt4", "template_n94lptt", form.current, "CmODOLnVb83lrLUOr");
      form.current.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section className="section container" id="contact">
      <div className="contact">
        <div className="contact-copy">
          <SectionHead index="05" eyebrow="Contact" title="Have an idea?" accent="Let's build it." />
          <Reveal>
            <p className="section-lede">
              Freelance projects, full-time roles, collaborations or just a question about one of my reels — my inbox is open.
            </p>
            <button type="button" className="email-big" onClick={() => copy(profile.email)}>
              <span>{profile.email}</span>
              <span className="email-big-hint">
                <Icon name={copied ? "bx-check" : "bx-copy"} /> {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </Reveal>
        </div>

        <Reveal className="card contact-form-card" delay={0.1}>
          <form ref={form} onSubmit={submit} className="contact-form">
            <label className="field">
              <span>Name</span>
              <input name="name" type="text" required placeholder="Your name" autoComplete="name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required placeholder="you@company.com" autoComplete="email" />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea name="message" required rows={5} placeholder="Tell me about your project…" />
            </label>
            <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
              {status === "sending" ? (
                <><span className="spinner" /> Sending…</>
              ) : (
                <>Send message <Icon name="bx-send" /></>
              )}
            </button>
            <AnimatePresence>
              {(status === "sent" || status === "error") && (
                <motion.p
                  className={`form-status ${status}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                >
                  <Icon name={status === "sent" ? "bx-check-circle" : "bx-error-circle"} />
                  {status === "sent" ? "Message sent — I'll get back to you soon." : `Couldn't send. Email me at ${profile.email}.`}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

const Home = () => {
  useDocumentMeta(null, `${profile.name} — full stack developer building AI-powered products. Projects, experience and a library of build guides from my reels.`);
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Work />
      <PromptsTeaser />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;
