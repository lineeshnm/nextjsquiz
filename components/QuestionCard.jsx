import React from 'react';

const QuestionCard = ({question, selectedAnswer}) => {
  return (
    <div className='quiz-question-card'>Question {question.questionNumber} : {question.question}
        <div className='question-card-container items-center '>
            <div className='bg-green-400 quiz-answer-card' onClick={() => selectedAnswer("A")}>{question.options[0]}</div>
            <div className='bg-red-400 quiz-answer-card' onClick={() => selectedAnswer("B")}>{question.options[1]}</div>
        </div>
        <div className='question-card-container'>                                                
            <div className='bg-yellow-400 quiz-answer-card' onClick={() => selectedAnswer("C")}>{question.options[2]}</div>
            <div className='bg-blue-400 quiz-answer-card' onClick={() => selectedAnswer("D")}>{question.options[3]}</div>
        </div>
    </div>
  )
};

export default QuestionCard;
