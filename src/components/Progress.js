

const Progress = ({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}) => {
  return (
    <header className='progress'>
      {/* convert boolean to number, if false, then false=0, if true then true = 1 */}
      <progress value={index + Number(answer !== null)} max={maxPossiblePoints} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}

export default Progress