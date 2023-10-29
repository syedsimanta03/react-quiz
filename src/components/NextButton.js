
const NextButton = ({ dispatch, answer }) => {
  if(answer === null) return null
  return <button onClick={() => dispatch({type: "nextQuestion"})} className="btn btn-ui">NextButton</button>
}

export default NextButton