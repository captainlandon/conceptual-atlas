# Conceptual Atlas

A cognitive map of meanings, distinctions, relationships, and context, intended to help people better understand and navigate reality and lived experience.

Originator: Anier Landon Woodyard. Working title. Version 0.2.0 pilot.

## Overview

The Conceptual Atlas is an interactive, browser-native exploration of sense-level concepts, their nuanced distinctions, and their systemic relationships.

### Core Features

- **Interactive Neighborhood Map**: Visualizes directional and typed conceptual relationships (e.g., `contrasts-with`, `supports`, `informs`, `can-produce`) with clickable navigation.
- **Deep Concept Records**: Detailed sense-level entries containing Definitions, Recognition criteria, Examples, Counterexamples, Contextual dependencies, and Limits.
- **Comparative Analysis**: Side-by-side comparison mode contrasting any two concepts with automatic detection of direct explanatory relations.
- **Guided Context Exercise**: An interactive analytical scenario covering five situations, including ambiguity and vagueness together, with multiple selectable lenses and worked explanations.
- **Offline edition**: `dist/offline.html` embeds the application code and styles; open it directly from disk without a server. External source links are optional reading.
- **Print Edition**: Dedicated printable collection format adhering to clear typographic standards for paper or PDF export.

## Development

Built with React, TypeScript, Vite, and Tailwind CSS.

```sh
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm test
npm run build
```

## Data Collection

Canonical sense records live in `data/concepts.json`. Each record contains stable IDs, definitions, recognition criteria, examples, counterexamples, contexts, limits, provenance records, and typed relationship pointers.

## Rights

No public reuse license has been selected. Repository visibility and software/content licensing are separate decisions. Do not infer open-source status from public availability.

## Use the built editions

Open `dist/index.html` or `dist/offline.html` directly in a modern browser, or host the contents of `dist/` as static files. Both interactive files embed their scripts and styles. Open `dist/print.html` for the complete script-free reading/print edition, including all five worked situations and source details. The sources themselves remain external references. No service worker, account, installation or network request is needed for the local core.

## Mission and review status

The long-term mission spans humanity’s documented conceptual resources across languages and cultures. The present content pilot contains five English senses. Language-specific expressions and explicit mappings prepare for reviewed multilingual contributions; no foreign-language coverage or automatic equivalence is claimed.

The entries have AI-assisted source comparisons and original explanatory material. They remain drafts pending independent specialist review and user evaluation.

See [charter](docs/CHARTER.md), [multilingual contract](docs/MULTILINGUAL.md), [source review](docs/SOURCE_REVIEW.md), [acceptance](docs/PILOT_ACCEPTANCE.md), and [verification](docs/VERIFICATION.md).

For browser regression checks, install Chromium with `npx playwright install chromium` and run `npm run test:browser` after a build. Review status and limits are recorded in docs/VERIFICATION.md.
