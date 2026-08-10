import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/lib/content";

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="kicker">ABOUT / 关于我</span>
            <h1 className="page-title">一个把“每天进步”当产品来做的金融数学学生。</h1>
            <p className="page-intro">{profile.positioning}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container about-editorial">
          <Reveal className="identity-plate">
            <div className="identity-plate-top">
              <span>XINGHAO WANG</span>
              <span>SWUFE · 2026</span>
            </div>
            <div className="identity-plate-name">{profile.name}</div>
            <div className="identity-plate-rule" aria-hidden="true" />
            <div className="identity-plate-rows">
              {profile.education.map((item) => (
                <div key={item.label} className="identity-plate-row">
                  <span>{item.label}</span>
                  <b>{item.value}</b>
                </div>
              ))}
              <div className="identity-plate-row">
                <span>Email</span>
                <b>{profile.email}</b>
              </div>
              <div className="identity-plate-row">
                <span>GitHub</span>
                <b>@{profile.github}</b>
              </div>
            </div>
            <div className="tag-cloud">
              {profile.tags.map((tag) => (
                <span key={tag} className="personality-tag">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="bio-copy">
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <SectionHeading kicker="校园生活" title="学习之外的我也在持续输出" />
            <div className="feature-list">
              {profile.hobbies.map((hobby, index) => (
                <div key={hobby} className="feature-item">
                  <div className="feature-index">0{index + 1}</div>
                  <div className="feature-title">{hobby}</div>
                  <div className="feature-desc">
                    {index === 0
                      ? "校合唱团成员，参加学校各类大型表演。"
                      : index === 1
                        ? "随合唱团参加西部音乐节并获得一等奖。"
                        : index === 2
                          ? "在中信证券实习期间担任金融主题辩论赛主持人。"
                          : "坚持记录市场观察与个人复盘，把思考沉淀成文字。"}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
