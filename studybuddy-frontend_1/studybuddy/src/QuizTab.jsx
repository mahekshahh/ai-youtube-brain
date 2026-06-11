import { useState } from "react";
import { ListChecks, Check, X } from "lucide-react";

export default function QuizTab({ quiz }) {
  const [selected, setSelected] = useState({}); // { [questionIndex]: optionLetter }

  if (!quiz.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">❓</div>
        <h2>No quiz questions found</h2>
      </div>
    );
  }

  const handleSelect = (qIndex, letter) => {
    if (selected[qIndex]) return; // already answered, lock it in
    setSelected((prev) => ({ ...prev, [qIndex]: letter }));
  };

  const score = Object.entries(selected).filter(
    ([qIndex, letter]) => letter === quiz[qIndex].answer
  ).length;
  const answered = Object.keys(selected).length;

  return (
    <div className="section-block">
      <div className="quiz-header">
        <h3>
          <ListChecks size={18} /> Quick Quiz
        </h3>
        {answered > 0 && (
          <span className="quiz-score">
            {score} / {answered} correct
          </span>
        )}
      </div>

      <div className="quiz-list">
        {quiz.map((q, qIndex) => {
          const userAnswer = selected[qIndex];
          const isAnswered = !!userAnswer;

          return (
            <div className="quiz-card" key={qIndex}>
              <p className="quiz-question">
                {qIndex + 1}. {q.question}
              </p>
              <div className="quiz-options">
                {q.options.map((opt, i) => {
                  const letter = opt.trim()[0];
                  const isCorrect = letter === q.answer;
                  const isSelected = letter === userAnswer;

                  let stateClass = "";
                  if (isAnswered) {
                    if (isCorrect) stateClass = "correct";
                    else if (isSelected) stateClass = "incorrect";
                  }

                  return (
                    <button
                      className={`quiz-option ${stateClass} ${
                        isSelected ? "selected" : ""
                      }`}
                      key={i}
                      onClick={() => handleSelect(qIndex, letter)}
                      disabled={isAnswered}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && (
                        <Check size={16} className="quiz-icon" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <X size={16} className="quiz-icon" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
