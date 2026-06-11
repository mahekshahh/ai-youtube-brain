import { BookOpen } from "lucide-react";

export default function ConceptsTab({ concepts }) {
  if (!concepts.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h2>No key concepts found</h2>
      </div>
    );
  }

  return (
    <div className="section-block">
      <h3>
        <BookOpen size={18} /> Key Concepts
      </h3>
      <div className="key-points">
        {concepts.map((point, i) => (
          <div className="key-point" key={i}>
            <span className="point-num">{String(i + 1).padStart(2, "0")}</span>
            <p>{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
