"use client";

import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import Sphere from "@/components/sphere";
import { PANELS, SOURCE } from "@/content";

// Nodes sit on a ring around the sphere: top, right, bottom, left.
const RING = [
  { i: 1, dx: 0, dy: -1 },
  { i: 2, dx: 1, dy: 0 },
  { i: 3, dx: 0, dy: 1 },
  { i: 4, dx: -1, dy: 0 },
];

function magnet(e: PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
  const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
  el.style.transform = `translate(${(dx * 9).toFixed(2)}px,${(dy * 5).toFixed(2)}px)`;
}

function unmagnet(e: PointerEvent<HTMLAnchorElement>) {
  e.currentTarget.style.transform = "";
}

function Arrow({ down }: { down?: boolean }) {
  return (
    <svg className="tail" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path
        d={down ? "M6 1.5v8M2.5 6 6 9.5 9.5 6" : "M3 9 9 3M4 3h5v5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);

  // Deep links: /#work, /#experience, …
  useEffect(() => {
    const i = PANELS.findIndex((p) => p.slug && p.slug === location.hash.slice(1));
    if (i > 0) setActive(i);
  }, []);

  const select = (i: number) => {
    const next = active === i ? 0 : i;
    setActive(next);
    history.replaceState(null, "", next ? `#${PANELS[next].slug}` : location.pathname);
  };

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <div className="brand">
          <h1 className="name">João Barroso</h1>
          <span className="label">FRONT-END DEVELOPER</span>
        </div>
        <span className="label dim">REACT · EMBER.JS · TYPESCRIPT · RUBY — SINCE 2018</span>
      </header>

      <main className="stage">
        <div className="orb">
          <Sphere active={active} />
          <nav aria-label="Sections" className="ring">
            {RING.map(({ i, dx, dy }) => (
              <button
                key={i}
                type="button"
                className="node"
                aria-pressed={active === i}
                aria-controls="panels"
                onClick={() => select(i)}
                style={{ "--dx": dx, "--dy": dy } as CSSProperties}
              >
                <span className="node-num" aria-hidden="true">
                  {String(i).padStart(2, "0")}
                </span>
                <span className="node-label">{PANELS[i].label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div id="panels" className="panels">
          {PANELS.map((p, i) => (
            <section
              key={p.kicker}
              className={i === active ? "panel is-active" : "panel"}
              aria-labelledby={`panel-${i}`}
              aria-hidden={i !== active}
            >
              <span className="kicker">{p.kicker}</span>
              <h2 id={`panel-${i}`} className="title">
                {p.title}
              </h2>
              {p.body && <p className="body">{p.body}</p>}

              {p.links && (
                <ul className="list">
                  {p.links.map((row) => {
                    if (!row.href) {
                      return (
                        <li key={row.k} className="link-row">
                          <span className="k">{row.k}</span>
                          <span className="stack-col">
                            <span className="v">{row.v}</span>
                            <span className="note">{row.note}</span>
                          </span>
                        </li>
                      );
                    }
                    const external = row.href.startsWith("http");
                    const file = row.href.endsWith(".pdf");
                    return (
                      <li key={row.k}>
                        <a
                          className="link-row"
                          href={row.href}
                          {...(external || file ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          onPointerMove={magnet}
                          onPointerLeave={unmagnet}
                        >
                          <span className="k">{row.k}</span>
                          <span className="stack-col">
                            <span className="v">{row.v}</span>
                            <span className="note">{row.note}</span>
                          </span>
                          <Arrow down={file} />
                          {(external || file) && <span className="sr-only"> (opens in a new tab)</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}

              {p.rows && (
                <dl className="list">
                  {p.rows.map((row) => (
                    <div key={row.k} className="info-row">
                      <dt className="k">{row.k}</dt>
                      <dd className="stack-col">
                        <span className="info-v">{row.v}</span>
                        <span className="info-note">{row.note}</span>
                        {row.stack && <span className="info-stack">{row.stack}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}
        </div>
      </main>

      <footer className="site-footer">
        <a className="label" href={SOURCE} target="_blank" rel="noopener noreferrer">
          THE SPHERE IS ~50 LINES OF HAND-WRITTEN GLSL — VIEW SOURCE
        </a>
        <span className="label dim">NOT LOOKING · ALWAYS CURIOUS</span>
      </footer>
    </div>
  );
}
