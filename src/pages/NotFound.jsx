import React from "react";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "../lib/hooks";
import { Icon } from "../components/ui";

const NotFound = () => {
  useDocumentMeta("Not found");
  return (
    <section className="container page notfound">
      <span className="notfound-code">404</span>
      <h1>
        This page took a <em>wrong turn.</em>
      </h1>
      <p className="section-lede">The link might be old, or the guide may have moved.</p>
      <div className="hero-ctas">
        <Link to="/" className="btn btn-primary">
          <Icon name="bx-home-alt" /> Back home
        </Link>
        <Link to="/prompts" className="btn btn-ghost">
          <Icon name="bxs-zap" /> Prompt Library
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
