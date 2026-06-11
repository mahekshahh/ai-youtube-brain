import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from "lucide-react";

export default function FlashcardsTab({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);

  if (!cards.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🃏</div>
        <h2>No flashcards yet</h2>
      </div>
    );
  }

  const card = cards[index];
  const total = cards.length;
  const progress = ((index + 1) / total) * 100;

  const goNext = () => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, total - 1));
  };
  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  };
  const reset = () => {
    setIndex(0);
    setFlipped(false);
    setKnown(0);
    setUnknown(0);
  };

  return (
    <div className="flashcards-tab">
      <div className="fc-status">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="fc-counts">
          <span>{index + 1} / {total}</span>
          <span className="count-good"><Check size={14} /> {known}</span>
          <span className="count-bad"><X size={14} /> {unknown}</span>
        </div>
      </div>

      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flashcard-inner">
          <div className="flashcard-face flashcard-front">
            <span className="eyebrow">Question</span>
            <p>{card.front}</p>
            <span className="tap-hint">tap to reveal</span>
          </div>
          <div className="flashcard-face flashcard-back">
            <span className="eyebrow">Answer</span>
            <p>{card.back}</p>
          </div>
        </div>
      </div>

      <div className="fc-controls">
        <button className="ghost-btn" onClick={goPrev} disabled={index === 0}>
          <ChevronLeft size={18} /> Prev
        </button>

        <div className="fc-judge">
          <button
            className="judge-btn bad"
            onClick={() => {
              setUnknown((u) => u + 1);
              goNext();
            }}
          >
            <X size={16} /> Didn't know
          </button>
          <button
            className="judge-btn good"
            onClick={() => {
              setKnown((k) => k + 1);
              goNext();
            }}
          >
            <Check size={16} /> Knew it
          </button>
        </div>

        <button className="ghost-btn" onClick={goNext} disabled={index === total - 1}>
          Next <ChevronRight size={18} />
        </button>
      </div>

      <button className="reset-btn" onClick={reset}>
        <RotateCcw size={14} /> Restart deck
      </button>
    </div>
  );
}
