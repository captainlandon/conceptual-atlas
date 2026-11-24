"""Validate an offline editorial review queue. Never writes the canonical collection."""
import json
import sys
from pathlib import Path

RELATIONS = {"contrasts-with", "supports", "informs", "can-produce"}


def review_suggestions(collection, suggestions):
    ids = {c["id"] for c in collection["concepts"]}
    if not isinstance(suggestions, list) or len(suggestions) > 20:
        raise ValueError("Supply at most 20 suggestions per review batch")
    results = []
    for index, proposal in enumerate(suggestions):
        problems = []
        if not isinstance(proposal, dict):
            proposal = {}
        if proposal.get("source_id") not in ids or proposal.get("target_id") not in ids:
            problems.append("UNKNOWN_SENSE_ID")
        if proposal.get("relation") not in RELATIONS:
            problems.append("UNKNOWN_RELATION")
        for key in ("note", "context", "counterexample"):
            if not isinstance(proposal.get(key), str) or not proposal[key].strip():
                problems.append("MISSING_" + key.upper())
        evidence = proposal.get("evidence")
        if not isinstance(evidence, dict):
            evidence = {}
        for key in ("source", "edition", "location", "license", "attribution", "modifications", "review_status"):
            if not isinstance(evidence.get(key), str) or not evidence[key].strip():
                problems.append("MISSING_EVIDENCE_" + key.upper())
        quote, original = evidence.get("quote"), evidence.get("source_text")
        if not isinstance(quote, str) or len(quote.strip()) < 16 or not isinstance(original, str) or quote not in original:
            problems.append("QUOTE_NOT_MATCHED")
        results.append({"review_id": f"suggestion-{index}", "status": "draft",
                        "human_review_required": True, "problems": problems,
                        "proposal": proposal, "limitations": "Exact excerpt matching does not establish a valid conceptual relation or reuse permission."})
    return results


if __name__ == "__main__":
    try:
        if len(sys.argv) != 2:
            raise ValueError("Supply a suggestions JSON path")
        root = Path(__file__).resolve().parents[1]
        collection = json.loads((root / "data/concepts.json").read_text())
        path = Path(sys.argv[1])
        if path.stat().st_size > 200000:
            raise ValueError("Review batch exceeds 200 KB")
        print(json.dumps(review_suggestions(collection, json.loads(path.read_text())), indent=2))
    except (OSError, ValueError, KeyError, TypeError) as exc:
        print(f"Editorial review input rejected: {type(exc).__name__}", file=sys.stderr)
        sys.exit(1)
