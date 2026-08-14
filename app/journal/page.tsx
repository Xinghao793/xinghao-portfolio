"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Search } from "lucide-react";
import Reveal from "@/components/Reveal";
import { formatDate, journalTagPool, journals } from "@/lib/content";

type TypeFilter = "all" | "daily" | "weekly" | "summary";

export default function JournalPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [tagFilter, setTagFilter] = useState<string>("全部");
  const [query, setQuery] = useState("");

  const tags = useMemo(() => ["全部", ...journalTagPool(journals)], []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return journals.filter((entry) => {
      if (typeFilter !== "all" && entry.type !== typeFilter) return false;
      if (tagFilter !== "全部" && !entry.tags.includes(tagFilter)) return false;
      if (!keyword) return true;
      const haystack = [entry.title, entry.summary, ...entry.paragraphs].join("\n").toLowerCase();
      return haystack.includes(keyword);
    });
  }, [typeFilter, tagFilter, query]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="kicker">JOURNAL / 实习日志</span>
            <h1 className="page-title">每一天都算数，每一篇都保留。</h1>
            <p className="page-intro">
              实习周期为 2026.07.13 至 08.14，共 31 篇记录：25 个工作日日志、5 篇周志、1 篇实习总结。可以按类型、标签筛选，也可以直接搜索。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="journal-toolbar">
            <div>
              <div className="filter-row">
                <button
                  type="button"
                  className={`filter-chip ${typeFilter === "all" ? "active" : ""}`}
                  onClick={() => setTypeFilter("all")}
                >
                  全部
                </button>
                <button
                  type="button"
                  className={`filter-chip ${typeFilter === "daily" ? "active" : ""}`}
                  onClick={() => setTypeFilter("daily")}
                >
                  每日日志
                </button>
                <button
                  type="button"
                  className={`filter-chip ${typeFilter === "weekly" ? "active" : ""}`}
                  onClick={() => setTypeFilter("weekly")}
                >
                  周度总结
                </button>
                <button
                  type="button"
                  className={`filter-chip ${typeFilter === "summary" ? "active" : ""}`}
                  onClick={() => setTypeFilter("summary")}
                >
                  实习总结
                </button>
              </div>
              <div className="filter-row">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`filter-chip ${tagFilter === tag ? "active" : ""}`}
                    onClick={() => setTagFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="search-field">
              <Search size={17} />
              <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索日志内容"
                aria-label="搜索日志"
              />
            </div>
          </div>

          <div className="result-count">
            共 {filtered.length} 篇 · 当前筛选：{typeFilter === "all" ? "全部类型" : typeFilter === "daily" ? "每日日志" : typeFilter === "weekly" ? "周度总结" : "实习总结"}
            {tagFilter !== "全部" ? ` · ${tagFilter}` : ""}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              没有找到匹配的日志，换个关键词或筛选条件试试。
            </div>
          ) : (
            <div className="journal-list">
              {filtered.map((entry) => (
                <Reveal key={entry.id}>
                  <details className="journal-item">
                    <summary>
                      <span className="journal-date">{formatDate(entry.date)}</span>
                      <span className="journal-title">{entry.event}</span>
                      <span className="journal-meta">
                        <span className="journal-type">
                          {entry.type === "daily" ? "日志" : entry.type === "weekly" ? "周志" : "总结"}
                        </span>
                        <ChevronRight className="journal-arrow" size={18} />
                      </span>
                    </summary>
                    <div className="journal-body">
                      <div className="journal-tags">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="journal-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {entry.paragraphs.slice(0, 3).map((paragraph, index) => (
                        <p key={index} className="journal-paragraph">
                          {paragraph}
                        </p>
                      ))}
                      <Link href={`/journal/${entry.id}`} className="journal-detail-link">
                        查看完整日志
                        <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
