import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import {
  formatDate,
  getJournalBySlug,
  getJournalNeighbors,
  journals
} from "@/lib/content";

export function generateStaticParams() {
  return journals.map((journal) => ({ slug: journal.id }));
}

export const dynamicParams = false;

export default async function JournalDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getJournalBySlug(slug);
  if (!entry) notFound();

  const { prev, next } = getJournalNeighbors(entry.id);

  return (
    <>
      <section className="article-header">
        <div className="container">
          <Reveal>
            <div className="article-date">
              {formatDate(entry.date)} · {entry.type === "daily" ? "每日日志" : entry.type === "weekly" ? "周度总结" : "实习总结"}
            </div>
            <h1 className="article-title">{entry.event}</h1>
            <p className="article-sub">{entry.title}</p>
            <div className="journal-tags" style={{ marginTop: 18 }}>
              {entry.tags.map((tag) => (
                <span key={tag} className="journal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="article-body">
            {entry.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container article-nav">
          {prev ? (
            <Link href={`/journal/${prev.id}`}>
              <ArrowLeft size={16} />
              上一篇：{prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/journal/${next.id}`}>
              下一篇：{next.title}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </>
  );
}
