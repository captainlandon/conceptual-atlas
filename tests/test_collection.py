import copy
import json
import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from validate import ROOT, validate

class IntegrityTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / 'data/concepts.json').read_text())
    def test_collection(self):
        validate(self.data)
    def test_dangling_reference_rejected(self):
        self.data['concepts'][0]['relations'][0]['target'] = 'missing-01'
        with self.assertRaises(AssertionError): validate(self.data)
    def test_duplicate_sense_rejected(self):
        self.data['concepts'].append(copy.deepcopy(self.data['concepts'][0]))
        with self.assertRaises(AssertionError): validate(self.data)
    def test_unexplained_relation_rejected(self):
        self.data['concepts'][0]['relations'][0]['note'] = ''
        with self.assertRaises(AssertionError): validate(self.data)
    def test_provenance_required(self):
        del self.data['concepts'][0]['provenance']
        with self.assertRaises(AssertionError): validate(self.data)
