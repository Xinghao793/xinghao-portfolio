"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我" },
  { href: "/experience", label: "实习经历" },
  { href: "/journal", label: "实习日志" },
  { href: "/skills", label: "技能能力" },
  { href: "/awards", label: "荣誉活动" },
  { href: "/contact", label: "联系我" }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">王星皓</span>
          <span className="brand-sub">XINGHAO WANG</span>
        </Link>
        <nav className="nav" aria-label="主导航">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className={`mobile-nav ${open ? "open" : ""}`} aria-label="移动端导航">
          <div className="container">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
