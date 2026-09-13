# Chapter Illustration System — Design

## Goal

Give each of the ten reader-note chapters its own designed illustration so the chapter map reads as a visual index, while keeping the existing warm paper / ink / vermilion visual language.

## Chosen approach

Use inline React-rendered SVG instead of external bitmap assets. Each chapter receives a stable illustration key and a unique miniature composition inside a shared ChapterIllustration component. SVG keeps the site self-contained, avoids network requests, scales crisply on retina screens, and makes every chapter's motif easy to inspect and maintain.

## Visual grammar

- One thin-line composition per chapter, with a slightly irregular editorial mark rather than a generic icon.
- Neutral paper field, dark ink strokes, and the chapter's existing accent (coral, teal, gold, or blue).
- Small accent-filled nodes / panels provide a visual focal point without turning the cards into noisy posters.
- The same chapter illustration appears at two sizes: a compact artwork area on the chapter card and a larger current-note artwork in the notebook.
- The illustration itself is decorative because the accessible card/button label and chapter text already convey the information. aria-hidden="true" prevents duplicate announcements.

## Chapter motifs

| Chapter | Motif | Visual idea |
| --- | --- | --- |
| 1 | Rosette | Eight orbiting petals with a centered point |
| 2 | Narrative | A path through five plot nodes |
| 3 | Simplicity | A tangled line resolving into six ordered marks |
| 4 | Intent | Raw data blocks transforming into a shaped record |
| 5 | Expressiveness | One language branch resolving into a clear switch |
| 6 | Purity | Input / function / output pipeline with clean arrows |
| 7 | Failure | A cracked boundary with an intentional fallback route |
| 8 | Sustainability | Leaf, energy meter, and a small circular lifecycle |
| 9 | Durability | Layered architecture blocks held by a stable outer frame |
| 10 | Creativity | A constrained square opening into a four-point star |

## Component contract

ChapterIllustration accepts { chapter, size = 'card' }, renders a viewBox="0 0 260 130" SVG, chooses its motif from chapter.illustration, and uses the chapter accent class. The component must render for every chapter key; an explicit fallback motif is allowed only for defensive resilience and must not be used by the supplied ten records.

ChapterCard places the card-sized illustration before the chapter eyebrow. Notebook places the large illustration after its heading and note, before the takeaways. Existing ChapterGlyph remains available only for the small card marker if needed; it is not the primary chapter art anymore.

## Verification

- Build succeeds with npm run build.
- Browser DOM contains ten .chapter-illustration elements in the map and one active illustration in the notebook.
- Searching/filtering preserves the illustration that belongs to each visible chapter.
- Switching to English and Japanese preserves all ten illustrations.
- Browser console has no warnings or errors; the SVGs do not create duplicate IDs or horizontal overflow.
