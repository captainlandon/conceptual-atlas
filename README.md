# Conceptual Atlas

A cognitive map of meanings, distinctions, relationships, and context, intended to help people better understand and navigate reality and lived experience.

Originator: Anier Landon Woodyard. Working title. Version 0.1.0 pilot.

## Open the atlas

Open `dist/index.html` in a modern browser. It works from a folder or USB without internet, installation, an account, or a server. Explore five concepts, compare them, investigate a supplied scenario, and print the complete pilot. The same file can later be hosted on the web.

## Maintain the collection

Requires Python 3.10+ with its standard library only:

```sh
python3 scripts/validate.py
python3 -m unittest discover -s tests
python3 scripts/build.py
```

Edit `data/concepts.json`, then rebuild. Both the interactive atlas and `dist/print.html` derive from that collection. The generated HTML embeds its data and assets, so opening it over `file://` does not require fetch, a CDN, or a service worker. The print edition is also readable without JavaScript.

## First milestone

Five draft sense-level entries: distinction, ambiguity, vagueness, uncertainty, context. Typed, explained relationships; examples and counterexamples; editorial status and provenance; search and comparison; a guided context exercise; a printable edition.

This is a working foundation, not a complete dictionary or a validated educational intervention. Entries are original editorial drafts awaiting independent source review. No dictionary database has been imported. Search is literal; the context exercise does not automatically interpret arbitrary user text.

## Development home

Repository: https://github.com/captainlandon/conceptual-atlas

Clone the repository, edit the collection or interface source, run the checks above, and commit the generated editions alongside their source. GitHub is the development home, not a runtime requirement. The repository is currently public; no public reuse license has been selected.

See [architecture](docs/ARCHITECTURE.md), [roadmap](docs/ROADMAP.md), [editorial rules](docs/EDITORIAL.md), [evaluation](docs/EVALUATION.md), and [preservation](docs/PRESERVATION.md).

## Rights

No public reuse license has been selected. Repository visibility and software/content licensing are separate decisions. Do not infer open-source status from public availability. Third-party source licenses must be recorded before ingestion. The founding dossier is maintained separately and has not been altered by this pilot.
