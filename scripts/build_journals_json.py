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

EVENT_MAP = {
    "2026-07-13-daily": {
        "event": "第一天入职：券商晨会与职业认知",
        "summary": "首次参加券商晨会、部门复盘会议，完成入职手续，听总经理分享从业经历。",
    },
    "2026-07-14-daily": {
        "event": "券商业务与公募基金学习",
        "summary": "系统学习券商业务板块、资产配置与公募基金知识，梳理金融术语框架。",
    },
    "2026-07-15-daily": {
        "event": "第一次股票开户与模拟交易",
        "summary": "完成股票开户，开始 100 万虚拟资产模拟交易，理解投资决策流程。",
    },
    "2026-07-16-daily": {
        "event": "参访中信期货与基金路演准备",
        "summary": "参访中信期货了解期货业务，准备中欧医疗创新 A 基金路演。",
    },
    "2026-07-17-daily": {
        "event": "第一次基金产品路演",
        "summary": "完成中欧医疗创新 A 基金路演，学习基金定投与资产配置方法。",
    },
    "2026-07-17-weekly": {
        "event": "第一周周志：从旁观者到参与者",
        "summary": "完成晨会、模拟交易与基金路演，建立券商业务认知框架。",
    },
    "2026-07-20-daily": {
        "event": "私募基金与资产配置学习",
        "summary": "学习私募基金产品与资产配置组合规划，为辩论赛和路演做准备。",
    },
    "2026-07-21-daily": {
        "event": "资产配置路演准备",
        "summary": "围绕资产配置路演搜集资料，梳理投资组合与风险控制思路。",
    },
    "2026-07-22-daily": {
        "event": "辩论赛主持与职业分享",
        "summary": "主持 AI 是否取代人类等金融辩论赛，听总经理分享职业发展路径。",
    },
    "2026-07-23-daily": {
        "event": "路演预演与私人银行参访",
        "summary": "完成资产配置路演预演，学习商务礼仪并参访中信银行私人银行部。",
    },
    "2026-07-24-daily": {
        "event": "资产配置路演与结业",
        "summary": "完成资产配置路演展示，参加飞鹰计划结业仪式。",
    },
    "2026-07-24-weekly": {
        "event": "第二周周志：建立资产配置思维",
        "summary": "完成私募基金学习、辩论主持与资产配置路演，建立整体配置思维。",
    },
    "2026-07-27-daily": {
        "event": "新一周实习与行业分析准备",
        "summary": "参加市场回顾晨会，明确行业分析报告要求，开启第二阶段实习。",
    },
    "2026-07-28-daily": {
        "event": "CATS 交易系统入门",
        "summary": "学习 CATS 交易系统界面与业务流程，同步整理行业分析资料。",
    },
    "2026-07-29-daily": {
        "event": "TWAP 策略设计与行业路演",
        "summary": "与 AI Agent 协作设计 TWAP 策略并模拟运行，完成行业分析路演。",
    },
    "2026-07-30-daily": {
        "event": "CATS 研究汇报与策略梳理",
        "summary": "向导师汇报 CATS 系统研究，重新梳理交易策略并给同事讲解。",
    },
    "2026-07-31-daily": {
        "event": "一周复盘与投资心理学习",
        "summary": "整理行业报告，复盘一周板块轮动，通过德州扑克学习投资心理学。",
    },
    "2026-07-31-weekly": {
        "event": "第三周周志：动手比光听有用",
        "summary": "完成 CATS 策略、行业路演与每日复盘，从复述信息转向独立判断。",
    },
    "2026-08-05-daily": {
        "event": "四份研报横向对比总结",
        "summary": "阅读消费互联网、AI 算力、稀土、SaaS 研报，搭建横向对比框架。",
    },
    "2026-08-06-daily": {
        "event": "AI 辅助研报分析与市场复盘",
        "summary": "用 AI 工具梳理研报逻辑并交叉验证，完成煤炭与半导体板块复盘。",
    },
}


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
    summary = pick_summary(paragraphs)
    event = EVENT_MAP.get(f"{date}-{typ}", {})
    entry = {
        "id": f"{date}-{typ}",
        "date": date,
        "type": typ,
        "title": fm.get("title", date),
        "event": event.get("event", fm.get("title", date)),
        "eventSummary": event.get("summary", summary),
        "tags": detect_tags(body, typ),
        "summary": summary,
        "paragraphs": paragraphs
    }
    entries.append(entry)

entries.sort(key=lambda e: (e["date"], 0 if e["type"] == "daily" else 1))

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print("entries:", len(entries))
for e in entries:
    print(e["id"], e["tags"])
