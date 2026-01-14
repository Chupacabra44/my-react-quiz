const Answers = ({ shuffledAnswers }) => {
  // console.log(shuffledAnswers);
  return (
    <div>
      <div className="answers">
        {shuffledAnswers.map((answer, index) => (
          <div key={index} className="answer">
            <span>A</span>
            <span>{answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
