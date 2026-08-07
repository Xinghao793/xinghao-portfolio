import { Github, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/content";

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="kicker">CONTACT / 联系我</span>
            <h1 className="page-title">如果有机会，我想当面讲讲我的成长。</h1>
            <p className="page-intro">
              欢迎通过邮件联系我，也可以先和右下角的 AI 王星皓聊几句，它会用我的第一人称回答常见问题。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container contact-grid">
          <Reveal className="contact-card">
            <div className="contact-label">EMAIL</div>
            <a className="contact-value" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact-hint">求职与实习机会，欢迎直接发邮件。</div>
            <div className="hero-actions" style={{ marginTop: 28 }}>
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                <Mail size={17} />
                写邮件
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="contact-card">
            <div className="contact-label">GITHUB</div>
            <a
              className="contact-value"
              href={`https://github.com/${profile.github}`}
              target="_blank"
              rel="noreferrer"
            >
              @{profile.github}
            </a>
            <div className="contact-hint">代码、网站与个人项目会持续在这里迭代。</div>
            <div className="hero-actions" style={{ marginTop: 28 }}>
              <a
                className="btn btn-ghost"
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} />
                访问 GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
