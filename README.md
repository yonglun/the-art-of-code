# The Art of Code — Reading Notes

[English](README.md) · [中文](README.zh-CN.md) · [日本語](README.ja.md)

A trilingual reading room for Sandrine Banas’s *The Art of Code*. The project turns ten supplied chapter notes into a quiet editorial website: typographic reading spreads, responsive navigation, animated monochrome artwork, and a first-chapter guide to the eight dimensions of beautiful code.

**Live site:** [yonglun.me/the-art-of-code](https://yonglun.me/the-art-of-code)

## Screenshots

### Homepage

![The Art of Code homepage](docs/assets/homepage.png)

### Chapter one

![The Art of Code chapter one](docs/assets/chapter-one.png)

## Highlights

- Chinese, English, and Japanese interface and chapter notes; English is the first-time default.
- Ten reading spreads with summaries, reflections, takeaways, and editorial distillations.
- Chapter one explains storytelling, simplicity, clarity of intent, expressiveness, purity, sustainability, durability, and creativity with practical examples.
- Original Canvas artwork for every chapter. The homepage and chapter one share an abstract Möbius ribbon; the other chapters use distinct parametric compositions.
- Visible-only animation with pause/resume controls, reduced-motion support, and adaptive thread density on small screens.
- Fixed previous / next / gallery navigation on reading pages, including mobile safe-area spacing.
- Search, theme filters, chapter map, keyboard focus management, and local reading-progress persistence.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To build the production bundle:

```sh
npm run build
npm run preview
```

The app is a static Vite build. Chapter URLs use fragments such as `#chapter/aesthetics`, so no server-side route rewrite is required.

## Tests

Run the Node regression tests:

```sh
node --test tests/*.test.js
```

The checks cover artwork geometry and motion, small-canvas density, the eight-dimension dataset in all three languages, and the English default locale.

## Project structure

```text
src/
├── App.jsx                    # application shell, routing, locale and progress state
├── content.js                 # trilingual chapter notes and dimension guide
├── siteCopy.js                # localized interface and artwork copy
├── components/
│   ├── Artwork.jsx            # Canvas lifecycle, visibility and motion controls
│   ├── Gallery.jsx            # chapter map, search and filters
│   └── Reader.jsx             # chapter reading spread and eight-dimension guide
└── art/
    ├── drawings.js            # chapter artwork dispatch and compositions
    └── mobius.js              # abstract homepage / chapter-one ribbon
docs/assets/                   # screenshots used in this README
tests/                         # Node regression tests
```

## Content and attribution

The reading notes are based on the ten chapter files supplied for this project. The site is an independent reading companion, not a reproduction of the book. Editorial summaries, reflections, examples, and distilled lines are marked as interpretations where relevant. Book information: [The Art of Code on Manning](https://www.manning.com/books/the-art-of-code).

This project is licensed under the [MIT License](LICENSE).
