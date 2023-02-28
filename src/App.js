import {React, useState, useEffect} from 'react'
import Answer from './components/Answer';
import QuestionsBlock from './components/QuestionsBlock';
import Title from './components/Title';

function App() {
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [answeredQuestionIds, setAnsweredQuestionsIds] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [result, setResult] = useState({})

  const addAnswer = (answer, id) => {
    let newArray = [...answers, answer]
    newArray.sort(function(a,b){return a- b})
    let newIds = [...answeredQuestionIds, id]
    newIds.sort(function(a, b){return a-b})
    setAnswers(newArray);
    setAnsweredQuestionsIds(newIds)
  }
  
  const fetchData = async () =>{
    try{
      const response = await fetch('http://localhost:8000/quiz')
      const json = await response.json()
      setQuiz(json)
    } catch (e) {
      console.log(e)
    }
  }

  const getResult = () => {
    for (let i = 0; i < quiz?.answers.length; i++) {
      const possibility = quiz.answers[i]
      if (answers.includes(possibility.combination[0]) &&
          answers.includes(possibility.combination[1]) &&
          answers.includes(possibility.combination[2])
      ) {
        setResult(possibility)
        return
      }
    }
    setResult(quiz.answers[0])
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if(answers.length === 0) {
      console.log("No answers found.")
      return;
    }
    let targetIndex
    let mismatch = false;
    for(let i = 0; i < answeredQuestionIds.length; i++) {
      if(i === answeredQuestionIds[i])
        continue;
      targetIndex = i;
      mismatch = true;
      break;
    }
    if(!mismatch)
      targetIndex = answeredQuestionIds.length
    const targetElement = document.getElementById(targetIndex)
    if(targetElement){
      targetElement.scrollIntoView({ behavior: 'smooth'})
      return;
    }
    setShowAnswer(true)
    getResult()

  }, [answeredQuestionIds, answers, quiz?.content.length])

  useEffect(() => {
    setTimeout(() => {
      const answerElement = document.getElementById('answer-block')
      answerElement?.scrollIntoView({ behavior: 'smooth'})
      console.log(answerElement)
    }, 1000);
  }, [showAnswer])
  
  

  return (
    <div className='app'>
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content.map((item) => (
        <QuestionsBlock 
          key={item.id} 
          quizItem={item} 
          addAnswer={addAnswer}
          answers={answers}
          answeredQuestionIds={answeredQuestionIds}
          id={item.id}
        />
      ))}
      {showAnswer === true && <Answer result={result} />}
    </div>
  );
}

export default App;
