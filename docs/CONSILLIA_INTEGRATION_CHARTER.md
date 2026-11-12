# Conceptual Atlas × Consillia: Integration Charter v0.1

Status: Proposed for review (not an approved merger or deployment)  
Date: 2026-11-12

## Mission
Build one comprehensive, cumulative research and learning initiative mapping reality, human experience, cognition, concepts, language, representation, knowledge, and their interrelationships. Retain semantic reorganization, cross-language comparison, visual concept representation, interdisciplinary synthesis, epistemic critique, educational navigation, and open-ended discovery. No prior dimension is superseded.

## Product responsibilities
- **Conceptual Atlas:** overarching initiative, canonical sense-level concepts and typed relationships, provenance and review workflow, long-term knowledge architecture and visualization.
- **Consillia:** existing AI-assisted cross-disciplinary exploration experience and candidate-connection generation; eventually a reusable discovery module within the Atlas platform.
- **Both:** preserve existing applications and repositories until integration is verified. Do not rename, archive, merge, or deploy without separate approval.

## Existing evidence (repository inspection)
- Atlas: `data/concepts.json` includes stable IDs, senses, definitions, recognition criteria, examples, counterexamples, contexts, limits, relation types, and editorial provenance; the README describes a visual navigator, comparisons, offline use, and print views.
- Consillia: `types.ts` models main/related concepts and natural-language connections; `services/geminiService.ts` generates cross-disciplinary suggestions; `components/KnowledgeGraph.tsx`, `ConceptVisualization.tsx`, `LearningJourney.tsx`, and citation/library/export components support exploration.
- Current implementation status is **source-inspected, not execution-verified**.

## Architecture decision proposal (ADR-001)
**Propose** Atlas as canonical knowledge layer and Consillia as a discovery adapter / exploration mode. Do not treat model-generated relationships as validated facts. Preserve sense-level IDs and typed edges.

## Integration contract v0.1 (proposed)
Input: user expression + language/context + optional sense ID + audience level.
Output: candidate concepts and edges, each with:
- source concept/sense ID (or unresolved reference)
- target label and provisional ID/sense resolution
- relation type (or `proposed-analogy`)
- domain(s) and textual explanation
- evidence reference(s), if verified
- provenance (model/provider/time/prompt version)
- review state: `suggested | needs-review | verified | rejected`
- optional visualization assets and their source metadata

Generated content stays in a proposal queue until a verified reviewer or source-checking process validates it. Do not invent citations or assume cross-domain equivalence.

## Sprint 1: integration-first vertical slice
1. Reproduce both local builds and document current execution status.
2. Audit secrets handling; move privileged model calls off the client before any public deployment.
3. Specify types and adapters from Consillia output to Atlas canonical sense records, without overwriting existing records.
4. Implement a fixture-driven concept (e.g. Freedom) with four interdisciplinary suggestions and typed relations.
5. Display suggested vs verified relations distinctly, with provenance and review controls.
6. Preserve existing navigation, visual exploration, and accessibility; add basic schema and regression tests.

### Sprint 1 acceptance criteria
- Existing builds pass or blockers are documented; no exposed AI credentials.
- Existing Atlas data and Consillia flow remain recoverable.
- One query displays concept, disciplinary connections, explanations, and provenance.
- AI proposals never silently enter verified canonical content.
- Keyboard navigation and readable graph alternatives work.
- Tests cover sense IDs, edge validation, conversion, and review status.

## Scope guardrails
No production changes, merges, data migration, repo deletion, branding changes, or externally published announcements without approval. The Morehouse senior thesis may address a subset of the philosophical framework but does not limit the initiative's scope.

## Open decisions
- Final initiative/public-product brand (Conceptual Atlas, Esperanto, or another name).
- Hosting/security architecture for model calls.
- Canonical source-of-truth and schema migration ownership.
- Citation verification policy and human review roles.
