export default function MindMapTab({ mindMap }) {
  if (!mindMap) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🗺️</div>
        <h2>No mind map yet</h2>
      </div>
    );
  }

  const subtopics = mindMap.subtopics || [];

  return (
    <div className="mindmap-tab">
      <div className="mindmap-grid">
        {subtopics.map((sub, i) => (
          <div className="mindmap-branch" key={i}>
            <div className="mindmap-node main-sub">{sub.name}</div>
            {sub.children && sub.children.length > 0 && (
              <div className="mindmap-children">
                {sub.children.map((child, j) => (
                  <div className="mindmap-node child-node" key={j}>
                    {child}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mindmap-center">
        <div className="mindmap-node center-node">{mindMap.topic}</div>
      </div>
    </div>
  );
}
