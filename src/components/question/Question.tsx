import Question from '../../models/question';
import Progress from '../Progress';
import Options from './Options';

export default function QuestionComp({
  question,
  onAnswer,
  onNext,
  answer,
  currentQuestion,
  questions,
  score,
}: {
  question: Question;
  onAnswer: (answer: number) => void;
  onNext: () => void;
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
        <button className='btn btn-ui' onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
}
