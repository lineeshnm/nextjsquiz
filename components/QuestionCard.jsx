import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const QuestionCard = ({question, selectedAnswer}) => {
  return (
    <div className='h-96 glass-item mx-6 px-6 py-2 text-lg'>Question {question.questionNumber} : {question.question}
        <div className='py-3 flex gap-6 grid-flow-row h-[40%] justify-center items-center '>
            <div className='bg-green-400 quiz-answer-card' onClick={() => selectedAnswer("A")}>{question.options[0]}</div>
            <div className='bg-red-400 quiz-answer-card' onClick={() => selectedAnswer("B")}>{question.options[1]}</div>
        </div>
        <div className='py-3 flex gap-6 grid-flow-row h-[40%] justify-center'>                                                
            <div className='bg-yellow-400 quiz-answer-card' onClick={() => selectedAnswer("C")}>{question.options[2]}</div>
            <div className='bg-blue-400 quiz-answer-card' onClick={() => selectedAnswer("D")}>{question.options[3]}</div>
        </div>
    </div>
  )
};

export default QuestionCard;
