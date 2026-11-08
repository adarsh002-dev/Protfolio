import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/prompts";
import { spotlight } from "../lib/hooks";
import { Icon, Reveal } from "./ui";

const PromptCard = ({ p, delay = 0 }) => (
  <Reveal delay={delay} className="prompt-card-wrap">
    <Link to={`/prompts/${p.slug}`} className={`card prompt-card ${p.cover ? "has-cover" : ""}`} onMouseMove={spotlight}>
      {p.cover && (
        <div className="prompt-card-cover">
          <img src={p.cover} alt="" loading="lazy" />
        </div>
      )}
      {p.series && <span className="prompt-card-series">{p.series}</span>}
      <div className="prompt-card-top">
        <span className="chip chip-accent">{p.category || "Guide"}</span>
        {p.draft && <span className="chip chip-warn">Draft</span>}
        {p.reel && <Icon name="bxl-instagram" className="prompt-card-ig" />}
      </div>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <div className="prompt-card-meta">
        {p.level && <span><Icon name="bx-signal-3" /> {p.level}</span>}
        {p.time && <span><Icon name="bx-time-five" /> {p.time}</span>}
        <span><Icon name="bx-list-ol" /> {(p.steps || []).length} steps</span>
      </div>
      <div className="prompt-card-foot">
        <span className="prompt-card-date">{formatDate(p.date)}</span>
        <span className="prompt-card-go">
          Open guide <Icon name="bx-right-arrow-alt" />
        </span>
      </div>
    </Link>
  </Reveal>
);

export default PromptCard;
