import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './components/Main';
import Question from './models/question';
import Questions, { ActionType, Status } from './providers/questions';
import Loader from './Loader';
import ErrorComp from './Error';
import StartScreen from './components/StartScreen';
import QuestionComp from './components/question/Question';
import FinishScreen from './components/FinishScreen';

const initialState = {
  questions: [] as Question[],
  status: Status.loading,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 500,
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
  } else if (action.type === ActionType.restart) {
    return {
      ...state,
      index: 0,
      answer: null,
      status: Status.active,
      secondsRemaining: 500,
    };
  } else if (action.type === ActionType.tick) {
    return {
      ...state,
      secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining <= 0 ? Status.finished : Status.active,
    };
  } else if (action.type === ActionType.finished) {
    return {
      ...state,
      index: 0,
      answer: null,
      status: Status.finished,
      highscore:
        state.points > state.highscore ? state.points : state.highscore,
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

  function tick() {
    dispatch({ type: ActionType.tick });
  }

  function onFinishQuiz() {
    dispatch({ type: ActionType.finished });
  }

  function onRestart() {
    dispatch({ type: ActionType.restart });
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
            seconds={state.secondsRemaining}
            onTick={tick}
            question={state.questions[state.index]}
            onAnswer={(answer: number) => onAnswered(answer)}
            answer={state.answer}
            onNext={nextQuestion}
            currentQuestion={state.index + 1}
            questions={state.questions}
            score={state.points}
            onFinish={onFinishQuiz}
          />
        )}
        {state.status === Status.complete && (
          <StartScreen
            numOfQuestions={state.questions.length}
            onStart={onStartQuiz}
          />
        )}

        {state.status === Status.finished && (
          <FinishScreen
            points={state.points}
            max={state.questions.reduce((total: number, val: Question) => {
              return total + val.points;
            }, 0)}
            highscore={state.highscore}
            onRestart={onRestart}
          />
        )}
      </Main>
    </div>
  );
}
