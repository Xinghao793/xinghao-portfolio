import json
import os
import re

SRC = os.environ.get(
    "SRC_DIR",
    r"C:\Users\LENOVO\Documents\Codex\xinghao-portfolio\work\journals-md",
)
OUT = os.environ.get(
    "OUT_FILE",
    r"C:\Users\LENOVO\Documents\Codex\xinghao-portfolio\content\journals.json",
)


def parse_frontmatter(text):
    fm = {}
    rest = text
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            for line in parts[1].strip().splitlines():
                if ":" in line:
                    key, value = line.split(":", 1)
                    fm[key.strip()] = value.strip().strip('"')
            rest = parts[2].strip()
    return fm, rest


def detect_tags(text, typ):
    tags = []
    if typ == "weekly":
        tags.append("周志")
    if "大盘" in text or "板块" in text:
        tags.append("市场复盘")
    if "CATS" in text or "TWAP" in text or "策略" in text:
        tags.append("量化交易")
    if "路演" in text:
        tags.append("路演")
    if "研报" in text or "报告" in text:
        tags.append("研报")
    if "AI" in text or "agent" in text.lower():
        tags.append("AI 协作")
    if "晨会" in text:
        tags.append("晨会")
    if not tags:
        tags.append("实习日常")
    seen = []
    for t in tags:
        if t not in seen:
            seen.append(t)
    return seen[:4]


def pick_summary(paragraphs):
    heading = re.compile(r"^(王星皓|组长王星皓|第\d+组|第一组|一、|二、|三、|本周|今天)")
    for p in paragraphs:
        if len(p) < 30 or heading.match(p):
            continue
        return p[:110] + "…"
    return paragraphs[0][:110] + "…" if paragraphs else ""


entries = []
for fname in sorted(os.listdir(SRC)):
    if not fname.endswith(".md"):
        continue
    with open(os.path.join(SRC, fname), encoding="utf-8") as f:
        text = f.read()
    fm, body = parse_frontmatter(text)
    paragraphs = [p.strip() for p in body.split("\n\n") if p.strip()]
    date = fm.get("date", fname.replace(".md", ""))
    typ = fm.get("type", "daily")
    entry = {
        "id": f"{date}-{typ}",
        "date": date,
        "type": typ,
        "title": fm.get("title", date),
        "tags": detect_tags(body, typ),
        "summary": pick_summary(paragraphs),
        "paragraphs": paragraphs
    }
    entries.append(entry)

entries.sort(key=lambda e: (e["date"], 0 if e["type"] == "daily" else 1))

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print("entries:", len(entries))
for e in entries:
    print(e["id"], e["tags"])
