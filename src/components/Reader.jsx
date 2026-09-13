import React from 'react';
import { CHAPTERS, DIMENSIONS, UI_COPY } from '../content';
import { Artwork } from './Artwork';

export function Reader({ chapter: ch, locale, t, s, paused, setPaused, readIds, toggleRead }) {
  const index = ch.number - 1;
  const read = readIds.includes(ch.id);
  return <>
    <nav className="reader-index" aria-label={s.gallery}><a href="#gallery" className="back-link">← <span>{s.back}</span></a><div className="chapter-numbers">{CHAPTERS.map(item => <a key={item.id} href={`#chapter/${item.id}`} aria-label={`${item.number}. ${item.title[locale]}`} aria-current={item.id === ch.id ? 'page' : undefined}>{String(item.number).padStart(2, '0')}<span aria-hidden="true">{readIds.includes(item.id) ? '·' : ''}</span></a>)}</div></nav>
    <article className="reading-spread" key={ch.id}>
      <div className="reading-visual"><figure><div className="art-topline"><span>FIG. {String(ch.number).padStart(2, '0')}</span><span>{s.forms[index]}</span></div><Artwork locale={locale} kind={ch.id} label={`${s.artwork}: ${s.formNotes[index]}`} animated paused={paused}/><figcaption><span>{s.forms[index]}</span><button className="motion-button" onClick={() => setPaused(!paused)} aria-pressed={paused}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? s.play : s.pause}</button></figcaption></figure><p className="art-description">{s.formNotes[index]}</p></div>
      <div className="reading-copy"><p className="eyebrow"><span className="accent-dot"/> {s.chapter} {String(ch.number).padStart(2, '0')} {s.chapterUnit} / {t.filters[ch.theme]}</p><h1 id="reader-title" tabIndex="-1">{ch.title[locale]}</h1>{locale !== 'en' && <p className="chapter-original" lang="en">{ch.title.en}</p>}<p className="reading-summary">{ch.summary[locale]}</p>
        <section className="reflection"><h2>{s.reflection}</h2><p>{ch.note[locale]}</p></section>
        {ch.id === 'aesthetics' && <section className="dimension-guide" aria-labelledby="dimensions-title">
          <h2 id="dimensions-title">{t.dimensions}</h2>
          <p className="dimension-intro">{t.dimensionIntro}</p>
          <p className="dimension-source">{t.dimensionSource}</p>
          <dl>{DIMENSIONS.map((dimension, i) => <div className="dimension-entry" key={dimension.id}>
            <dt><span className="dimension-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span>{t.dimensionNames[i]}{locale !== 'en' && <small lang="en">{UI_COPY.en.dimensionNames[i]}</small>}</span></dt>
            <dd><p>{dimension.description[locale]}</p><p className="dimension-example"><span>{t.dimensionExample}</span>{dimension.example[locale]}</p></dd>
          </div>)}</dl>
        </section>}
        <section className="reading-takeaways"><h2>{t.keyTakeaway}</h2><ol>{ch.takeaway[locale].map((item, i) => <li key={i}><span>{String(i + 1).padStart(2, '0')}</span><p>{item}</p></li>)}</ol></section>
        <div className="distillation"><p>{ch.quote[locale]}</p><span>{s.distilled}</span></div>
        <button className={`read-button ${read ? 'is-read' : ''}`} aria-pressed={read} onClick={() => toggleRead(ch.id)}><span aria-hidden="true">{read ? '✓' : '+'}</span> {read ? t.markUnread : t.markRead}</button>
      </div>
    </article>
    <nav className="reading-pagination" aria-label={s.notes}>
      <div className="reading-pagination__inner">
        {index > 0 ? <a className="pagination-previous" href={`#chapter/${CHAPTERS[index - 1].id}`}><span>← {t.previous}</span><strong>{CHAPTERS[index - 1].title[locale]}</strong></a> : <a className="pagination-previous" href="#gallery"><span>← {s.back}</span><strong>{s.collection}</strong></a>}
        <a className="pagination-home" href="#gallery"><span>{s.gallery}</span><b>{String(ch.number).padStart(2, '0')} / 10</b></a>
        {index < 9 ? <a className="pagination-next" href={`#chapter/${CHAPTERS[index + 1].id}`}><span>{t.next} →</span><strong>{CHAPTERS[index + 1].title[locale]}</strong></a> : <a className="pagination-next" href="#gallery"><span>{s.back} →</span><strong>{s.ending}</strong></a>}
      </div>
    </nav>
  </>;
}
