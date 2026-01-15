const Answers = ({
  shuffledAnswers,
  selectedAnswer,
  setSelectedAnswer,
  setIsAnswered,
  setIsCorrectAnswer,
}) => {
  const letters = ["A", "B", "C", "D"];

  return (
    <div>
      <div className="answers">
        {shuffledAnswers.map((answer, index) => {
          let className = "answer";
          if (selectedAnswer === answer) {
            className += answer.isCorrect ? " correct" : " incorrect";
          }

          return (
            <div
              onClick={() => {
                if (!selectedAnswer) {
                  setSelectedAnswer(answer);
                  setIsAnswered(true);
                }

                if (answer.isCorrect) {
                  setIsCorrectAnswer((prev) => prev + 1);
                }
              }}
              key={index}
              className={className}
            >
              <span>{letters[index]}</span>
              <span>{answer.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answers;
