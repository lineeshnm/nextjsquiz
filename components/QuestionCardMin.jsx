import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const QuestionCardMin = ({question, index, deleteQuestion}) => {
  return (
    <div className='h-24 glass-item text-xs px-5 py-2'>Question {index+1} : {question.question}
        <div className='pt-2 grid grid-cols-9 grid-row-2 gap-2 grid-flow-row'>
            <div className='col-span-4'>Option A: {question.options[0]}</div>
            <div className='col-span-4'>Option B: {question.options[1]}</div>    
            <div className='row-span-2'>
                <Tooltip title="Delete This Question">
                    <IconButton onClick={() => deleteQuestion(question)}>
                        <DeleteIcon variant="contained" className='bg-orange-500 hover:bg-red-700 h-6 w-6 md:h-8 md:w-8 sm:h-6 sm:w-6 rounded-full' />
                    </IconButton>
                </Tooltip>
            </div>                                                
            <div className='col-span-4'>Option C: {question.options[2]}</div>
            <div className='col-span-4'>Option D: {question.options[3]}</div>                          
        </div>
    </div>
  )
};

export default QuestionCardMin;
