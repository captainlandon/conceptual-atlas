import html
import json
from pathlib import Path
from validate import ROOT, validate

def build():
    data = validate(json.loads((ROOT / 'data/concepts.json').read_text()))
    # Escape script terminators so editorial content cannot escape its data block.
    payload = json.dumps(data, ensure_ascii=False).replace('<', '\\u003c').replace('&', '\\u0026')
    template = (ROOT / 'src/template.html').read_text()
    printable = []
    for r in data['concepts']:
        e = html.escape
        sections = [('Definition', [r['definition']]), ('Recognize it', [r['recognition']]), ('Examples', r['examples']), ('Counterexamples', r['counterexamples']), ('Context', r['contexts']), ('Limits', [r['limits']])]
        body = ''.join('<h3>'+title+'</h3>'+''.join('<p>'+e(s)+'</p>' for s in items) for title,items in sections)
        links = ''.join('<li>'+e(x['type'])+' → '+e(x['target'])+': '+e(x['note'])+'</li>' for x in r['relations'])
        printable.append('<article id="print-'+e(r['id'])+'"><p class="eyebrow">'+e(r['id'])+' · '+e(r['status'])+'</p><h2>'+e(r['label'])+'</h2>'+body+'<h3>Relationships</h3><ul>'+links+'</ul><p class="provenance">Original editorial draft. AI-assisted. External source review pending.</p></article>')
    text = template.replace('__DATA__', payload).replace('__PRINT__', ''.join(printable)).replace('__VERSION__', data['version'])
    (ROOT / 'dist').mkdir(exist_ok=True)
    (ROOT / 'dist/index.html').write_text(text)
    # Full text stays readable even with JavaScript disabled.
    (ROOT / 'dist/print.html').write_text(text.replace('<body>', '<body class="print-edition">'))
    print('Built interactive/offline and printable editions')

if __name__ == '__main__':
    build()
