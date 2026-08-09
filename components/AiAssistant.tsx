"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { assetPath } from "@/lib/paths";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const quickQuestions = ["介绍一下你的实习", "你会用哪些 AI 工具", "你最大的特点是什么"];

const fallbackReply =
  "这是占位版 AI 助手，正在用我的个人资料搭建问答逻辑。二期接入 DeepSeek 后，我会直接以“王星皓”的第一人称回答面试官的问题。";

const cannedReplies: Record<string, string> = {
  "介绍一下你的实习":
    "我在中信证券完成了飞鹰计划系统培训，现在是市场拓展部管培生。实习里我做过晨会复盘、基金与资产配置路演、CATS 交易系统研究、TWAP 策略设计和行业研报整理，还会用 AI Agent 帮我做信息梳理和交叉验证。",
  "你会用哪些 AI 工具":
    "我常用的是 AI Agent 协作、大模型调用、Skill 与插件的配置应用，以及提示词和工作流设计。实习里我会用 AI 拆研报、提取关键数据、辅助设计交易策略，但重要结论一定会自己核实。",
  "你最大的特点是什么":
    "我觉得是“把 AI 真正用进工作，同时保持每天复盘”。别人可能把 AI 当搜索框，我会把它当协作者：写策略、拆研报、搭对比框架，再结合自己的判断做交叉验证。"
};

function getReply(text: string): string {
  const normalized = text.trim();
  for (const [key, reply] of Object.entries(cannedReplies)) {
    if (normalized.includes(key.slice(0, 6))) return reply;
  }
  return fallbackReply;
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "你好，我是 AI 王星皓。你可以直接问我和简历、实习、技能相关的问题。"
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  function send(text: string) {
    const question = text.trim();
    if (!question || typing) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: getReply(question) }]);
      setTyping(false);
    }, 650);
  }

  return (
    <div className="assistant">
      <AnimatePresence>
        {open ? (
          <motion.div
            className="assistant-panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="assistant-head">
              <div className="assistant-avatar">
                <img src={assetPath("/images/avatar.png")} alt="AI 王星皓头像" />
              </div>
              <div>
                <div className="assistant-name">AI 王星皓</div>
                <div className="assistant-status">占位版 · 二期接入 DeepSeek</div>
              </div>
              <button
                type="button"
                className="assistant-close"
                aria-label="关闭 AI 助手"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="assistant-messages" ref={scrollRef}>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  {message.text}
                </div>
              ))}
              {typing ? (
                <div className="message">
                  正在组织回答…
                </div>
              ) : null}
              {!typing && messages.length < 4 ? (
                <div className="filter-row" style={{ marginTop: 4 }}>
                  {quickQuestions.map((q) => (
                    <button key={q} type="button" className="filter-chip" onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <form
              className="assistant-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                className="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="问 AI 王星皓一个问题"
                aria-label="问题输入框"
              />
              <button type="submit" className="assistant-send" aria-label="发送">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        className="assistant-fab"
        aria-label="打开 AI 助手"
        onClick={() => setOpen((v) => !v)}
      >
        <img src={assetPath("/images/avatar.png")} alt="AI 王星皓" />
      </button>
      {open ? null : (
        <span className="assistant-fab-tip" aria-hidden="true">
          <Bot size={16} />
        </span>
      )}
    </div>
  );
}
