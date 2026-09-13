import React from 'react';
import { CHAPTERS, FILTERS } from '../content';
import { Artwork } from './Artwork';

export function Gallery({ paused, setPaused, locale, t, s, readIds, query, setQuery, filter, setFilter }) {
  const normalized = query.trim().toLocaleLowerCase();
  const visible = CHAPTERS.filter(ch => (filter === 'all' || ch.theme === filter) && [ch.title[locale], ch.summary[locale], ch.note[locale], ...ch.takeaway[locale]].join(' ').toLocaleLowerCase().includes(normalized));
  const reset = () => { setQuery(''); setFilter('all'); };
  return <section className="gallery" id="gallery" aria-labelledby="gallery-title">
    <div className="gallery-heading"><div><p className="eyebrow">THE COLLECTION / {s.gallery}</p><h2 id="gallery-title">{s.collection}</h2></div><p>{s.collectionIntro}</p></div>
    <div className="gallery-tools"><div className="filters" role="group" aria-label={t.filterLabel}>{FILTERS.map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f === 'all' ? t.all : t.filters[f]}</button>)}</div><label className="search"><span aria-hidden="true">⌕</span><span className="sr-only">{t.searchLabel}</span><input type="search" placeholder={t.searchLabel} value={query} onChange={e => setQuery(e.target.value)}/></label></div>
    <div className="results-line"><button className="motion-button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? '▷' : 'Ⅱ'} {paused ? s.play : s.pause}</button><span aria-live="polite">{String(visible.length).padStart(2, '0')} / 10 — {t.resultCount}</span>{(query || filter !== 'all') && <button onClick={reset}>{t.resetFilters} ×</button>}</div>
    {visible.length ? <ol className="art-gallery">{visible.map(ch => <li className="gallery-item" key={ch.id}>
      <a href={`#chapter/${ch.id}`} className="chapter-link" aria-label={`${ch.number}. ${ch.title[locale]}`}>
        <div className="gallery-art"><span className="art-index">{String(ch.number).padStart(2, '0')}</span><Artwork locale={locale} animated paused={paused} kind={ch.id} label={`${s.artwork}: ${s.forms[ch.number - 1]}`}/><span className="art-open" aria-hidden="true">↗</span></div>
        <div className="card-meta"><span>{s.forms[ch.number - 1]}</span><span>{readIds.includes(ch.id) ? `✓ ${s.read}` : s.unread}</span></div>
        <h3>{ch.title[locale]}</h3><p className="card-summary">{ch.summary[locale]}</p>
      </a>
    </li>)}</ol> : <div className="empty-state" role="status"><span aria-hidden="true">∅</span><h3>{t.noResultsTitle}</h3><p>{t.noResultsBody}</p><button className="begin-link" onClick={reset}>{t.resetFilters} ↗</button></div>}
  </section>;
}
