"use client";

import { useEffect, useState } from "react";
import { assetPath } from "@/lib/paths";

const commands = [
  {
    cmd: "research.report --industry 消费互联网",
    out: "Q2 前瞻拆解完成 → 等待外卖减亏与第二曲线验证"
  },
  {
    cmd: "research.report --industry AI 算力",
    out: "扩产链 + Agent 落地节奏已归档，风险点已标注"
  },
  {
    cmd: "strategy.twap --volume 100万",
    out: "模拟环境执行 5 笔订单，冲击成本控制在目标区间"
  },
  {
    cmd: "market.review --date 2026.08.06",
    out: "沪指 +0.57% · 煤炭午后爆发 · 日志 20/30"
  }
];

const tape = [
  { name: "沪指", value: "+0.57%" },
  { name: "创业板", value: "-0.55%" },
  { name: "长鑫科技", value: "+13.00%" },
  { name: "半导体", value: "强势" },
  { name: "煤炭", value: "爆发" },
  { name: "两市成交", value: "2.53 万亿" }
];

export default function Terminal() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Array<{ cmd: string; out: string }>>([]);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"cmd" | "out">("cmd");

  useEffect(() => {
    if (step >= commands.length) {
      const timer = window.setTimeout(() => {
        setDone([]);
        setStep(0);
        setTyped("");
        setPhase("cmd");
      }, 4200);
      return () => window.clearTimeout(timer);
    }
    const target = phase === "cmd" ? commands[step].cmd : commands[step].out;
    if (typed.length < target.length) {
      const timer = window.setTimeout(
        () => setTyped(target.slice(0, typed.length + 1)),
        phase === "cmd" ? 42 : 10
      );
      return () => window.clearTimeout(timer);
    }
    if (phase === "cmd") {
      const timer = window.setTimeout(() => setPhase("out"), 240);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      setDone((prev) => [...prev, commands[step]]);
      setTyped("");
      setPhase("cmd");
      setStep((s) => s + 1);
    }, 760);
    return () => window.clearTimeout(timer);
  }, [step, phase, typed.length]);

  return (
    <div className="terminal">
      <div className="terminal-head">
        <div className="terminal-avatar">
          <img src={assetPath("/images/avatar.png")} alt="AI 王星皓" />
        </div>
        <div>
          <div className="terminal-title">AI 投研终端</div>
          <div className="terminal-status">RESEARCH MODE · 30 篇日志知识库</div>
        </div>
        <div className="terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="terminal-body">
        {done.map((item) => (
          <div key={item.cmd} className="term-block">
            <div className="term-line">
              <span className="term-prompt">$</span>
              <span>{item.cmd}</span>
            </div>
            <div className="term-out">{item.out}</div>
          </div>
        ))}
        <div className="term-block">
          {phase === "cmd" ? (
            <div className="term-line">
              <span className="term-prompt">$</span>
              <span>{typed}</span>
              <span className="term-cursor" />
            </div>
          ) : (
            <div className="term-out">
              {typed}
              <span className="term-cursor" />
            </div>
          )}
        </div>
      </div>
      <div className="terminal-tape">
        {tape.map((item) => (
          <span key={item.name} className="tape-item">
            <b>{item.name}</b>
            <em>{item.value}</em>
          </span>
        ))}
      </div>
    </div>
  );
}
