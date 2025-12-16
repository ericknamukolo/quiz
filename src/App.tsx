import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './components/Main';
import Question from './models/question';
import { Status } from './providers/questions';
import Loader from './Loader';
import ErrorComp from './Error';
import StartScreen from './components/StartScreen';

const initialState = {
  questions: [] as Question[],
  status: Status.loading,
};

function reducer(state: any, action: any) {
  if (action.type === 'dataReceived') {
    return {
      ...state,
      questions: action.payload,
      status: Status.complete,
    };
  } else if (action.type === 'dataFailed') {
    return {
      ...state,
      status: Status.error,
    };
  } else {
    throw new Error('Unknown action type');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      var res = await fetch('http://localhost:8000/questions');
      const questions: Question[] = await res.json();
      dispatch({ type: 'dataReceived', payload: questions });
    } catch (e) {
      dispatch({ type: 'dataFailed' });
    }
  }

  return (
    <div className='app'>
      <Header />
      <Main>
        {state.status === Status.loading && <Loader />}
        {state.status === Status.error && <ErrorComp />}
        {state.status === Status.complete && (
          <StartScreen
            numOfQuestions={state.questions.length}
            onStart={() => {}}
          />
        )}
      </Main>
    </div>
  );
}
