const FinishScreen = ({
  points,
  maxPossiblePoints,
  highscore,
  dispatch
}) => {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100)

  let emoji

  if (percentage === 100) emoji = '🥇'
  if (percentage >= 80 && percentage < 100) emoji = '🎉'
  if (percentage >= 50 && percentage < 80) emoji = '🙃'
  if (percentage >= 0 && percentage < 50) emoji = '🤨'
  if (percentage === 0) emoji = '🤦‍♂️'

  return (
    <>
      <p className='result'>
        {emoji} You scored <strong>{points}</strong> out of {percentage}
      </p>
      <p className='highscore'>{highscore}</p>
        <button
          onClick={() => dispatch({ type: 'reset' })}
          className='btn btn-ui'
        >
          Reset
        </button>
    </>
  )
}

export default FinishScreen
