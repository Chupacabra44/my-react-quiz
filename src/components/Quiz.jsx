import { useState, useEffect } from "react";
import Answers from "./Answers";
import Question from "./Question";
import Results from "./Results";
import { data } from "../data";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const currentQuestion = data[currentIndex];
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(true);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(0);

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
      ...currentQuestion.incorrect_answers.map((answer) => ({
        text: answer,
        isCorrect: false,
      })),
      {
        text: currentQuestion.correct_answer,
        isCorrect: true,
      },
    ];

    setShuffledAnswers(shuffleAnswers(answers));
  }, [currentQuestion]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex]);

  const allQuestionsDone = currentIndex >= data.length - 1;
  return (
    <>
      {!allQuestionsDone ? (
        <>
          <h1>Question {currentIndex + 1}</h1>
          <Question currentQuestion={currentQuestion} />
          <Answers
            shuffledAnswers={shuffledAnswers}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            setIsAnswered={setIsAnswered}
            setIsCorrectAnswer={setIsCorrectAnswer}
          />
          <div className="btnWrapper">
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={!isAnswered}
            >
              Next Question
            </button>
          </div>
        </>
      ) : (
        <Results
          currentIndex={currentIndex}
          isCorrectAnswer={isCorrectAnswer}
        />
      )}
    </>
  );
};

export default Quiz;
