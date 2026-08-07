interface SectionHeadingProps {
  kicker: string;
  title: string;
  note?: string;
}

export default function SectionHeading({ kicker, title, note }: SectionHeadingProps) {
  return (
    <div className="section-head">
      <div>
        <span className="kicker">{kicker}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {note ? <p className="section-note">{note}</p> : null}
    </div>
  );
}
