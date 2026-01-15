const Answers = ({
  shuffledAnswers,
  selectedAnswer,
  setSelectedAnswer,
  setIsAnswered,
}) => {
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
              }}
              key={index}
              className={className}
            >
              <span>A</span>
              <span>{answer.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answers;
