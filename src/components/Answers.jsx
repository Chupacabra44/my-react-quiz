const Answers = ({ shuffledAnswers, selectedAnswer, setSelectedAnswer }) => {
  console.log(shuffledAnswers);
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
              onClick={() => setSelectedAnswer(answer)}
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
