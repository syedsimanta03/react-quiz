import React, { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
}

// action can also take data from initial satate at the same time like status
const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }

    case 'dataFailed':
      return { ...state, status: 'error' }

    case 'start':
      return { ...state, status: 'active' }

    case 'newAnswer':
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      }

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const App = () => {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  )
  // const [state, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main className='main'>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton status={status} dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  )
}

export default App
