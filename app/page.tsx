import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { experience, journals, profile } from "@/lib/content";

const indexItems = [
  {
    n: "01",
    href: "/about",
    title: "关于我",
    desc: "金融数学学生与 AI 工具实践者"
  },
  {
    n: "02",
    href: "/experience",
    title: "实习经历",
    desc: "中信证券 · 飞鹰计划到管培生"
  },
  {
    n: "03",
    href: "/journal",
    title: "实习日志",
    desc: "17 个工作日 · 3 篇周志 · 持续补充"
  },
  {
    n: "04",
    href: "/skills",
    title: "技能能力",
    desc: "金融 · 数据 · AI · 软技能"
  },
  {
    n: "05",
    href: "/awards",
    title: "荣誉活动",
    desc: "奖学金 · 双创 · 合唱团 · 辩论主持"
  },
  {
    n: "06",
    href: "/contact",
    title: "联系我",
    desc: "email · GitHub · AI 王星皓"
  }
];

const records = [
  {
    title: "研报横向对比框架",
    meta: "4 份研报 · 1 张表",
    desc: "消费互联网、AI 算力、稀土、SaaS 的核心逻辑与风险，放在同一张框架里对比。",
    tag: "研究"
  },
  {
    title: "TWAP 拆单策略模拟",
    meta: "100 万 · 5 笔订单",
    desc: "与 AI Agent 协作设计时间加权平均价格策略，在模拟环境完成调试与执行。",
    tag: "量化"
  },
  {
    title: "AI 投研工作流",
    meta: "大模型 · Agent · Skill",
    desc: "用 AI 拆研报、提取数据、交叉验证，再把结论交回给自己的判断。",
    tag: "AI"
  }
];

export default function HomePage() {
  const recordedDays = journals.filter((j) => j.type === "daily").length;
  const progress = Math.round((recordedDays / 25) * 100);

  return (
    <>
      <section className="v3-hero">
        <div className="container v3-hero-grid">
          <Reveal className="v3-hero-copy">
            <div className="v3-kicker">SWUFE · 金融数学 · EST. 2026</div>
            <h1 className="v3-hero-title">王星皓</h1>
            <div className="v3-hero-rule" aria-hidden="true">
              <span />
            </div>
            <p className="v3-hero-poem">
              一名金融数学学生，
              <br />
              正在把每天的市场观察，
              <br />
              变成可迭代的判断力。
            </p>
            <div className="v3-hero-actions">
              <Link href="/experience" className="v3-link">
                实习经历
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/journal" className="v3-link">
                实习日志
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="v3-hero-data">
              25 工作日 · 5 周志 · 2 段实习 · AI 贯穿其中
            </div>
          </Reveal>
          <Reveal delay={0.15} className="v3-identity-wrap">
            <div className="v3-identity">
              <div className="v3-identity-top">
                <span>XINGHAO WANG</span>
                <span>SWUFE · 2026</span>
              </div>
              <div className="v3-identity-code">XH / 001</div>
              <div className="v3-identity-latin">王星皓</div>
              <div className="v3-identity-rule" aria-hidden="true" />
              <div className="v3-identity-foot">
                <span>金融数学 · 大二</span>
                <span>中信证券 · 实习中</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="v3-section">
        <div className="container">
          <Reveal>
            <div className="v3-manifesto">
              <div className="v3-manifesto-num">01</div>
              <p className="v3-manifesto-text">
                我不把 AI 当工具，<em>我把它当同事</em>；
                <br />
                也不把金融当课本，<em>我把它当每天要面对的市场</em>。
              </p>
              <p className="v3-manifesto-sub">
                在金融的确定性里练习不确定性，用 AI 处理信息，用自己处理判断。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="v3-section">
        <div className="container">
          <Reveal>
            <div className="v3-index">
              {indexItems.map((item) => (
                <Link key={item.n} href={item.href} className="v3-index-row">
                  <span className="v3-index-num">{item.n}</span>
                  <span className="v3-index-title">{item.title}</span>
                  <span className="v3-index-desc">{item.desc}</span>
                  <ArrowUpRight className="v3-index-arrow" size={20} />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="v3-section">
        <div className="container">
          <Reveal>
            <div className="v3-data-head">
              <span>02 / 实习纪要</span>
              <span>中信证券 · 2026.07.13 — 08.14</span>
            </div>
            <div className="v3-stage-row">
              <span>飞鹰计划实习生</span>
              <span>市场拓展部管培生</span>
              <span>{experience.length} 段实习阶段</span>
            </div>
            <div className="v3-records">
              {records.map((record, index) => (
                <article key={record.title} className="v3-record">
                  <div className="v3-record-meta">
                    <span>REC. 0{index + 1}</span>
                    <span>{record.tag}</span>
                  </div>
                  <h3 className="v3-record-title">{record.title}</h3>
                  <p className="v3-record-desc">{record.desc}</p>
                  <div className="v3-record-foot">
                    <span>{record.meta}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="v3-progress">
              <div className="v3-progress-head">
                <span>日志记录</span>
                <span>
                  {recordedDays} / 25 工作日 · {progress}%
                </span>
              </div>
              <div className="v3-progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="v3-progress-note">剩余工作日日志会持续补充</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="v3-cta">
        <div className="container">
          <Reveal>
            <span className="v3-cta-num">06 / 联系</span>
            <h2 className="v3-cta-title">想认识一个每天在进步的人？</h2>
            <a className="v3-cta-mail" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={22} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
