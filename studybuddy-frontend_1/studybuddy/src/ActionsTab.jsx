import { CheckSquare } from "lucide-react";

export default function ActionsTab({ items }) {
  if (!items.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✅</div>
        <h2>No action items found</h2>
      </div>
    );
  }

  return (
    <div className="section-block">
      <h3>
        <CheckSquare size={18} /> Action Items
      </h3>
      <div className="action-list">
        {items.map((item, i) => (
          <label className="action-item" key={i}>
            <input type="checkbox" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
