"""Package Vite output as portable HTML and generate a script-free print edition."""
import html
import json
import re
import shutil
from pathlib import Path
from validate import ROOT, validate, validate_scenarios

def e(value):
    return html.escape(str(value), quote=True)

def printable(data, scenarios):
    sources={s['id']:s for s in data['sources']}
    def notes(ids):
        return '<ul>'+''.join('<li>'+e(sources[i]['authors'])+', <cite>'+e(sources[i]['title'])+'</cite>. '+e(sources[i]['location'])+'. <a href="'+e(sources[i]['url'])+'">'+e(sources[i]['url'])+'</a></li>' for i in ids)+'</ul>'
    articles=[]
    for r in data['concepts']:
        sections=[('Definition',[r['definition']]),('Recognize it',[r['recognition']]),('Examples',r['examples']),('Counterexamples',r['counterexamples']),('Context',r['contexts']),('Limits',[r['limits']])]
        body=''.join('<h3>'+title+'</h3>'+''.join('<p>'+e(s)+'</p>' for s in rows) for title,rows in sections)
        expressions=''.join('<p><bdi lang="'+e(x['language'])+'" dir="'+e(x['direction'])+'">'+e(x['text'])+'</bdi> ['+e(x['language'])+']: '+e(x['usage'])+'. '+e(x['cultural_context'])+'</p>' for x in r['expressions'])
        links=''.join('<li>'+e(rel['type'])+' → <a href="#'+e(rel['target'])+'">'+e(rel['target'])+'</a>: '+e(rel['note'])+' ('+e(rel['status'])+')</li>' for rel in r['relations'])
        articles.append('<article id="'+e(r['id'])+'"><p class="meta">'+e(r['id'])+' · '+e(r['status'])+'</p><h2>'+e(r['label'])+'</h2>'+body+'<h3>Expressions</h3>'+expressions+'<h3>Relationships</h3><ul>'+links+'</ul><h3>Sources</h3>'+notes(r['source_refs'])+'<p class="meta">'+e(r['provenance']['review'])+'</p></article>')
    for s in scenarios:
        analyses=''.join('<h3>'+e(a['concept'])+'</h3><p>'+e(a['explanation'])+'</p>' for a in s['analyses'])
        articles.append('<article id="scenario-'+e(s['id'])+'"><p class="meta">Worked situation</p><h2>'+e(s['title'])+'</h2><blockquote>'+e(s['expression'])+'</blockquote><h3>What is given</h3><p>'+e(s['observation'])+'</p>'+analyses+'<h3>Reflect</h3><p>'+e(s['question'])+'</p><h3>Sources</h3>'+notes(s['sources'])+'</article>')
    toc='<ul>'+''.join('<li><a href="#'+e(r['id'])+'">'+e(r['label'])+' · '+e(r['id'])+'</a></li>' for r in data['concepts'])+'</ul>'
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Conceptual Atlas · Print v'+e(data['version'])+'</title><style>body{max-width:760px;margin:40px auto;padding:0 24px;font:16px/1.5 Georgia,serif;color:#183b38;background:#fffdf7}h1,h2{font-weight:400}h1{font-size:36px}h2{font-size:28px}h3{font:700 13px/1.4 system-ui;margin-top:22px;break-after:avoid}article{border-top:1px solid #ccd4c8;margin-top:32px;padding-top:20px}a{color:inherit;overflow-wrap:anywhere}.meta{font:12px/1.5 system-ui;color:#526058}blockquote{margin:20px 0;font-size:22px}li{margin-bottom:10px}@media print{body{margin:0;padding:0;max-width:none;background:white;color:black;font-size:10pt;line-height:1.32}p{margin:6px 0}h3{margin:12px 0 4px}h2{margin:8px 0 14px}li{margin-bottom:5px}.meta{font-size:8pt}article{break-before:page;border:0;padding:0;margin:0}h2{font-size:24pt}li,p{orphans:3;widows:3}.screen{display:none}@page{size:A4;margin:18mm}}</style></head><body><header><p class="meta">Anier Landon Woodyard · Working pilot · v'+e(data['version'])+'</p><h1>Conceptual Atlas</h1><p>Five connected meanings and five worked situations. An English pilot with a multilingual data foundation.</p><p>Entries were compared with the cited sources using AI assistance. Independent specialist review and educational evaluation remain pending.</p><p class="screen">Use your browser’s Print command for paper or PDF. The complete text works without JavaScript or internet. Source URLs support later investigation; they are not needed to read this edition.</p><h2>Entry routes</h2>'+toc+'</header>'+''.join(articles)+'</body></html>'

def build():
    data=validate(json.loads((ROOT/'data/concepts.json').read_text(encoding='utf-8')))
    scenarios=validate_scenarios(json.loads((ROOT/'data/scenarios.json').read_text(encoding='utf-8')),data)
    out=ROOT/'dist'
    source=(out/'index.html').read_text(encoding='utf-8')
    def asset(path):
        require_path=(out/path.lstrip('/')).resolve()
        if not require_path.is_relative_to(out.resolve()):
            raise ValueError('Asset path escapes build directory')
        return require_path.read_text(encoding='utf-8')
    def script(match):
        code=asset(match.group(1))
        if re.search(r'\bimport\s*\(',code):
            raise ValueError('Dynamic imports require explicit offline packaging')
        code=re.sub(r'</script',r'<\\/script',code,flags=re.I)
        return '<script type="module">'+code+'</script>'
    source=re.sub(r'<script\b[^>]*src="([^"]+)"[^>]*>\s*</script>',script,source)
    source=re.sub(r'<link\b(?=[^>]*rel="stylesheet")(?=[^>]*href="([^"]+)")[^>]*>',lambda m:'<style>'+asset(m.group(1)).replace('</style','<\\/style')+'</style>',source)
    source=re.sub(r'<link\b[^>]*rel="modulepreload"[^>]*>','',source)
    (out/'index.html').write_text(source,encoding='utf-8')
    (out/'offline.html').write_text(source,encoding='utf-8')
    (out/'print.html').write_text(printable(data,scenarios),encoding='utf-8')
    if (out/'assets').exists():
        shutil.rmtree(out/'assets')
    print('Packaged self-contained web/offline HTML and script-free print edition')

if __name__=='__main__':
    build()
