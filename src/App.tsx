import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './components/Main';
import Question from './models/question';
import { Status } from './providers/questions';
import Loader from './Loader';
import ErrorComp from './Error';
import StartScreen from './components/StartScreen';
import QuestionComp from './components/question/Question';

const initialState = {
  questions: [] as Question[],
  status: Status.loading,
  index: 0,
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
  } else if (action.type === 'quizStarted') {
    return {
      ...state,
      status: Status.active,
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

  function onStartQuiz() {
    dispatch({ type: 'quizStarted' });
  }

  return (
    <div className='app'>
      <Header />
      <Main>
        {state.status === Status.loading && <Loader />}
        {state.status === Status.error && <ErrorComp />}
        {state.status === Status.active && (
          <QuestionComp question={state.questions[state.index]} />
        )}
        {state.status === Status.complete && (
          <StartScreen
            numOfQuestions={state.questions.length}
            onStart={onStartQuiz}
          />
        )}
      </Main>
    </div>
  );
}
