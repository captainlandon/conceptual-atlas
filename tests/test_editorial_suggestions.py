import copy
import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("review", Path(__file__).resolve().parents[1] / "scripts/review_suggestions.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class EditorialReviewTests(unittest.TestCase):
    def setUp(self):
        self.collection = {"concepts": [{"id": "a"}, {"id": "b"}]}
        self.proposal = {"source_id": "a", "target_id": "b", "relation": "informs", "note": "Proposed connection",
                         "context": "One task", "counterexample": "Different tasks may differ", "status": "reviewed",
                         "evidence": {**{k: "pending review" for k in ("source", "edition", "location", "license", "attribution", "modifications", "review_status")},
                                      "quote": "An exact synthetic excerpt.", "source_text": "An exact synthetic excerpt."}}

    def test_proposals_never_mutate_canonical_records_or_become_reviewed(self):
        before = copy.deepcopy(self.collection)
        r = module.review_suggestions(self.collection, [self.proposal])[0]
        self.assertEqual(self.collection, before)
        self.assertEqual(r["status"], "draft")
        self.assertTrue(r["human_review_required"])
        self.assertEqual(r["problems"], [])

    def test_unknown_senses_and_fabricated_quotes_fail(self):
        self.proposal["source_id"] = "new-universal-category"
        self.proposal["evidence"]["quote"] = "Fabricated quotation is invalid."
        r = module.review_suggestions(self.collection, [self.proposal])[0]
        self.assertIn("UNKNOWN_SENSE_ID", r["problems"])
        self.assertIn("QUOTE_NOT_MATCHED", r["problems"])

    def test_missing_rights_and_counterexample_are_visible(self):
        del self.proposal["counterexample"]
        del self.proposal["evidence"]["license"]
        r = module.review_suggestions(self.collection, [self.proposal])[0]
        self.assertIn("MISSING_COUNTEREXAMPLE", r["problems"])
        self.assertIn("MISSING_EVIDENCE_LICENSE", r["problems"])

    def test_unhashable_fields_are_flagged(self):
        for key, problem in (("source_id", "UNKNOWN_SENSE_ID"), ("target_id", "UNKNOWN_SENSE_ID"), ("relation", "UNKNOWN_RELATION")):
            for value in ([], {}, None, 42):
                proposal = {**self.proposal, key: value}
                self.assertIn(problem, module.review_suggestions(self.collection, [proposal])[0]["problems"])

    def test_bounds_and_malformed_records(self):
        with self.assertRaises(ValueError):
            module.review_suggestions(self.collection, [self.proposal] * 21)
        self.assertTrue(module.review_suggestions(self.collection, [None])[0]["problems"])


if __name__ == "__main__":
    unittest.main()
