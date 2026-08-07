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
        <div className="container about-grid">
          <Reveal className="about-media">
            <div className="about-photo">
              <img src="/images/photos/portrait-1.jpg" alt="王星皓近景照片" />
            </div>
            <div className="about-photo-caption">生活照 · 更多照片随网站迭代补充</div>
            <div className="photo-strip">
              <img src="/images/photos/portrait-2.jpg" alt="王星皓照片二" />
              <img src="/images/photos/portrait-3.jpg" alt="王星皓照片三" />
              <img src="/images/photos/fullbody.jpg" alt="王星皓全身照" />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="bio-copy">
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className="info-list">
              {profile.education.map((item) => (
                <div key={item.label} className="info-item">
                  <div className="info-label">{item.label}</div>
                  <div className="info-value">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="tag-cloud">
              {profile.tags.map((tag) => (
                <span key={tag} className="personality-tag">
                  {tag}
                </span>
              ))}
            </div>
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
