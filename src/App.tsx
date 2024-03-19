import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './components/Main';
import Questions, { ActionType, QuestionStatus } from './providers/questions';
import Question from './models/question';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './components/StartScreen';
import QuestionComp from './components/question/Question';

type State = {
  questions: Question[];
  status: QuestionStatus;
  index: number;
};

type Action = { type: ActionType; payload: Question[] };

const initialState = {
  questions: [],
  status: QuestionStatus.loading,
  index: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.received:
      return {
        ...state,
        questions: action.payload,
        status: QuestionStatus.ready,
        index: 0,
      };

    case ActionType.failed:
      return {
        ...state,
        questions: action.payload,
        status: QuestionStatus.error,
        index: 0,
      };
    case ActionType.start:
      return {
        ...state,
        questions: action.payload,
        status: QuestionStatus.active,
        index: 0,
      };
    default:
      return {
        ...state,
        questions: action.payload,
        status: QuestionStatus.error,
        index: 0,
      };
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    Questions.getQuestions()
      .then((res: Question[]) => {
        dispatch({ type: ActionType.received, payload: res });
      })
      .catch((err) => dispatch({ type: ActionType.failed, payload: [] }));
  }, []);

  function startQuiz() {
    dispatch({ type: ActionType.start, payload: questions });
  }

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === QuestionStatus.loading && <Loader />}
        {status === QuestionStatus.error && <Error />}
        {status === QuestionStatus.ready && (
          <StartScreen numOfQuestions={questions.length} onStart={startQuiz} />
        )}
        {status === QuestionStatus.active && (
          <QuestionComp question={questions[index]} />
        )}
      </Main>
    </div>
  );
}
