import React, { useEffect, useState } from 'react';
import { QuizLink } from '../../components';
import Typography from '@mui/material/Typography';
import { getQuizes } from '../../utils/dbUtils';

const APP_NAME = process.env.APP_NAME

const Index = () => {

    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        getQuizes().then(data => {
            console.log({ data })
            setQuizes(data)
        })
        return () => {
            console.log("unmounted from useEffect")
        };
    }, []);

    const compareDate = (date) => {
        const today = new Date().toISOString().split('T')[0].split('-')
        const quizday = date.split('T')[0].split('-')
        if (parseInt(quizday[0]) < parseInt(today[0])) return -1 
        if (parseInt(quizday[0]) > parseInt(today[0])) return 1
        if (parseInt(quizday[1]) < parseInt(today[1])) return -1 
        if (parseInt(quizday[1]) > parseInt(today[1])) return 1 
        if (parseInt(quizday[2]) < parseInt(today[2])) return -1 
        if (parseInt(quizday[2]) > parseInt(today[2])) return 1 
        return 0
    }
    
    return (
        <div className='page-banner-container'>
            {
                quizes && (
                    <>
                        <div className="page-banner">
                            {APP_NAME} - List of Quizes
                        </div>
                        <div className='grid-container'>
                            <div className='grid-item'>
                                <div className='grid-item-h4'>Expired Quizs</div>
                                { quizes && quizes.map((quiz, index) => {
                                    if (compareDate(quiz.endDate) === -1) {
                                        return(
                                            <QuizLink key={index} quiz={quiz} />
                                        )
                                    }
                                })}
                            </div>
                            <div className='grid-item'>
                                <div className='grid-item-h4'>Today's Quizes</div>
                                { quizes && quizes.map((quiz, index) => {
                                    if (quiz.endDate.split('T')[0] === new Date().toISOString().split('T')[0]) {
                                        return(
                                            <QuizLink key={index} quiz={quiz} />
                                        )
                                    }
                                })}
                            </div>
                            <div className='grid-item'>
                                <div className='grid-item-h4'>Upcoming Quizes</div>
                                { quizes && quizes.map((quiz, index) => {
                                    if (compareDate(quiz.endDate) === 1) {
                                        return(
                                            <QuizLink key={index} quiz={quiz} />
                                        )
                                    }
                                })}
                            </div>
                            <div className='h-24 sm:h-0'></div>
                            <div className='h-24 sm:h-0'></div>
                            <div className='h-24 sm:h-0'></div>
                            <div className='h-24 sm:h-0'></div>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Index;
