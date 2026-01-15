const Results = ({ isCorrectAnswer, currentIndex }) => {
  return (
    <div>
      <h1>
        Results
        <p>
          You've got {isCorrectAnswer} / {currentIndex}
        </p>
      </h1>
    </div>
  );
};

export default Results;
