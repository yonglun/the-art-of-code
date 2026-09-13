import React, { useEffect, useState } from 'react';
import { CHAPTERS, LOCALES, UI_COPY, resolveLocale } from './content';
import { SITE_COPY } from './siteCopy';
import { Artwork } from './components/Artwork';
import { Gallery } from './components/Gallery';
import { Reader } from './components/Reader';

const READ_KEY = 'the-art-of-code-read-ids';
function stored(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function chapterFromHash() {
  return CHAPTERS.find(ch => window.location.hash === `#chapter/${ch.id}`) || null;
}

export default function App() {
  const [locale, setLocale] = useState(() => resolveLocale(stored('art-code-locale', null)));
  const [chapter, setChapter] = useState(chapterFromHash);
  const [readIds, setReadIds] = useState(() => {
    const ids = stored(READ_KEY, []);
    return Array.isArray(ids) ? [...new Set(ids.filter(id => CHAPTERS.some(ch => ch.id === id)))] : [];
  });
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const t = UI_COPY[locale];
  const s = SITE_COPY[locale];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = event => setPaused(event.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    const navigate = () => {
      const next = chapterFromHash();
      setChapter(next);
      requestAnimationFrame(() => {
        if (next) {
          window.scrollTo(0, 0);
          document.getElementById('reader-title')?.focus({ preventScroll: true });
        } else {
          const id = window.location.hash.slice(1);
          document.getElementById(['gallery', 'about', 'main'].includes(id) ? id : 'top')?.scrollIntoView();
        }
      });
    };
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => {
    document.documentElement.lang = LOCALES.find(l => l.id === locale).htmlLang;
    document.title = chapter ? `${chapter.title[locale]} — The Art of Code` : `The Art of Code — ${s.notes}`;
    try { localStorage.setItem('art-code-locale', JSON.stringify(locale)); } catch { /* Session state remains available. */ }
  }, [locale, chapter, s.notes]);
  useEffect(() => {
    try { localStorage.setItem(READ_KEY, JSON.stringify(readIds)); } catch { /* Session state remains available. */ }
  }, [readIds]);
  const toggleRead = id => setReadIds(ids => ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]);

  return <div id="top" className={`site-shell ${chapter ? 'site-shell--reading' : ''}`}>
    <a href="#main" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>{locale === 'zh' ? '跳到主要内容' : locale === 'ja' ? '本文へ移動' : 'Skip to main content'}</a>
    <header className="site-header">
      <a href="#top" className="wordmark" aria-label="The Art of Code"><span className="brand-symbol" aria-hidden="true">a/c</span><span>THE ART OF CODE<span className="wordmark-sub">{s.notes} — SANDRINE BANAS</span></span></a>
      <nav className="header-nav" aria-label={s.gallery}><a href="#gallery">{s.gallery}</a><a href="#about">{s.about}</a></nav>
      <div className="languages" role="group" aria-label={t.language}>{LOCALES.map(l => <button key={l.id} aria-pressed={locale === l.id} onClick={() => setLocale(l.id)}>{l.short}</button>)}</div>
    </header>
    <main id="main" tabIndex="-1">
      {chapter ? <Reader chapter={chapter} locale={locale} t={t} s={s} paused={paused} setPaused={setPaused} readIds={readIds} toggleRead={toggleRead} /> : <>
        <section className="cover" aria-labelledby="cover-title">
          <div className="cover-copy">
            <p className="eyebrow"><span className="accent-dot" /> {s.kicker}</p>
            <h1 id="cover-title">The Art<br/><span className="title-second"><i>of</i> Code<span className="title-dot">.</span></span></h1>
            <p className="cover-subtitle">{s.subtitle.split('\n').map((line, i) => <React.Fragment key={line}>{i > 0 && <br/>}{line}</React.Fragment>)}</p>
            <p className="cover-intro">{s.introduction}</p>
            <a className="begin-link" href="#chapter/aesthetics">{s.start}<span aria-hidden="true">↗</span></a>
          </div>
          <figure className="cover-art cover-art--abstract">
            <Artwork kind="mobius" locale={locale} label={s.coverArtwork} animated paused={paused} />
            <button className="cover-motion" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? s.play : s.pause} title={paused ? s.play : s.pause}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>
          </figure>
        </section>
        <div className="edition-line"><span>01 — 10 / {s.edition}</span><a href="#gallery">{s.gallery} <span aria-hidden="true">↓</span></a><span>ART, LOGIC & THE HUMAN TOUCH</span></div>
        <Gallery paused={paused} setPaused={setPaused} locale={locale} t={t} s={s} readIds={readIds} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />
        <section className="about-section" id="about" aria-labelledby="about-title"><div><p className="eyebrow">THE BOOK / {s.about}</p><h2 id="about-title">{s.aboutTitle}</h2><p className="about-author">Sandrine Banas<br/><a className="book-link" href="https://www.manning.com/books/the-art-of-code" target="_blank" rel="noreferrer"><i>The Art of Code ↗</i></a></p></div><div className="about-prose"><p>{s.aboutBody.split('The Art of Code').map((part, i) => <React.Fragment key={i}>{i > 0 && <a className="book-link" href="https://www.manning.com/books/the-art-of-code" target="_blank" rel="noreferrer">The Art of Code</a>}{part}</React.Fragment>)}</p><p>{s.aboutNotes}</p></div></section>
      </>}
    </main>
    <footer className="site-footer"><span className="footer-signoff">{s.ending}</span><div className="footer-progress"><span>{t.progress} <b>{readIds.length} / 10</b></span><progress max="10" value={readIds.length} aria-label={t.progress}/><button onClick={() => setReadIds([])} disabled={!readIds.length}>{t.resetProgress}</button></div><a href={chapter ? '#gallery' : '#top'}>{chapter ? s.back : s.top} ↑</a></footer>
  </div>;
}
