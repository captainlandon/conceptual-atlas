"""Check collection integrity, never conceptual truth or educational efficacy."""
import json
from pathlib import Path

RELATIONS = {"contrasts-with", "supports", "informs", "can-produce"}


def validate(collection):
    concepts = collection.get("concepts")
    if not isinstance(concepts, list) or not concepts:
        raise ValueError("A nonempty sense collection is required")
    ids = [c.get("id") for c in concepts]
    if any(not isinstance(i, str) or not i.strip() for i in ids) or len(ids) != len(set(ids)):
        raise ValueError("Sense IDs must be nonempty and unique")
    for c in concepts:
        for k in ("label", "sense", "definition", "recognition", "limits", "status"):
            if not isinstance(c.get(k), str) or not c[k].strip():
                raise ValueError("Missing sense field: " + k)
        if c["status"] not in {"draft", "reviewed", "contested"}:
            raise ValueError("Unknown editorial status")
        for k in ("aliases", "examples", "counterexamples", "contexts"):
            if not isinstance(c.get(k), list) or any(not isinstance(v, str) for v in c[k]):
                raise ValueError("Invalid list: " + k)
        p = c.get("provenance")
        if not isinstance(p, dict) or any(not isinstance(p.get(k), str) or not p[k].strip() for k in ("kind", "originator", "assistance", "review")):
            raise ValueError("Incomplete provenance")
        if not isinstance(c.get("relations"), list):
            raise ValueError("Missing relations")
        for r in c["relations"]:
            if r.get("target") not in ids or r.get("type") not in RELATIONS or not isinstance(r.get("note"), str) or not r["note"].strip():
                raise ValueError("Invalid relationship")


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    validate(json.loads((root / "data/concepts.json").read_text()))
    print("Collection integrity passed. Editorial truth and reuse rights require review.")
