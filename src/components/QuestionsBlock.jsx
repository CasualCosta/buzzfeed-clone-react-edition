import React from 'react'
import Alternative from './Alternative'

const QuestionsBlock = ({ quizItem, addAnswer, answers, answeredQuestionIds, id }) => {
  return (
    <>
      <h2 className='question-title' id={id}>{quizItem.text}</h2>
      <div className="question-container">
        <div className="questions-container">
          {quizItem.questions.map((question, index) => (
            <Alternative
              key={index}
              quizItemId={quizItem.id}
              question={question}
              addAnswer={addAnswer}
              answers={answers}
              answeredQuestionIds={answeredQuestionIds}
            />
          ))}
        </div>
</div>
  </>
  )
}

export default QuestionsBlock