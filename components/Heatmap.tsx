import { formatDate, journals } from "@/lib/content";

function isoDate(offsetDays: number): string {
  const date = new Date(2026, 6, 13 + offsetDays);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export default function Heatmap() {
  const weeks = Array.from({ length: 5 }, (_, week) =>
    Array.from({ length: 5 }, (_, weekday) => {
      const date = isoDate(week * 7 + weekday);
      const entry = journals.find((j) => j.date === date && j.type === "daily");
      return { date, entry };
    })
  );

  const filled = journals.filter((j) => j.type === "daily").length;

  return (
    <div className="heatmap">
      <div className="heat-row heat-labels" aria-hidden="true">
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
      </div>
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="heat-row">
          {week.map(({ date, entry }) => (
            <div
              key={date}
              className={`heat-cell ${entry ? "filled" : "empty"}`}
              title={`${formatDate(date)} · ${entry ? entry.event : "待补充"}`}
            />
          ))}
        </div>
      ))}
      <div className="heat-legend">
        <span>已记录 {filled} 个工作日</span>
        <span>实习周期 07.13 — 08.14</span>
      </div>
    </div>
  );
}
