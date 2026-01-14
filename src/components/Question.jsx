const Question = ({ currentQuestion }) => {
  return (
    <div className="questions">
      <div className="question">
        <span>{currentQuestion.question}</span>
      </div>
    </div>
  );
};

export default Question;
