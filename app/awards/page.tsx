import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { awards } from "@/lib/content";

export default function AwardsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="kicker">AWARDS / 荣誉活动</span>
            <h1 className="page-title">学业之外，我也有自己的舞台。</h1>
            <p className="page-intro">
              奖学金、创新创业比赛、合唱团与音乐节、辩论主持，这些经历共同构成了课堂之外的我。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <Reveal>
            <SectionHeading
              kicker="荣誉清单"
              title="目前可以公开的成果"
              note="这份清单会随着大学进程持续更新，每一段经历都可以在面试时展开细聊。"
            />
          </Reveal>
          <div className="award-grid">
            {awards.map((award, index) => (
              <Reveal key={award.title} delay={index * 0.05} className="award-item">
                <div className="award-index">0{index + 1}</div>
                <h2 className="award-title">{award.title}</h2>
                <p className="award-detail">{award.detail}</p>
                <div className="award-tag">{award.tag}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
