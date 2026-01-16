const Results = ({ isCorrectAnswer, currentIndex, restartQuiz }) => {
  return (
    <div className="resultWrapper">
      <h1>Results</h1>
      <p>
        You've got {isCorrectAnswer} / {currentIndex}
      </p>
      {isCorrectAnswer < 4 ? (
        <>
          <p>You can do it better!</p>
          <img
            className="disappointed"
            src="images/disappointed.svg"
            alt="disappointed"
          />
        </>
      ) : isCorrectAnswer >= 4 && isCorrectAnswer < 7 ? (
        <>
          <p>That's all you can get?</p>
          <img
            className="littleDisappointed"
            src="images/littleDisappointed.svg"
            alt="little disappointed"
          />
        </>
      ) : (
        <>
          <p>Great!</p>
          <img className="start" src="images/stars.svg" alt="stars" />
        </>
      )}
      <div className={isCorrectAnswer >= 7 ? "pyro" : ""}>
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <button className="restartBtn" onClick={restartQuiz}>
        Restart
      </button>
    </div>
  );
};

export default Results;
