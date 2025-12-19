import Question from '../../models/question';
import Footer from '../Footer';
import Progress from '../Progress';
import Timer from '../Timer';
import Options from './Options';

export default function QuestionComp({
  question,
  onAnswer,
  onFinish,
  onNext,
  onTick,
  answer,
  currentQuestion,
  questions,
  score,
  seconds,
}: {
  question: Question;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  onFinish: () => void;
  answer: number | null;
  currentQuestion: number;
  questions: Question[];
  score: number;
  onTick: () => void;
  seconds: number;
}) {
  return (
    <div>
      <Progress
        currentQuestion={currentQuestion}
        questions={questions}
        score={score}
        answer={answer}
      />
      <h4>{question.question}</h4>
      <Options
        question={question}
        onAnswer={(answer: number) => onAnswer(answer)}
        answer={answer}
      />

      <Footer>
        <Timer onTick={onTick} seconds={seconds} />
        {answer !== null && (
          <button
            className='btn btn-ui'
            onClick={currentQuestion < questions.length ? onNext : onFinish}
          >
            {currentQuestion < questions.length ? `Next` : `Finish`}
          </button>
        )}
      </Footer>
    </div>
  );
}
