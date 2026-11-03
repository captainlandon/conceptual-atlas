# Conceptual Atlas

A cognitive map of meanings, distinctions, relationships, and context, intended to help people better understand and navigate reality and lived experience.

Originator: Anier Landon Woodyard. Working title. Version 0.1.0 pilot.

## Overview

The Conceptual Atlas is an interactive, browser-native exploration of sense-level concepts, their nuanced distinctions, and their systemic relationships.

### Core Features

- **Interactive Neighborhood Map**: Visualizes directional and typed conceptual relationships (e.g., `contrasts-with`, `supports`, `informs`, `can-produce`) with clickable navigation.
- **Deep Concept Records**: Detailed sense-level entries containing Definitions, Recognition criteria, Examples, Counterexamples, Contextual dependencies, and Limits.
- **Comparative Analysis**: Side-by-side comparison mode contrasting any two concepts with automatic detection of direct explanatory relations.
- **Guided Context Exercise**: An interactive analytical scenario examining the utterance "Fine." through the distinct lenses of Ambiguity, Vagueness, Uncertainty, and Context.
- **Self-Contained & Offline-Ready**: Full offline readiness with no external telemetry, server-side data extraction, or network dependencies.
- **Print Edition**: Dedicated printable collection format adhering to clear typographic standards for paper or PDF export.

## Development

Built with React, TypeScript, Vite, and Tailwind CSS.

```sh
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm run build
```

## Data Collection

Canonical sense records live in `data/concepts.json`. Each record contains stable IDs, definitions, recognition criteria, examples, counterexamples, contexts, limits, provenance records, and typed relationship pointers.

## Rights

No public reuse license has been selected. Repository visibility and software/content licensing are separate decisions. Do not infer open-source status from public availability.
