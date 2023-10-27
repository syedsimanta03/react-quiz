import React, { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader';
import Error from './Error';


const initialState = {
  questions: [],
  status: 'loading',
  error: null,
}

// action can also take data from initial satate at the same time like status
const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }

    case 'dataFailed':
      return { ...state, status: 'error' }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const App = () => {
  
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)
 // const [state, dispatch] = useReducer(reducer, initialState)

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
        {status === 'error' && <Error/>}
      </Main>
    </div>
  )
}

export default App
