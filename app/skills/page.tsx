import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/lib/content";

function levelClass(level: string): string {
  if (level === "了解") return "l1";
  if (level === "掌握") return "l2";
  return "l3";
}

export default function SkillsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="kicker">SKILLS / 技能能力</span>
            <h1 className="page-title">金融打底，AI 提效，复盘加速。</h1>
            <p className="page-intro">
              技能分四个维度：金融与市场、量化与数据、AI 工具、软技能。熟练度标记为“熟练 / 掌握 / 了解”，不做虚假百分比。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          {skills.map((group, index) => (
            <Reveal key={group.group} delay={index * 0.05}>
              <div className="skill-group">
                <div>
                  <div className="kicker">0{index + 1}</div>
                  <h2 className="skill-group-title">{group.group}</h2>
                  <p className="skill-group-desc">{group.desc}</p>
                </div>
                <div className="skill-items">
                  {group.items.map((item) => (
                    <div key={item.name} className="skill-item">
                      <span className="skill-name">{item.name}</span>
                      <span className={`skill-level ${levelClass(item.level)}`}>{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
