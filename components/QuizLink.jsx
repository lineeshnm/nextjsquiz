import React from 'react';
import Link from 'next/link'

const Quizlink = ({quiz}) => {
    return (
        <div className='quizes glass-item'>
            <Link key={quiz.slug} href={`/quizes/${quiz.slug}`}>
                <a className="">
                    {quiz.quizName}
                </a>
            </Link>
        </div>
    );
}

export default Quizlink;
