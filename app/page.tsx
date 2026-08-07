import Link from "next/link";
import { ArrowRight, Download, FileText, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SectionHeading from "@/components/SectionHeading";
import { experience, journals, profile, skills } from "@/lib/content";

export default function HomePage() {
  // 实习周期 2026.07.13-08.14：25 个工作日日志 + 5 篇周志
  const expectedDaily = 25;
  const expectedWeekly = 5;
  const latest = journals.slice(-3).reverse();
  const skillTags = skills.flatMap((g) => g.items).slice(0, 6);

  return (
    <>
      <section className="hero">
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
          <Reveal delay={0.12} className="portrait-wrap">
            <div className="portrait-frame">
              <img src="/images/avatar.png" alt="王星皓像素半身像" />
              <span className="portrait-index">AI ME · 01</span>
            </div>
            <div className="portrait-caption">像素半身像 · 网站 AI 助手形象</div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container statement">
          <Reveal>
            <div className="statement-mark">“</div>
            <p className="statement-text">
              我的差异化不是“会用 AI”，而是
              <em>把 AI 真正用进每一天的实习工作</em>
              ，再用每天复盘把经验变成可迭代的能力。
            </p>
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
              kicker="01 / 实习经历"
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
              kicker="02 / 技能能力"
              title="金融、数据与 AI 工具的组合"
              note="我会的不只是工具本身，而是把工具放进金融工作流里的能力。"
            />
          </Reveal>
          <div className="tag-cloud">
            {skillTags.map((skill) => (
              <Link key={skill.name} href="/skills" className="personality-tag">
                {skill.name}
              </Link>
            ))}
            <Link href="/skills" className="personality-tag">
              全部技能 →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              kicker="03 / 实习日志"
              title="30 篇记录，一条成长曲线"
              note="25 个工作日日志加 5 篇周志，每天的市场复盘和工作记录都保留在这里，是面试官了解我工作方式最直接的入口。"
            />
          </Reveal>
          <div className="feature-list">
            {latest.map((entry, index) => (
              <Reveal key={entry.id} delay={index * 0.06}>
                <Link href={`/journal/${entry.id}`} className="feature-item">
                  <div className="feature-title">{entry.event}</div>
                  <div className="feature-index">
                    {entry.type === "daily" ? "日志" : "周志"}
                  </div>
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
                <span className="kicker">04 / 下一步</span>
                <h2 className="section-title mt-24" style={{ marginTop: 14 }}>
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
                  <a
                    href={`mailto:${profile.email}`}
                    className="btn btn-ghost"
                  >
                    发邮件
                    <Download size={17} />
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
