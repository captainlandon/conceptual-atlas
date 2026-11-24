"""Build the current reader and embed its assets into one offline HTML edition."""
import re
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
subprocess.run(["npm", "run", "build"], cwd=root, check=True)
dist = root / "dist"
html = (dist / "index.html").read_text()


def local_asset(url):
    path = (dist / url.lstrip("./")).resolve()
    if not path.is_relative_to(dist.resolve()):
        raise ValueError("Build asset escaped dist")
    return path.read_text()


html = re.sub(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*></script>',
              lambda m: '<script type="module">' + local_asset(m[1]).replace('</script', '<\\/script') + '</script>', html)
html = re.sub(r'<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>',
              lambda m: '<style>' + local_asset(m[1]).replace('</style', '<\\/style') + '</style>', html)
if re.search(r'<script\b[^>]*\bsrc=|<link\b[^>]*rel="(?:stylesheet|modulepreload)"', html):
    raise ValueError("Offline edition still requires external build assets")
(dist / "atlas-offline.html").write_text(html)
print("Generated dist/atlas-offline.html; no network or AI service is required.")
