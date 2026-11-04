import copy
import json
import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from validate import ROOT, validate, validate_scenarios

class IntegrityTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / 'data/concepts.json').read_text())
    def test_collection(self):
        validate(self.data)
    def test_dangling_reference_rejected(self):
        self.data['concepts'][0]['relations'][0]['target'] = 'missing-01'
        with self.assertRaises(ValueError): validate(self.data)
    def test_duplicate_sense_rejected(self):
        self.data['concepts'].append(copy.deepcopy(self.data['concepts'][0]))
        with self.assertRaises(ValueError): validate(self.data)
    def test_unexplained_relation_rejected(self):
        self.data['concepts'][0]['relations'][0]['note'] = ''
        with self.assertRaises(ValueError): validate(self.data)
    def test_provenance_required(self):
        del self.data['concepts'][0]['provenance']
        with self.assertRaises(ValueError): validate(self.data)
    def test_unknown_source_rejected(self):
        self.data['concepts'][0]['source_refs'] = ['missing']
        with self.assertRaises(ValueError): validate(self.data)
    def test_arabic_expression_accepted(self):
        e = copy.deepcopy(self.data['concepts'][0]['expressions'][0])
        e.update(id='test-ar', language='ar', text='اختبار', script='Arab', direction='rtl', usage='Test fixture only', cultural_context='Synthetic test; no equivalence assertion')
        self.data['concepts'][0]['expressions'].append(e)
        validate(self.data)
    def test_language_required(self):
        del self.data['concepts'][0]['expressions'][0]['language']
        with self.assertRaises(ValueError): validate(self.data)
    def test_equivalence_requires_review(self):
        self.data['mappings'] = [dict(id='m1',source='ambiguity-01',target='vagueness-01',type='exact',status='draft',rationale='Synthetic invalid mapping',source_refs=['sep-ambiguity'])]
        with self.assertRaises(ValueError): validate(self.data)
    def test_partial_mapping_preserves_two_records(self):
        self.data['mappings'] = [dict(id='m1',source='ambiguity-01',target='vagueness-01',type='related',status='draft',rationale='Synthetic integrity fixture, not a published mapping',source_refs=['sep-ambiguity'])]
        validate(self.data)
        self.assertEqual(len(self.data['concepts']), 5)
    def test_duplicate_expression_rejected(self):
        self.data['concepts'][0]['expressions'].append(copy.deepcopy(self.data['concepts'][0]['expressions'][0]))
        with self.assertRaises(ValueError): validate(self.data)
    def test_scenario_target_integrity(self):
        rows=json.loads((ROOT/'data/scenarios.json').read_text())
        rows[0]['analyses'][0]['concept']='missing'
        with self.assertRaises(ValueError): validate_scenarios(rows,self.data)
