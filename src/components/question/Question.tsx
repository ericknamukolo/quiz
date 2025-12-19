import Question from '../../models/question';
import Progress from '../Progress';
import Options from './Options';

export default function QuestionComp({
  question,
  onAnswer,
  onFinish,
  onNext,
  answer,
  currentQuestion,
  questions,
  score,
}: {
  question: Question;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  onFinish: () => void;
  answer: number | null;
  currentQuestion: number;
  questions: Question[];
  score: number;
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
      {answer !== null && (
        <button
          className='btn btn-ui'
          onClick={currentQuestion < questions.length ? onNext : onFinish}
        >
          {currentQuestion < questions.length ? `Next` : `Finish`}
        </button>
      )}
    </div>
  );
}
