# Multilingual contract, version 0.2

A record represents a scoped sense in an identified scheme, not a universal idea defined by its English label. Existing IDs are preserved for continuity. `language` identifies the current explanation language; `label` projects the preferred expression into the existing interface. More than one expression may be documented, with separate IDs, language tags, script codes, direction, usage, cultural context, sources and status.

The preferred expression must match the display language and label. Different senses remain separate even when they share an expression. Source-language explanation and translation are editorial work requiring appropriate expertise; adding a string does not establish conceptual equivalence.

`mappings` holds explicit assertions between sense records: exact, close, broader, narrower or related. Each requires rationale, sources and review status. An exact mapping additionally requires a named reviewer and reviewed status. These are project rules inspired by SKOS mapping distinctions, not a claim that the JSON implements SKOS semantics or full RDF interoperability. Direction matters for broader/narrower mappings. No mapping silently merges records.

The pilot contains no published foreign-language translations or cross-language mappings. The Arabic fixture in the tests checks Unicode, script and right-to-left metadata, not linguistic accuracy. The validator checks a structural subset of language-tag syntax, not registry validity or complete BCP 47 conformance.

## Next content gate

Select one additional language with a qualified collaborator; document a small set of source-language senses; distinguish translation notes from lexical usage; review close/partial correspondences; test right-to-left and mixed-script rendering with actual content and speakers. English labels remain one navigation route rather than the organizing standard for all languages.

Signed languages, audiovisual expressions, dialect coverage, historically situated meanings, community permissions and controlled access require additional media and governance specifications. This text-label foundation does not claim to implement those features yet. Some knowledge may appropriately remain restricted.

Reference: W3C SKOS Reference, sections 5 and 10, https://www.w3.org/TR/skos-reference/ .
