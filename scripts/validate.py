import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TYPES = {'contrasts-with', 'supports', 'informs', 'can-produce'}

def validate(data):
    assert isinstance(data, dict) and isinstance(data.get('version'), str), 'Missing collection version'
    records = data.get('concepts')
    assert isinstance(records, list) and records, 'Empty collection'
    ids = [r.get('id') for r in records]
    assert all(isinstance(i, str) and re.fullmatch(r'[a-z][a-z0-9-]*', i) for i in ids), 'Invalid IDs'
    assert len(ids) == len(set(ids)), 'Duplicate IDs'
    for r in records:
        for field in ['label', 'sense', 'definition', 'recognition', 'limits']:
            assert isinstance(r.get(field), str) and r[field].strip(), f'Missing {field}'
        for field in ['aliases', 'examples', 'counterexamples', 'contexts']:
            assert isinstance(r.get(field), list), f'Invalid {field}'
            assert all(isinstance(x, str) and x.strip() for x in r[field]), f'Invalid {field} item'
        assert r['examples'] and r['counterexamples'] and r['contexts'], 'Missing application information'
        assert r.get('status') in {'draft', 'reviewed', 'contested'}, 'Invalid status'
        assert isinstance(r.get('provenance'), dict) and r['provenance'].get('kind') and r['provenance'].get('review'), 'Missing provenance'
        assert isinstance(r.get('relations'), list), 'Invalid relations'
        for edge in r['relations']:
            assert edge.get('target') in ids and edge['target'] != r['id'], 'Invalid relation target'
            assert edge.get('type') in TYPES, 'Unknown relation type'
            assert isinstance(edge.get('note'), str) and edge['note'].strip(), 'Missing relation explanation'
    return data

if __name__ == '__main__':
    data = validate(json.loads((ROOT / 'data/concepts.json').read_text()))
    print(f"Validated {len(data['concepts'])} sense records")
