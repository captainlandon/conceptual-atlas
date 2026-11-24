import copy
import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("validate", ROOT / "scripts/validate.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class CollectionTests(unittest.TestCase):
    def test_collection_and_rejection_controls(self):
        original = json.loads((ROOT / "data/concepts.json").read_text())
        module.validate(original)
        for change in (lambda c: c["concepts"].append(copy.deepcopy(c["concepts"][0])),
                       lambda c: c["concepts"][0].update(provenance={}),
                       lambda c: c["concepts"][0]["relations"].append({"type": "supports", "target": "missing", "note": "x"}),
                       lambda c: c["concepts"][0]["relations"].append({"type": "supports", "target": original["concepts"][0]["id"], "note": ""})):
            candidate = copy.deepcopy(original)
            change(candidate)
            with self.assertRaises(ValueError):
                module.validate(candidate)
