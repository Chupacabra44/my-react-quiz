import { useState, useEffect } from "react";
import Answers from "./Answers";
import Question from "./Question";
import { data } from "../data";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const currentQuestion = data[currentIndex];

  const shuffleAnswers = (answers) => {
    const newAnswers = [...answers];
    for (let i = newAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newAnswers[i], newAnswers[j]] = [newAnswers[j], newAnswers[i]];
    }
    return newAnswers;
  };

  useEffect(() => {
    if (!currentQuestion) return;

    const answers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    setShuffledAnswers(shuffleAnswers(answers));
  }, [currentQuestion]);

  return (
    <>
      <h1>Question</h1>
      <Question currentQuestion={currentQuestion} />
      <Answers shuffledAnswers={shuffledAnswers} />
      <div className="btnWrapper">
        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={currentIndex >= data.length - 1}
        >
          Next Question
        </button>
      </div>
    </>
  );
};

export default Quiz;
