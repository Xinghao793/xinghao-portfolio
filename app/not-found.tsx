import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="kicker">404</span>
        <h1 className="page-title">这个页面还不存在，但我会继续迭代。</h1>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary">
            回到首页
          </Link>
        </div>
      </div>
    </section>
  );
}
