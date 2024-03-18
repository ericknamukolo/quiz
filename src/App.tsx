import React, { useEffect } from 'react';
import Header from './Header';
import Main from './components/Main';
import Questions from './providers/questions';

export default function App() {
  useEffect(() => {
    Questions.getQuestions().then((res: Questions[]) => {
      console.log(res);
    });
  });

  return (
    <div className='app'>
      <Header />
      <Main>
        <h1>Hello world</h1>
      </Main>
    </div>
  );
}
