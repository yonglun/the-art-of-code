# Möbius Cover Implementation Plan

**Goal:** Replace the homepage and chapter-one diagrams with the user-approved abstract, text-free ink-line Möbius ribbon.

**Architecture:** Add a separate `mobius` renderer to the existing Canvas dispatch. Reuse the visible-only animation, reduced-motion and pause lifecycle. Map chapter-one `aesthetics` to the ribbon too, per the user’s follow-up. Remove model labels while preserving all source-grounded chapter prose.

**Tech Stack:** Existing React, Canvas 2D, Vite; Node built-in test runner. No dependencies.

## Global constraints

- No visible wording, model labels, figure number or caption in the homepage artwork panel.
- Retain a keyboard-accessible icon-only pause button with localized accessible name.
- Fine monochrome linework, sculptural twist, negative space, slow but noticeable motion.
- Other chapter art and all reading content remain unchanged. No Git repository is available; no commit.

## Task 1 — Independent artwork

- [x] Add `tests/cover-art.test.js`: Canvas command recorder checks a distinct mobius drawing, finite in-bounds coordinates across 0/1/12/60 seconds, deterministic replay, and time-dependent change without text drawing commands.
- [x] Run `node --test tests/cover-art.test.js`; confirm the distinct-artwork assertion fails before implementation.
- [x] Add `src/art/mobius.js`, exporting `drawMobius(ctx, time)` in the existing 600×600 logical coordinates. Project a half-twisted strip, sort surface strips by depth, fill with paper tones and render fine longitudinal threads.
- [x] Register `mobius: drawMobius` in `src/art/drawings.js`. Run the same tests to green.

## Task 2 — Homepage integration

- [x] Replace the cover figure’s topline, default artwork and caption with `<Artwork kind="mobius" label={s.coverArtwork} animated paused={paused} />` and an icon-only button using the existing pause setter.
- [x] Add localized `coverArtwork` descriptions to `src/siteCopy.js` and targeted `.cover-art--abstract` positioning rules to `src/styles.css`.
- [x] Run `npm run build` and inspect browser screenshots at desktop and 320px. Check all three languages, absence of cover text, updated first-chapter art and absent model labels, animation/pause and console errors.
- [x] Record verification and update README’s cover description.
