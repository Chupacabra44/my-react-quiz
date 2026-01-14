const App = () => {
  return (
    <div className="quizWrappepr">
      <h1>Question</h1>
      <div className="questions">
        <div className="question">
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
            ipsa esse perferendis in molestias? Reprehenderit!dolor sit, amet
            consectetur adipisicing elit. Temporibus ipsa esse perferendis in
            molestias? Reprehenderit!
          </span>
        </div>
      </div>

      <div className="answers">
        <div className="answer">
          <span>A</span>
          <span>Answer</span>
        </div>
        <div className="answer">
          <span>B</span>
          <span>Answer</span>
        </div>
        <div className="answer">
          <span>C</span>
          <span>Answer</span>
        </div>
        <div className="answer">
          <span>D</span>
          <span>Answer</span>
        </div>
      </div>
      <div className="btnWrapper">
        <button>Next Question</button>
      </div>
    </div>
  );
};

export default App;
