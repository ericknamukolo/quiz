import Question from '../../models/question';
import Options from './Options';

export default function QuestionComp({ question }: { question: Question }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
