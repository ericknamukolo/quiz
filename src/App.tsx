import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './components/Main';
import Question from './models/question';
import Questions, { ActionType, Status } from './providers/questions';
import Loader from './Loader';
import ErrorComp from './Error';
import StartScreen from './components/StartScreen';
import QuestionComp from './components/question/Question';

const initialState = {
  questions: [] as Question[],
  status: Status.loading,
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state: any, action: any) {
  if (action.type === ActionType.dataReceived) {
    return {
      ...state,
      questions: action.payload,
      status: Status.complete,
    };
  } else if (action.type === ActionType.dataFailed) {
    return {
      ...state,
      status: Status.error,
    };
  } else if (action.type === ActionType.quizStarted) {
    return {
      ...state,
      status: Status.active,
    };
  } else if (action.type === ActionType.newAnswer) {
    const question: Question = state.questions[state.index];
    return {
      ...state,
      answer: action.payload,
      points:
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
    };
  } else if (action.type === ActionType.nextQuestion) {
    return {
      ...state,
      index: state.index + 1,
      answer: null,
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
      const questions: Question[] = await Questions.getQuestions();
      dispatch({ type: ActionType.dataReceived, payload: questions });
    } catch (e) {
      dispatch({ type: ActionType.dataFailed });
    }
  }

  function onStartQuiz() {
    dispatch({ type: ActionType.quizStarted });
  }

  function nextQuestion() {
    dispatch({ type: ActionType.nextQuestion });
  }

  function onAnswered(newAnswer: number) {
    dispatch({ type: ActionType.newAnswer, payload: newAnswer });
  }

  return (
    <div className='app'>
      <Header />
      <Main>
        {state.status === Status.loading && <Loader />}
        {state.status === Status.error && <ErrorComp />}
        {state.status === Status.active && (
          <QuestionComp
            question={state.questions[state.index]}
            onAnswer={(answer: number) => onAnswered(answer)}
            answer={state.answer}
            onNext={nextQuestion}
          />
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
