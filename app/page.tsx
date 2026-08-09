import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SectionHeading from "@/components/SectionHeading";
import Terminal from "@/components/Terminal";
import Heatmap from "@/components/Heatmap";
import Ticker from "@/components/Ticker";
import { experience, journals, profile, skills } from "@/lib/content";

export default function HomePage() {
  // 实习周期 2026.07.13-08.14：25 个工作日日志 + 5 篇周志
  const expectedDaily = 25;
  const expectedWeekly = 5;
  const latest = journals.slice(-3).reverse();
  const skillTags = skills.flatMap((g) => g.items).slice(0, 6);

  return (
    <>
      <section className="hero hero-v2">
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <div className="hero-eyebrow">西南财经大学 · 金融数学 · 大二</div>
            <h1 className="hero-title">
              王星皓
              <br />
              <span className="accent-line">把 AI 用进金融实习的人</span>
            </h1>
            <p className="hero-sub">{profile.summary}</p>
            <div className="hero-actions">
              <Link href="/experience" className="btn btn-primary">
                查看实习经历
                <ArrowRight size={17} />
              </Link>
              <Link href="/journal" className="btn btn-ghost">
                阅读实习日志
                <FileText size={17} />
              </Link>
            </div>
            <div className="hero-meta">
              <span>中信证券 · 市场拓展部管培生</span>
              <span>AI Agent · 大模型 · Skill</span>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="hero-tools">
            <Terminal />
            <div className="hero-stamp">30 篇实习日志 → AI 投研终端原型</div>
          </Reveal>
        </div>
      </section>

      <Ticker />

      <section className="signal-band">
        <div className="container signal-grid">
          <Reveal className="signal-copy">
            <span className="kicker on-dark">01 / 定位</span>
            <p className="signal-quote">
              我的差异化不是“会用 AI”，而是
              <em>把 AI 用进每一天的金融实习</em>
              ，再用每天复盘把经验变成可迭代的能力。
            </p>
            <div className="signal-meta">
              金融数学 · 中信证券实习 · 持续迭代中
            </div>
          </Reveal>
          <Reveal delay={0.1} className="signal-heat">
            <div className="heat-head">
              <span>JOURNAL HEATMAP</span>
              <span>07.13 — 08.14</span>
            </div>
            <Heatmap />
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="stat-grid">
              <div className="stat-item">
                <div className="stat-number">
                  <CountUp value={expectedDaily} suffix="天" />
                </div>
                <div className="stat-label">工作日日志</div>
                <div className="stat-note">周一至周五 · 至 8.14</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <CountUp value={expectedWeekly} suffix="篇" />
                </div>
                <div className="stat-label">周度总结</div>
                <div className="stat-note">每周一篇周志</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <CountUp value={experience.length} suffix="段" />
                </div>
                <div className="stat-label">实习阶段</div>
                <div className="stat-note">飞鹰计划 · 管培生</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <CountUp value={5} suffix="+" />
                </div>
                <div className="stat-label">常用 AI 工具类型</div>
                <div className="stat-note">Agent · 大模型 · Skill</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              kicker="02 / 产出物"
              title="没有作品集，就把工作做成作品"
              note="研报对比框架、TWAP 策略模拟、AI 投研工作流，都是实习里真实做过的内容。"
            />
          </Reveal>
          <div className="work-grid">
            <Reveal className="work-item">
              <div className="work-index">01</div>
              <div className="work-visual">
                <div className="mini-table">
                  <div className="mini-table-row head">
                    <span>行业</span>
                    <span>核心逻辑</span>
                    <span>风险</span>
                  </div>
                  <div className="mini-table-row">
                    <span>消费互联网</span>
                    <span>外卖减亏</span>
                    <span>第二曲线</span>
                  </div>
                  <div className="mini-table-row">
                    <span>AI 算力</span>
                    <span>扩产链</span>
                    <span>落地节奏</span>
                  </div>
                  <div className="mini-table-row">
                    <span>稀土</span>
                    <span>预期差</span>
                    <span>价格背离</span>
                  </div>
                </div>
              </div>
              <h3 className="work-title">行业研报横向对比框架</h3>
              <p className="work-desc">
                把 4 份不同行业研报的核心逻辑、催化与风险放到同一张表里对比。
              </p>
            </Reveal>
            <Reveal delay={0.06} className="work-item">
              <div className="work-index">02</div>
              <div className="work-visual">
                <div className="mini-orders">
                  <div className="mini-orders-head">
                    <span>TWAP</span>
                    <span>5 笔订单</span>
                  </div>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="mini-order">
                      <span>订单 0{n}</span>
                      <span className="mini-order-bar">
                        <i style={{ width: `${n * 20}%` }} />
                      </span>
                      <span>完成</span>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="work-title">TWAP 拆单策略模拟</h3>
              <p className="work-desc">
                与 AI Agent 协作完成策略设计，在模拟环境分批执行订单。
              </p>
            </Reveal>
            <Reveal delay={0.12} className="work-item">
              <div className="work-index">03</div>
              <div className="work-visual">
                <div className="mini-term">
                  <div className="mini-term-line">
                    <span>$</span> research.report --industry 4份研报
                  </div>
                  <div className="mini-term-out">&gt; 已生成横向对比框架</div>
                  <div className="mini-term-line">
                    <span>$</span> strategy.twap --volume 100万
                  </div>
                  <div className="mini-term-out">&gt; 模拟执行通过</div>
                  <div className="mini-term-line">
                    <span>$</span> market.review --date 2026.08.06
                  </div>
                </div>
              </div>
              <h3 className="work-title">AI 投研工作流</h3>
              <p className="work-desc">
                用大模型与 Agent 拆研报、提数据、做交叉验证，重要结论人工核实。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              kicker="03 / 实习经历"
              title="从中信证券开始的金融实践"
              note="从两周系统培训，到 CATS 交易系统、TWAP 策略与行业研报，我在真实业务里完成了从输入到输出的转变。"
            />
          </Reveal>
          <div className="timeline">
            {experience.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <article className="timeline-item">
                  <div className="tl-stage">{item.stage}</div>
                  <div className="tl-row">
                    <h3 className="tl-role">{item.role}</h3>
                    <span className="tl-period">{item.period}</span>
                  </div>
                  <div className="tl-company">{item.company}</div>
                  <p className="tl-summary">{item.summary}</p>
                  <div className="highlight-list">
                    {item.highlights.slice(0, 3).map((h) => (
                      <div key={h.title} className="highlight-item">
                        <div className="highlight-title">{h.title}</div>
                        <div className="highlight-detail">{h.detail}</div>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-40">
            <Link href="/experience" className="text-link">
              查看完整实习经历
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              kicker="04 / 实习日志"
              title="30 篇记录，一条成长曲线"
              note="25 个工作日日志加 5 篇周志，每天的市场复盘和工作记录都保留在这里，是面试官了解我工作方式最直接的入口。"
            />
          </Reveal>
          <div className="feature-list">
            {latest.map((entry, index) => (
              <Reveal key={entry.id} delay={index * 0.06}>
                <Link href={`/journal/${entry.id}`} className="feature-item">
                  <div className="feature-title">{entry.event}</div>
                  <div className="feature-file">{entry.title}</div>
                  <div className="feature-desc">{entry.eventSummary}</div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-40">
            <Link href="/journal" className="text-link">
              进入实习日志界面
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="two-col">
              <div>
                <span className="kicker">05 / 下一步</span>
                <h2 className="section-title" style={{ marginTop: 14 }}>
                  想认识一个
                  <br />
                  每天在进步的人？
                </h2>
              </div>
              <div>
                <p className="section-note" style={{ maxWidth: 420 }}>
                  欢迎直接联系我，也可以先和右下角的 AI 王星皓聊几句。这个网站本身也在持续迭代，就像我的成长一样。
                </p>
                <div className="hero-actions">
                  <Link href="/contact" className="btn btn-primary">
                    联系我
                    <Sparkles size={17} />
                  </Link>
                  <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                    发邮件
                    <ArrowRight size={17} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
