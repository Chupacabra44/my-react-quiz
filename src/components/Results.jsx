const Results = ({ isCorrectAnswer, currentIndex }) => {
  return (
    <div className="resultWrapper">
      <h1>Results</h1>
      <p>
        You've got {isCorrectAnswer} / {currentIndex}
      </p>
      {isCorrectAnswer < 4 ? (
        <p>You can do it better!</p>
      ) : isCorrectAnswer >= 4 && isCorrectAnswer < 7 ? (
        <p>That's all you can get?</p>
      ) : (
        <p>Great!</p>
      )}
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </div>
  );
};

export default Results;
