"""Integrity checks for the pilot contract; semantic review remains an editorial task."""
import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
TYPES = {'contrasts-with', 'supports', 'informs', 'can-produce'}
STATUSES = {'draft', 'reviewed', 'contested'}

def require(ok, message):
    if not ok:
        raise ValueError(message)

def nonempty(value):
    return isinstance(value, str) and bool(value.strip())

def language(value):
    # Structural subset only; not a language registry or full BCP 47 validator.
    return isinstance(value, str) and bool(re.fullmatch(r'(?:[A-Za-z]{2,8}|x)(?:-[A-Za-z0-9]{1,8})*', value))

def refs(value, sources, allow_empty=False):
    require(isinstance(value, list) and (allow_empty or bool(value)), 'Missing source references')
    require(all(isinstance(x, str) and x in sources for x in value), 'Unknown source reference')

def validate(data):
    require(isinstance(data, dict) and nonempty(data.get('version')) and data.get('schema_version') == '0.2', 'Invalid collection version')
    records = data.get('concepts')
    require(isinstance(records, list) and bool(records) and all(isinstance(r, dict) for r in records), 'Empty or invalid collection')
    ids = [r.get('id') for r in records]
    require(all(isinstance(i, str) and re.fullmatch(r'[a-z][a-z0-9-]*', i) for i in ids), 'Invalid IDs')
    require(len(ids) == len(set(ids)), 'Duplicate IDs')
    source_rows = data.get('sources')
    require(isinstance(source_rows, list) and all(isinstance(s, dict) for s in source_rows), 'Invalid source registry')
    source_ids = [s.get('id') for s in source_rows]
    require(all(nonempty(i) for i in source_ids) and len(source_ids) == len(set(source_ids)), 'Duplicate or invalid source IDs')
    sources = set(source_ids)
    for source in source_rows:
        for field in ['title', 'authors', 'location', 'accessed', 'rights', 'review_note']:
            require(nonempty(source.get(field)), 'Missing source metadata: '+field)
        require(urlparse(source.get('url', '')).scheme in {'http', 'https'}, 'Invalid source URL')
    expression_ids = set()
    for r in records:
        for field in ['label', 'sense', 'definition', 'recognition', 'limits', 'scheme']:
            require(nonempty(r.get(field)), 'Missing '+field)
        require(language(r.get('language')), 'Invalid record language')
        for field in ['aliases', 'examples', 'counterexamples', 'contexts']:
            require(isinstance(r.get(field), list) and all(nonempty(x) for x in r[field]), 'Invalid '+field)
        require(bool(r['examples']) and bool(r['counterexamples']) and bool(r['contexts']), 'Missing application information')
        require(r.get('status') in STATUSES, 'Invalid status')
        require(isinstance(r.get('provenance'), dict) and nonempty(r['provenance'].get('kind')) and nonempty(r['provenance'].get('review')), 'Missing provenance')
        refs(r.get('source_refs'), sources)
        expressions = r.get('expressions')
        require(isinstance(expressions, list) and bool(expressions), 'Missing expressions')
        local_ids = []
        for expression in expressions:
            require(isinstance(expression, dict), 'Invalid expression')
            eid = expression.get('id')
            require(nonempty(eid) and eid not in expression_ids, 'Duplicate expression ID')
            expression_ids.add(eid)
            local_ids.append(eid)
            require(language(expression.get('language')), 'Invalid expression language')
            require(expression.get('direction') in {'ltr', 'rtl', 'auto'}, 'Invalid text direction')
            require(isinstance(expression.get('script'), str) and re.fullmatch(r'[A-Z][a-z]{3}', expression['script']), 'Invalid script code')
            for field in ['text', 'usage', 'cultural_context']:
                require(nonempty(expression.get(field)), 'Missing expression '+field)
            require(expression.get('status') in STATUSES, 'Invalid expression status')
            refs(expression.get('source_refs'), sources)
        require(r.get('preferred_expression') in local_ids, 'Missing preferred expression')
        preferred = next(e for e in expressions if e['id'] == r['preferred_expression'])
        require(preferred['language'] == r['language'] and preferred['text'] == r['label'], 'Preferred expression does not match display label')
        require(isinstance(r.get('relations'), list), 'Invalid relations')
        for edge in r['relations']:
            require(isinstance(edge, dict) and edge.get('target') in ids and edge['target'] != r['id'], 'Invalid relation target')
            require(edge.get('type') in TYPES, 'Unknown relation type')
            require(nonempty(edge.get('note')) and nonempty(edge.get('scope')) and edge.get('status') in {'proposed', 'reviewed', 'contested'}, 'Missing relation explanation or status')
    mappings = data.get('mappings')
    require(isinstance(mappings, list), 'Invalid mappings')
    mapping_ids = set()
    for m in mappings:
        require(isinstance(m, dict) and nonempty(m.get('id')) and m['id'] not in mapping_ids, 'Invalid mapping ID')
        mapping_ids.add(m['id'])
        require(m.get('source') in ids and m.get('target') in ids and m['source'] != m['target'], 'Invalid mapping target')
        require(m.get('type') in {'exact', 'close', 'broader', 'narrower', 'related'}, 'Invalid mapping type')
        require(nonempty(m.get('rationale')) and m.get('status') in STATUSES, 'Missing mapping rationale or status')
        refs(m.get('source_refs'), sources)
        require(m['type'] != 'exact' or (m['status'] == 'reviewed' and nonempty(m.get('reviewer'))), 'Exact equivalence requires explicit review')
    return data

def validate_scenarios(rows, data):
    require(isinstance(rows, list) and bool(rows), 'Missing scenarios')
    ids = set()
    concepts = {r['id'] for r in data['concepts']}
    sources = {s['id'] for s in data['sources']}
    for row in rows:
        require(isinstance(row, dict) and nonempty(row.get('id')) and row['id'] not in ids, 'Duplicate scenario ID')
        ids.add(row['id'])
        for field in ['title', 'expression', 'observation', 'question']:
            require(nonempty(row.get(field)), 'Missing scenario '+field)
        require(isinstance(row.get('analyses'), list) and bool(row['analyses']), 'Missing analyses')
        for a in row['analyses']:
            require(a.get('concept') in concepts and nonempty(a.get('explanation')), 'Invalid scenario reference')
        refs(row.get('sources'), sources)
    return rows

if __name__ == '__main__':
    data = validate(json.loads((ROOT / 'data/concepts.json').read_text(encoding='utf-8')))
    scenarios = validate_scenarios(json.loads((ROOT / 'data/scenarios.json').read_text(encoding='utf-8')), data)
    print(f"Validated {len(data['concepts'])} senses, {len(data['sources'])} sources, {len(scenarios)} scenarios")
