# Offline editorial suggestion review

scripts/review_suggestions.py accepts at most 20 candidate relationships against existing stable sense IDs. For each suggestion provide source_id, target_id, relation, note, context, counterexample and evidence {source,edition,location,license,attribution,modifications,review_status,quote,source_text}. These are draft suggestions, never canonical records. Missing provenance, unknown senses/relations and unmatched quotations remain visible problems. A nonempty license field is not permission or completed license review.

```sh
python scripts/review_suggestions.py suggestions.json > review-queue.json
python scripts/validate.py
python -m unittest discover -s tests
python scripts/build.py
```

The CLI writes only to stdout; redirect output deliberately. It does not call a model, import dictionaries, alter meanings, assign a universal hierarchy or accept its own suggestions. Review conceptual support, context, rights and counterexamples before manually changing data/concepts.json. Preserve disputed alternatives and record ID migrations. Canonical edits require the existing editorial review and rebuild process.

The existing CI referenced missing validator/builder files. This change supplies integrity validation, unit tests and a build wrapper for the current React reader. npm ci uses the new committed lockfile; the build embeds generated JS/CSS into dist/atlas-offline.html, a single local HTML file with no required hosted assets, backend or AI service. This generated edition is committed with source; ordinary Vite assets are intermediate build files. CI rebuilds and checks the committed offline edition for drift.

Validation: five Python tests (including collection rejection controls), collection integrity, TypeScript/Vite build and offline asset-embedding checks passed locally. Browser, accessibility and physical print checks remain outstanding due browser launch restrictions. Conceptual correctness, educational efficacy and external source review are not established by these checks. See docs/AI_CHANGE_EVIDENCE.md.
