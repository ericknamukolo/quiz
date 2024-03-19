import React from 'react';
import './../index.css';

export default function StartScreen({
  numOfQuestions,
}: {
  numOfQuestions: number;
}) {
  return (
    <div className='start'>
      <h2>Welcome to the Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button className='btn btn-ui'>Let's start</button>
    </div>
  );
}
