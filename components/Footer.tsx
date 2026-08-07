import Link from "next/link";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">{profile.name}</div>
          <div className="footer-note">PERSONAL BRAND · BUILT TO ITERATE</div>
        </div>
        <div className="footer-links">
          <Link href="/experience">实习经历</Link>
          <Link href="/journal">实习日志</Link>
          <Link href="/contact">联系我</Link>
        </div>
      </div>
    </footer>
  );
}
