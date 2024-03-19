import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './components/Main';
import Questions, { ActionType, QuestionStatus } from './providers/questions';
import Question from './models/question';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './components/StartScreen';
import QuestionComp from './components/Question';

interface State {
  questions: Question[];
  status: QuestionStatus;
}

type Action = { type: ActionType; payload: Question[] };

const initialState = {
  questions: [],
  //loading, error, ready,active,finished
  status: QuestionStatus.loading,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.received:
      return {
        questions: action.payload,
        status: QuestionStatus.ready,
      };

    case ActionType.failed:
      return {
        questions: action.payload,
        status: QuestionStatus.error,
      };
    case ActionType.start:
      return {
        questions: action.payload,
        status: QuestionStatus.active,
      };
    default:
      return {
        questions: action.payload,
        status: QuestionStatus.error,
      };
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Questions.getQuestions()
      .then((res: Question[]) => {
        dispatch({ type: ActionType.received, payload: res });
      })
      .catch((err) => dispatch({ type: ActionType.failed, payload: [] }));
  }, []);

  function startQuiz() {
    dispatch({ type: ActionType.start, payload: state.questions });
  }

  return (
    <div className='app'>
      <Header />
      <Main>
        {state.status === QuestionStatus.loading && <Loader />}
        {state.status === QuestionStatus.error && <Error />}
        {state.status === QuestionStatus.ready && (
          <StartScreen
            numOfQuestions={state.questions.length}
            onStart={startQuiz}
          />
        )}
        {state.status === QuestionStatus.active && <QuestionComp />}
      </Main>
    </div>
  );
}
