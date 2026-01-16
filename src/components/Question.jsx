import { decodeHtml } from "../helpers";

const Question = ({ currentQuestion }) => {
  return (
    <div className="questions">
      <div className="question">
        <span>{decodeHtml(currentQuestion.question) || ""}</span>
      </div>
    </div>
  );
};

export default Question;
