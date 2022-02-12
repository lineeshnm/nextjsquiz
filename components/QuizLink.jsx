import React from 'react';
import Link from 'next/link'
import Typography from '@mui/material/Typography';

const Quizlink = ({quiz}) => {
    return (
        <div className='m-6 p-6 glass-item'>
            <Link key={quiz.slug} href={`/quizes/${quiz.slug}`}>
                <a className="">
                    {quiz.quizName}
                </a>
            </Link>
        </div>
    );
}

export default Quizlink;
