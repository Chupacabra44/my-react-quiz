import { useState, useEffect } from "react";
import Answers from "./Answers";
import Question from "./Question";
import Results from "./Results";

const Quiz = () => {
  const [dataApi, setDataApi] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(true);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(0);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple"
      );
      const data = await response.json();
      setDataApi(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const currentQuestion = dataApi?.[currentIndex];

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

  const shuffleAnswers = (answers) => {
    const newAnswers = [...answers];
    for (let i = newAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newAnswers[i], newAnswers[j]] = [newAnswers[j], newAnswers[i]];
    }
    return newAnswers;
  };

  const allQuestionsDone = currentIndex >= dataApi?.length - 1;

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
