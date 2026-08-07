import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/AiAssistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "王星皓 · 个人经历网站",
  description:
    "西南财经大学金融数学专业大二学生王星皓的个人经历网站，记录中信证券实习、技能能力与持续迭代的自己。",
  keywords: ["王星皓", "金融数学", "中信证券", "实习", "AI Agent"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <AiAssistant />
      </body>
    </html>
  );
}
