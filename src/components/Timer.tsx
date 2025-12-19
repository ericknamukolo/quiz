import React, { useEffect } from 'react';

export default function Timer({
  onTick,
  seconds,
}: {
  onTick: () => void;
  seconds: number;
}) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  useEffect(() => {
    const id = setInterval(function () {
      onTick();
    }, 1000);

    return () => clearInterval(id);
  }, [onTick]);
  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins} : {secs}
    </div>
  );
}
