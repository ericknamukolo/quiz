import React from 'react';

export default function FinishScreen({
  points,
  max,
  highscore,
  onRestart,
}: {
  points: number;
  max: number;
  highscore: number;
  onRestart: () => void;
}) {
  const percentage = (points / max) * 100;
  return (
    <>
      <p className='result'>
        You scored <strong>{points}</strong> points out of {max} (
        {Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>

      <button className='btn btn-ui' onClick={onRestart}>
        Restart
      </button>
    </>
  );
}
