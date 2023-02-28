import React from 'react'

const Alternative = ({quizItemId, question, addAnswer, answers, answeredQuestionIds}) => {

  const handleClick = () => {
    addAnswer(question.text, quizItemId)
  }
  return (
    <button
      className='alternative'
      onClick={handleClick}
      disabled={!answers.includes(question.text) && 
        answeredQuestionIds.includes(quizItemId)}
    >
      <img src={question.image} alt={question.alt} />
      <h3>{question.text}</h3>
      <p>
        <a href={question.image}>{question.credit} </a>
        <a href="https://www.unsplash.com">Unsplash</a>
      </p>
    </button>
  )
}

export default Alternative