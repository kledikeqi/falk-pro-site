"use client";
import { useEffect, useState } from "react";
import {
  CONTACT,
  FACTS,
  LANGS,
  LABEL,
  PHOTOS,
  PRODUCTS,
  REFERENCES,
  T,
  type Lang,
} from "./content";

export default function Home() {
  const [lang, setLang] = useState<Lang>("it");
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", mail: "", msg: "" });
  const t = T[lang];
  useEffect(() => {
    const s = localStorage.getItem("lang") as Lang | null;
    const b = navigator.language.slice(0, 2) as Lang;
    setLang(s && LANGS.includes(s) ? s : LANGS.includes(b) ? b : "it");
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % PRODUCTS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const go = (d: number) =>
    setI((n) => (n + d + PRODUCTS.length) % PRODUCTS.length);
  const send = () => {
    const body = `${form.msg}\n\n${form.name}\n${form.mail}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Falk Pro - " + form.name)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <>
      <header className="top">
        <a href="#top" className="logo">
          <img src="/logos/falk-pro-logo.png" alt="Falk Pro" />
        </a>
        <nav className={open ? "open" : ""}>
          {[
            ["about", "nav_about"],
            ["process", "nav_process"],
            ["products", "nav_products"],
            ["capacity", "nav_capacity"],
            ["gallery", "nav_gallery"],
            ["ref", "nav_ref"],
            ["contact", "nav_contact"],
          ].map(([id, k]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {t[k]}
            </a>
          ))}
        </nav>
        <div className="lang" role="group" aria-label={t.lang}>
          {LANGS.map((l) => (
            <button
              key={l}
              aria-pressed={l === lang}
              onClick={() => setLang(l)}
            >
              {LABEL[l]}
            </button>
          ))}
        </div>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <main id="top">
        <section className="hero">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/video/process-2.jpg"
            src="/video/process-2.mp4"
          />
          <div className="shade" />
          <div className="wrap">
            <h1>{t.h1}</h1>
            <p>{t.hsub}</p>
            <div className="btns">
              <a className="btn y" href="#contact">
                {t.cta}
              </a>
              <a className="btn" href="#gallery">
                {t.cta2}
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="wrap two">
          <div>
            <h2>{t.about_t}</h2>
            <p className="lead">{t.about_p}</p>
          </div>
          <dl className="facts">
            {[
              [t.f_found, FACTS.founded],
              [t.f_workers, FACTS.workers],
              [t.f_legal, t.legal],
              [t.f_status, t.status],
              ["NIPT", FACTS.nipt],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="process" className="band">
          <div className="wrap">
            <h2>{t.proc_t}</h2>
            <ol className="steps">
              {[1, 2, 3, 4].map((n) => (
                <li key={n}>
                  <span>{n}</span>
                  <h3>{t[`s${n}`]}</h3>
                  <p>{t[`s${n}d`]}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="products" className="wrap">
          <h2>{t.prod_t}</h2>
          <p className="lead">{t.prod_p}</p>
          <div className="slider" aria-roledescription="carousel">
            {PRODUCTS.map((p, n) => (
              <img
                key={p.img}
                src={p.img}
                alt={t[p.k]}
                className={n === i ? "on" : ""}
              />
            ))}
            <button
              className="arrow l"
              onClick={() => go(-1)}
              aria-label={t.prev}
            >
              ‹
            </button>
            <button
              className="arrow r"
              onClick={() => go(1)}
              aria-label={t.next}
            >
              ›
            </button>
            <div className="dots">
              {PRODUCTS.map((_, n) => (
                <button
                  key={n}
                  aria-label={String(n + 1)}
                  aria-current={n === i}
                  onClick={() => setI(n)}
                />
              ))}
            </div>
          </div>
          <p className="note">
            {t.safety} · {t.prod_note}
          </p>
        </section>

        <section id="capacity" className="band dark">
          <div className="wrap">
            <h2>{t.cap_t}</h2>
            <div className="nums">
              {[
                [FACTS.workers, t.c1],
                [FACTS.assembly, t.c2],
                [FACTS.stitching, t.c3],
              ].map(([n, l]) => (
                <div key={l}>
                  <b>{n}</b>
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <h3>{t.moq_t}</h3>
            <div className="nums small">
              <div>
                <b>{FACTS.moqAssembly}</b>
                <span>{t.moq1}</span>
              </div>
              <div>
                <b>{FACTS.moqStitching}</b>
                <span>{t.moq2}</span>
              </div>
            </div>
            <p className="note">{t.moq_n}</p>
          </div>
        </section>

        <section id="gallery" className="wrap">
          <h2>{t.gal_t}</h2>
          <p className="lead">{t.gal_p}</p>
          <div className="grid">
            {PHOTOS.map((p) => (
              <img
                key={p}
                src={`/gallery/${p}.jpg`}
                alt={t.gal_t}
                loading="lazy"
              />
            ))}
          </div>
          <h2 className="sp">{t.vid_t}</h2>
          <div className="vids">
            {[1, 2, 3, 4].map((n) => (
              <figure key={n}>
                <video
                  controls
                  preload="none"
                  playsInline
                  poster={`/video/process-${n}.jpg`}
                  src={`/video/process-${n}.mp4`}
                />
                <figcaption>{t[`v${n}`]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="ref" className="band">
          <div className="wrap">
            <h2>{t.ref_t}</h2>
            {REFERENCES.map((r) => (
              <p key={r.name} className="ref">
                <img
                  src="/logos/base-logo.png"
                  alt={r.name}
                  className="reflogo"
                />
                <span>
                  <b>{r.name}</b> {t.ref_p} {r.since}
                </span>
              </p>
            ))}
            <p className="note">{t.ref_note}</p>
          </div>
        </section>

        <section id="contact" className="wrap two">
          <div>
            <h2>{t.con_t}</h2>
            <p className="lead">{t.con_p}</p>
            <p>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <br />
              <a href={`tel:${CONTACT.phone.replace(/ /g, "")}`}>
                {CONTACT.phone}
              </a>
              <br />
              <a
                href={CONTACT.europages}
                target="_blank"
                rel="noopener noreferrer"
              >
                Europages
              </a>
              <br />
              <a href={CONTACT.linkedin}>LinkedIn</a>
            </p>
            <p>
              {t.addr}: {CONTACT.address}
            </p>
            <a className="btn y" href={`https://wa.me/${CONTACT.wa}`}>
              {t.wa}
            </a>
          </div>
          <div className="form">
            <label>
              {t.f_name}
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              {t.f_mail}
              <input
                type="email"
                value={form.mail}
                onChange={(e) => setForm({ ...form, mail: e.target.value })}
              />
            </label>
            <label>
              {t.f_msg}
              <textarea
                rows={5}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
              />
            </label>
            <button className="btn y" onClick={send}>
              {t.send}
            </button>
          </div>
        </section>
      </main>
      <footer>
        <span>© Falk Pro sh.p.k · NIPT {FACTS.nipt}</span>
        <span>{CONTACT.address}</span>
      </footer>
    </>
  );
}
