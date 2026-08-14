import os
import re
import zipfile
from xml.etree import ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
LOG_DIR = os.environ.get("LOG_DIR", r"C:\Users\LENOVO\Desktop\日志")
OUT_DIR = os.environ.get(
    "OUT_DIR", r"C:\Users\LENOVO\Documents\Codex\xinghao-portfolio\work\journals-md"
)


def extract_text(path):
    with zipfile.ZipFile(path) as z:
        xml = z.read("word/document.xml")
    root = ET.fromstring(xml)
    lines = []
    for p in root.iter(W + "p"):
        texts = [t.text or "" for t in p.iter(W + "t")]
        line = "".join(texts).strip()
        if line:
            lines.append(line)
    return lines


def classify(fname):
    if "实习总结" in fname:
        return "2026-08-14", "summary"
    typ = "weekly" if "周志" in fname else "daily"
    m = re.search(r"(\d+)月(\d+)日", fname) or re.search(r"(\d+)\.(\d+)", fname)
    if m:
        return f"2026-{int(m.group(1)):02d}-{int(m.group(2)):02d}", typ
    if "第一周" in fname or ("实习周志" in fname and "第二" not in fname and "第三" not in fname):
        return "2026-07-17", "weekly"
    if "第二周" in fname:
        return "2026-07-24", "weekly"
    if "第三周" in fname:
        return "2026-07-31", "weekly"
    if "第四周" in fname:
        return "2026-08-07", "weekly"
    if "第五周" in fname:
        return "2026-08-14", "weekly"
    return None, typ


skip_patterns = ["副本"]
os.makedirs(OUT_DIR, exist_ok=True)
results = []

for fname in sorted(os.listdir(LOG_DIR)):
    if not fname.endswith(".docx"):
        continue
    if any(s in fname for s in skip_patterns):
        continue
    if fname in ("日志.docx", "日志合集.docx"):
        continue
    path = os.path.join(LOG_DIR, fname)
    lines = extract_text(path)
    date, typ = classify(fname)
    if not date:
        print("SKIP_NO_DATE:", fname)
        continue
    title = fname.replace(".docx", "").replace("&", "与").replace("王星皓", "").strip()
    body = "\n\n".join(lines)
    md = f"""---
title: "{title}"
date: "{date}"
type: "{typ}"
source: "{fname}"
---

{body}
"""
    out = os.path.join(OUT_DIR, f"{date}-{typ}.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write(md)
    results.append((date, typ, fname, len(lines)))

print("CREATED:", len(results))
for r in sorted(results):
    print(r)
