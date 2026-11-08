import React from "react";
import { motion } from "framer-motion";
import { useCopy } from "../lib/hooks";

export const Reveal = ({ children, delay = 0, y = 24, as = "div", className, ...rest }) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export const SectionHead = ({ index, eyebrow, title, accent, children }) => (
  <Reveal className="section-head">
    <div className="eyebrow">
      {index && <span className="eyebrow-index">{index}</span>}
      <span>{eyebrow}</span>
    </div>
    <h2 className="section-title">
      {title} {accent && <em>{accent}</em>}
    </h2>
    {children && <p className="section-lede">{children}</p>}
  </Reveal>
);

export const Icon = ({ name, className = "" }) => <i className={`bx ${name} ${className}`} aria-hidden="true" />;

export const CopyButton = ({ text, label = "Copy", className = "" }) => {
  const [copied, copy] = useCopy();
  return (
    <button type="button" className={`copy-btn ${copied ? "is-copied" : ""} ${className}`} onClick={() => copy(text)}>
      <Icon name={copied ? "bx-check" : "bx-copy"} />
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
};

// Tiny, safe inline formatter: **bold**, `code`, [label](https://url)
export const RichText = ({ text }) => {
  if (!text) return null;
  const paragraphs = text.split(/\n{2,}/);
  return paragraphs.map((para, pi) => (
    <p key={pi}>
      {para.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g).map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (/^`[^`]+`$/.test(part)) return <code key={i}>{part.slice(1, -1)}</code>;
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link && /^https?:\/\//.test(link[2]))
          return (
            <a key={i} href={link[2]} target="_blank" rel="noreferrer">
              {link[1]}
            </a>
          );
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </p>
  ));
};

export const CodeBlock = ({ code, lang, label }) => (
  <div className="code-block">
    <div className="code-head">
      <span className="code-dots">
        <i />
        <i />
        <i />
      </span>
      <span className="code-lang">{label || lang || "text"}</span>
      <CopyButton text={code} />
    </div>
    <pre>
      <code>{code}</code>
    </pre>
  </div>
);
