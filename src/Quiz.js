import React, {useState, useEffect} from 'react';
import './Quiz.css';
import Start from './Quiz-components/Start/Start';
import QuestionBox from './Quiz-components/QuestionBox/QuestionBox';
import End from './Quiz-components/End/End';
import Modal from './Quiz-components/Modal';

import QuizData from './Quiz-components/Data/QuizData';
 
import 'bulma/css/bulma.min.css';
let interval;

function Quiz() {
  const [step, setStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
   if( step === 2){
     clearInterval(interval)
   }
  }, [step])

 


  const quizStarterHandler = () =>{
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000)
  }

  const resetQuizHandler = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setStep(1);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  return (
    <>
    
    <div className="App">
      
     { step === 1 && <Start onQuizStart ={quizStarterHandler}
     numberOfQuestions = {QuizData.length}
      />}
     { step === 2 && <QuestionBox
     data = {QuizData[currentQuestion]}
     onAnswerUpdate = {setAnswers}
     numberOfQuestions = {QuizData.length}
     currentQuestion = {currentQuestion}
     onSetCurrentQuestion = {setCurrentQuestion}
     onSetStep = {setStep} />}
     { step === 3 && <End 
     results ={answers}
     data = {QuizData}
     onReset = {resetQuizHandler}
     onAnswerCheck ={() => setShowModal(true)}
     time ={time}
     />}

     {showModal && <Modal 
     onClose = {() => setShowModal(false) } 
     results = {answers}
     data = {QuizData}
     />}
    </div>
    </>
  );
}

export default Quiz;
