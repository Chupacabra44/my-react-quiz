import { useState, useEffect } from "react";
import Answers from "./Answers";
import Question from "./Question";
import Results from "./Results";
import { decodeHtml } from "../helpers";

const Quiz = () => {
  const [dataApi, setDataApi] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("API error!");
        }
        const data = await response.json();

        setDataApi(data.results);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };

    getData();

    return () => {
      controller.abort();
    };
  }, []);

  const currentQuestion = dataApi[currentIndex];

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
        text: decodeHtml(answer),
        isCorrect: false,
      })),
      {
        text: decodeHtml(currentQuestion.correct_answer),
        isCorrect: true,
      },
    ];

    setShuffledAnswers(shuffleAnswers(answers));
  }, [currentQuestion]);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex]);

  if (!dataApi.length) {
    return <p className="loading">Loading questions ...</p>;
  }

  const allQuestionsDone = currentIndex >= dataApi.length - 1;

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrectAnswer(0);
  };

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
          restartQuiz={restartQuiz}
        />
      )}
    </>
  );
};

export default Quiz;
