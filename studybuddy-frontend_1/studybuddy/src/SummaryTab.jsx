export default function SummaryTab({ data }) {
  return (
    <div className="summary-tab">
      <section className="card tldr-card">
        <span className="eyebrow">TL;DR</span>
        <p>{data.summary}</p>
      </section>
    </div>
  );
}
