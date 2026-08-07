import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { experience } from "@/lib/content";

export default function ExperiencePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="kicker">EXPERIENCE / 实习经历</span>
            <h1 className="page-title">从中信证券开始，把金融认知变成自己的判断力。</h1>
            <p className="page-intro">
              2026 年暑假，我先后以飞鹰计划实习生和市场拓展部管培生身份进入中信证券实习。从晨会、路演到 CATS
              交易系统和行业研报，每一个阶段都有具体输出。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="timeline">
            {experience.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <article className="timeline-item">
                  <div className="tl-stage">{item.stage}</div>
                  <div className="tl-row">
                    <h2 className="tl-role">{item.role}</h2>
                    <span className="tl-period">{item.period}</span>
                  </div>
                  <div className="tl-company">{item.company}</div>
                  <p className="tl-summary">{item.summary}</p>
                  <div className="highlight-list">
                    {item.highlights.map((h) => (
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
          <div className="mt-64 note-block">
            实习中的具体工作日志与每日复盘都已保留在
            <Link href="/journal" className="text-link" style={{ margin: "0 6px" }}>
              实习日志
            </Link>
            页面，可以按日期和时间线查看。
          </div>
          <div className="mt-40">
            <Link href="/skills" className="text-link">
              查看这段经历锻炼出的技能
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
