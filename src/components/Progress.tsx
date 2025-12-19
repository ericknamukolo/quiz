import React from 'react';
import Question from '../models/question';

export default function Progress({
  currentQuestion,
  questions,
  score,
  answer,
}: {
  currentQuestion: number;
  questions: Question[];
  score: number;
  answer: number | null;
}) {
  return (
    <header className='progress'>
      <progress
        max={questions.length}
        value={answer === null ? currentQuestion : currentQuestion + 1}
      ></progress>
      <p>
        Question <strong>{currentQuestion}</strong> / {questions.length}
      </p>

      <p>
        <strong>{score}</strong> /
        {questions.reduce((total, val) => {
          return total + val.points;
        }, 0)}{' '}
        points
      </p>
    </header>
  );
}
