import React from 'react';
import './../index.css';

export default function StartScreen({
  numOfQuestions,
  onStart,
}: {
  numOfQuestions: number;
  onStart: () => void;
}) {
  return (
    <div className='start'>
      <h2>Welcome to the Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button className='btn btn-ui' onClick={onStart}>
        Let's start
      </button>
    </div>
  );
}
