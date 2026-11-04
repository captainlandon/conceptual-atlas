# One collection, three editions

The canonical source is UTF-8 JSON with stable sense-level IDs, not a rendered page or an AI conversation. A word can label several sense records; a sense may carry several word labels. Each relationship has a type and explanatory note. These five concepts are a pilot neighborhood, not five universal top-level categories.

1. Digital: generated static HTML with local search, selectable relationships, comparison, and guided context exploration. Hosting is optional.
2. Offline: the identical self-contained HTML copied to a computer or removable medium. Electricity and a compatible browser are still required; Wi-Fi, accounts, cloud services, and installation are not.
3. Print: complete readable HTML with page styles, stable IDs, textual cross-references, and relation notes. Browser Print can produce paper or PDF. A professionally typeset book, page index, and downloadable PDF are later publication work.

The builder uses only the Python standard library. Assets are embedded. There is no backend, telemetry, third-party font, AI API, network fetch, or storage of user input. The context mode is a curated exercise, not automated semantic analysis.

## Pilot record contract

`id`, `label`, `aliases`, `sense`, `definition`, `recognition`, `examples`, `counterexamples`, `contexts`, `limits`, `status`, `provenance`, and `relations` are required. Relation objects contain `type`, `target`, and `note`. Allowed initial types: `contrasts-with`, `supports`, `informs`, `can-produce`. These are revisable editorial choices. Proximity on the pilot map carries no quantitative meaning. Every edge is explained in text.

The validator enforces IDs, target integrity, field types, draft status vocabulary, provenance, and relation vocabulary. It does not establish semantic truth. A versioned JSON Schema and interchange adapters can follow after the pilot contract stabilizes.

## Expansion boundaries

Review the sense model before adding a database. Review access and corpus licenses before bulk ingestion. Investigate SKOS export and WordNet/FrameNet mappings without forcing their structures into a universal ontology. Retain contested alternatives and provenance. AI suggestions must remain drafts until editorial review.


## Version 0.2 implementation update

The current online interface uses React, TypeScript, Vite and Tailwind. The standard-library Python validator checks records, source references, multilingual expressions, mappings and scenario targets before compilation. The packaging script inlines Vite’s generated script and stylesheet into the interactive HTML and generates a script-free print edition with the worked situations and source register. Building requires Node and Python; reading the released HTML does not.

`data/scenarios.json` is shared by the interactive walkthrough and print generator. `data/concepts.json` holds the source registry, language-specific expression metadata and explicit mapping assertions. The language interface remains English. Earlier architecture descriptions of the standard-library-only interactive builder are historical; this paragraph describes the current implementation.
