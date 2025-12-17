import Question from '../../models/question';
import Options from './Options';

export default function QuestionComp({
  question,
  onAnswer,
  onNext,
  answer,
}: {
  question: Question;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  answer: number | null;
}) {
  return (
    <div>
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
