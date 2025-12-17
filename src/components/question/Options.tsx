import Question from '../../models/question';

export default function Options({
  question,
  onAnswer,
  answer,
}: {
  question: Question;
  onAnswer: (answer: number) => void;
  answer?: number | null;
}) {
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''} ${
            hasAnswered && (i === question.correctOption ? 'correct' : 'wrong')
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => onAnswer(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
