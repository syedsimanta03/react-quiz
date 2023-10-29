const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null

  return (
    <div>
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          key={index}
          disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
