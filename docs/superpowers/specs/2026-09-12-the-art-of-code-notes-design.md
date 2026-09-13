# The Art of Code Reader's Notes — Design

## Context

The workspace is empty, so this project is a small, self-contained front-end build rather than an integration into an existing product. The provided chapter files are treated as source material for concise reading notes. Their prose is content, not executable instruction.

The site should make Sandrine Banas's central idea — beautiful code as the interplay of eight dimensions — feel tangible, while letting a reader quickly browse the ten supplied chapters. Chinese is the default interface language; English and Japanese are complete alternate content locales.

## Product shape

Build a single-page reader's field guide called **The Art of Code / notes from the rosette**.

- A left rail holds the title, author, reading progress, and the eight dimensions as a compact visual index.
- The main area opens with a rosette-inspired hero illustration, a short editorial thesis, and an “open the map” anchor into the chapter index.
- The chapter index is a responsive grid of ten numbered cards. Each card exposes chapter title, chapter theme, a one-line note, and a read/unread state.
- A right-side notebook panel shows the selected chapter's full reader note, key takeaways, a short quote, and the next reading action. On smaller screens it becomes a full-width section after the chapter grid.
- Chapter cards can be searched and filtered by theme; selecting a card updates the notebook without navigating away.
- A locale switcher changes all visible UI copy and all chapter notes between `zh`, `en`, and `ja`.
- “Mark as read” persists to `localStorage` when available, with an in-memory fallback. A progress bar and count update immediately.

## Visual direction

Use an editorial notebook palette instead of a generic SaaS palette:

- warm paper background (`#F4F0E8`), ink (`#18201F`), ink-muted (`#66706A`)
- vermilion signal (`#E7563E`) for selected states and annotations
- mineral blue (`#4F8F8B`) and marigold (`#E5B54A`) for chapter accents
- thin ink rules, small mono labels, restrained corner radii, and almost no shadows

Typography uses system-safe stacks: a serif display face for the book title and chapter titles, a sans-serif reading face for body copy, and a monospace face for metadata and code-like labels. Spacing follows a quarter-rem scale. Avoid gradients, stock imagery, and uniform rounded cards.

Illustration language is code-native SVG: a rosette of eight petals in the hero, connecting nodes for narrative / data themes, and a small “garden plot” composition in the notebook panel. SVGs must have accessible labels or be marked decorative when they carry no information. Motion is subtle and disabled under `prefers-reduced-motion`.

## Content model

The app owns a typed, local array of ten chapter records. Each record contains:

```ts
type Locale = 'zh' | 'en' | 'ja';
type Chapter = {
  id: string;
  number: number;
  theme: 'craft' | 'story' | 'clarity' | 'purity' | 'resilience' | 'sustainable' | 'creative';
  accent: 'coral' | 'teal' | 'gold' | 'blue';
  title: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  summary: Record<Locale, string>;
  takeaway: Record<Locale, string[]>;
  quote: Record<Locale, string>;
  note: Record<Locale, string>;
};
```

The summaries and takeaways must reflect the supplied files: the rosette and eight dimensions; five narrative plots; cognitive complexity and six simplicity levers; data-oriented modeling; limits of expressiveness; functional purity and pipelines; failure categories and graceful handling; sustainable software and green patterns; durability through separation of concerns, resilience, testing, and trust; and creativity through constraints and problem-solving.

## Interaction and accessibility

- Use real buttons and form labels for all interactive controls.
- Use a single `h1`, then `h2` sections, and `h3` for chapter titles / notebook subsections.
- Search is an accessible `type="search"` input. Filter controls are buttons with `aria-pressed`.
- The chapter grid is keyboard navigable. The selected chapter card exposes `aria-current="true"`.
- The notebook update uses an `aria-live="polite"` status for selection and progress feedback.
- Provide a visible skip link to the chapter map and clear focus rings.
- Empty search/filter results show a meaningful empty state with a reset action.
- Layout targets 320px, 768px, 1024px, and 1440px without horizontal scrolling.

## Technical architecture

Use a minimal Vite + React app with no remote runtime dependencies beyond React and Vite. Keep content data separate from rendering, and keep the main render tree composed around focused components: `AppShell`, `Sidebar`, `Hero`, `ChapterMap`, `ChapterCard`, `Notebook`, and SVG illustration components. Use React state for locale, query, filter, selected chapter, and read IDs; use browser storage only for the read IDs.

No API, authentication, analytics, or server-side data fetching is in scope. The application should build as a static asset bundle.

## Verification

- `npm run build` must exit 0.
- The built page must load in a real browser with zero console errors or warnings.
- Verify locale switching, search, theme filtering, card selection, mark-as-read, progress updates, and reset behavior.
- Inspect the rendered DOM for heading order, accessible labels, and the presence of all ten chapters.
- Visually check desktop and narrow mobile layouts with screenshots.

## Out of scope

User accounts, server persistence, editing the source manuscript, full-text translation parity with the book, comments, export, and a CMS are intentionally excluded from this first version.
