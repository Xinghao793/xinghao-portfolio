const items = [
  "AI Agent 协作",
  "CATS 交易系统",
  "TWAP 拆单策略",
  "行业研报对比",
  "每日市场复盘",
  "DeepSeek 工作流",
  "投资心理学"
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="ticker" aria-label="能力关键词">
      <div className="ticker-track">
        {doubled.map((item, index) => (
          <span key={index} className="ticker-item">
            {item}
            <span className="ticker-sep">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
