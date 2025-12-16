import React from 'react';
import Header from './Header';
import Main from './components/Main';

export default function App() {
  return (
    <div className='app'>
      <Header />
      <Main>
        <p>hello world</p>
      </Main>
    </div>
  );
}
