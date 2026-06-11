import { useState } from "react";
import { Youtube, Sparkles, Layers, Brain, Map, BookOpen, CheckSquare, ListChecks } from "lucide-react";
import SummaryTab from "./SummaryTab";
import ConceptsTab from "./ConceptsTab";
import ActionsTab from "./ActionsTab";
import QuizTab from "./QuizTab";
import FlashcardsTab from "./FlashcardsTab";
import MindMapTab from "./MindMapTab";

const API_BASE = "http://localhost:8000"; // change to your Render URL when deployed

export default function App() {
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE}/summarize?url=${encodeURIComponent(url)}`
      );
      if (!res.ok) throw new Error("Backend returned an error");
      const json = await res.json();
      setData(json);
      setActiveTab("summary");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "summary", label: "Summary", icon: Layers },
    { id: "concepts", label: "Concepts", icon: BookOpen },
    { id: "actions", label: "Actions", icon: CheckSquare },
    { id: "quiz", label: "Quiz", icon: ListChecks },
    { id: "flashcards", label: "Flashcards", icon: Brain },
    { id: "mindmap", label: "Mind Map", icon: Map },
  ];

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div className="logo">
            <span className="logo-mark">SB</span>
            <div className="logo-text">
              <h1>StudyBuddy</h1>
              <p>turn any video into a study kit</p>
            </div>
          </div>
        </header>

        <div className="urlbar-row">
          <div className="urlbar">
            <Youtube size={20} className="urlbar-icon" />
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
          </div>
          <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
            <Sparkles size={18} />
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        <nav className="tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <main className="content">
          {error && <div className="error-banner">{error}</div>}

          {!data && !loading && !error && (
            <div className="empty-state">
              <div className="empty-icon">📼</div>
              <h2>Paste a YouTube link to get started</h2>
              <p>
                We'll pull the transcript, summarize it, and build flashcards
                + a mind map for you.
              </p>
            </div>
          )}

          {loading && (
            <div className="empty-state">
              <div className="empty-icon spin">⏳</div>
              <h2>Reading the transcript...</h2>
              <p>This can take a few seconds for longer videos.</p>
            </div>
          )}

          {data && activeTab === "summary" && <SummaryTab data={data} />}
          {data && activeTab === "concepts" && (
            <ConceptsTab concepts={data.key_concepts || []} />
          )}
          {data && activeTab === "actions" && (
            <ActionsTab items={data.action_items || []} />
          )}
          {data && activeTab === "quiz" && (
            <QuizTab quiz={data.quiz || []} />
          )}
          {data && activeTab === "flashcards" && (
            <FlashcardsTab cards={data.flashcards || []} />
          )}
          {data && activeTab === "mindmap" && (
            <MindMapTab mindMap={data.mind_map} />
          )}
        </main>
      </div>
    </div>
  );
}
