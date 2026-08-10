import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SwufeField from "@/components/SwufeField";
import { experience, journals, profile } from "@/lib/content";

const indexItems = [
  { n: "01", href: "/about", title: "关于我", desc: "金融数学学生与 AI 工具实践者" },
  { n: "02", href: "/experience", title: "实习经历", desc: "中信证券 · 飞鹰计划到管培生" },
  { n: "03", href: "/journal", title: "实习日志", desc: "17 个工作日 · 3 篇周志 · 持续补充" },
  { n: "04", href: "/skills", title: "技能能力", desc: "金融 · 数据 · AI · 软技能" },
  { n: "05", href: "/awards", title: "荣誉活动", desc: "奖学金 · 双创 · 合唱团 · 辩论主持" },
  { n: "06", href: "/contact", title: "联系我", desc: "email · GitHub · AI 王星皓" }
];

const records = [
  {
    title: "研报横向对比框架",
    meta: "REC. 01 / 研究",
    desc: "消费互联网、AI 算力、稀土、SaaS 的核心逻辑与风险，放在同一张框架里对比。"
  },
  {
    title: "TWAP 拆单策略模拟",
    meta: "REC. 02 / 量化",
    desc: "与 AI Agent 协作设计时间加权平均价格策略，在模拟环境完成调试与执行。"
  },
  {
    title: "AI 投研工作流",
    meta: "REC. 03 / AI",
    desc: "用 AI 拆研报、提取数据、交叉验证，再把结论交回给自己的判断。"
  }
];

export default function HomePage() {
  const recordedDays = journals.filter((j) => j.type === "daily").length;
  const progress = Math.round((recordedDays / 25) * 100);

  return (
    <>
      <section className="h4-hero">
        <SwufeField />
        <div className="container h4-center">
          <Reveal>
            <span className="h4-eyebrow">PORTFOLIO — 2026 · 金融数学 · SWUFE</span>
            <h1 className="h4-name">王星皓</h1>
            <div className="h4-rule" aria-hidden="true" />
            <p className="h4-sub">把 AI 用进金融实习的人 · 每天复盘 · 持续迭代</p>
            <div className="h4-info">
              <span>西南财经大学</span>
              <i aria-hidden="true" />
              <span>金融数学 · 大二</span>
            </div>
            <div className="h4-actions">
              <Link href="/experience" className="btn btn-primary">
                查看实习经历
                <ArrowRight size={17} />
              </Link>
              <Link href="/journal" className="btn btn-ghost">
                阅读实习日志
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="h4-band">
        <div className="container">
          <Reveal>
            <p className="h4-manifesto">
              我不把 AI 当工具，我把它当同事；也不把金融当课本，
              <br className="h4-br" />
              我把它当每天要面对的市场。
            </p>
            <p className="h4-manifesto-sub">
              在金融的确定性里练习不确定性，用 AI 处理信息，用自己处理判断。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="h4-section">
        <div className="container">
          <Reveal>
            <div className="h4-section-title">
              <span>目录 / INDEX</span>
              <span>06 PAGES</span>
            </div>
            <div className="h4-index-grid">
              {indexItems.map((item) => (
                <Link key={item.n} href={item.href} className="h4-index-cell">
                  <span className="h4-index-num">{item.n}</span>
                  <span className="h4-index-title">{item.title}</span>
                  <span className="h4-index-desc">{item.desc}</span>
                  <ArrowUpRight className="h4-index-arrow" size={18} />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="h4-section">
        <div className="container">
          <Reveal>
            <div className="h4-section-title">
              <span>实习纪要 / EXPERIENCE</span>
              <span>2026.07.13 — 08.14</span>
            </div>
            <div className="h4-stage-line">
              <span>飞鹰计划实习生</span>
              <ArrowRight size={15} />
              <span>市场拓展部管培生</span>
              <span className="h4-stage-extra">{experience.length} 段实习阶段</span>
            </div>
            <div className="h4-records">
              {records.map((record) => (
                <article key={record.title} className="h4-record">
                  <span className="h4-record-meta">{record.meta}</span>
                  <h3 className="h4-record-title">{record.title}</h3>
                  <p className="h4-record-desc">{record.desc}</p>
                </article>
              ))}
            </div>
            <div className="h4-progress">
              <div className="h4-progress-head">
                <span>日志记录</span>
                <span>
                  {recordedDays} / 25 工作日 · {progress}%
                </span>
              </div>
              <div className="h4-progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="h4-progress-note">剩余工作日日志会持续补充</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="h4-cta">
        <div className="container h4-center">
          <Reveal>
            <span className="h4-cta-num">06 / 联系</span>
            <h2 className="h4-cta-title">想认识一个每天在进步的人？</h2>
            <a className="h4-cta-mail" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={20} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
