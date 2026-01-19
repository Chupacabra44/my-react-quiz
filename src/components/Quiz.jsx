import { useState, useEffect } from "react";
import Answers from "./Answers";
import Question from "./Question";
import Results from "./Results";
import { decodeHtml } from "../helpers";

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState(9);
  const [categories, setCategories] = useState([]);
  const [dataApi, setDataApi] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(0);
  const [categoryLocked, setCategoryLocked] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const getCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("API category error");
        }

        const dataCategory = await response.json();
        setCategories(dataCategory.trivia_categories);
      } catch (error) {
        if (error.name !== "AbortErrorCategory") {
          console.error(error);
        }
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("API error!");
        }
        const data = await response.json();

        setDataApi(data.results);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsCorrectAnswer(0);
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
  }, [selectedCategory]);

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

  const allQuestionsDone = currentIndex >= dataApi.length;

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrectAnswer(0);
    setCategoryLocked(false);
  };

  return (
    <>
      {!allQuestionsDone ? (
        <>
          <h1>Question {currentIndex + 1}</h1>
          <Question currentQuestion={currentQuestion} />
          <div className="select">
            <label>Choose a category: </label>
            <select
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(Number(event.target.value));
                setCategoryLocked(true);
              }}
              disabled={categoryLocked}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
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
