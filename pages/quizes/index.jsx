import React from 'react';
import { QuizLink } from '../../components';
import Typography from '@mui/material/Typography';

const APP_NAME = process.env.APP_NAME
const URL = process.env.URL

const Index = ({quizes}) => {
    
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
        <div className='flex-grow px-12 pt-40 w-screen'>
            {
                quizes && (
                    <>
                        <div className="text-center h-full text-4xl font-semibold py-2 glass-item">
                            {APP_NAME} - List of Quizes
                        </div>
                        <div className='grid grid-cols-6 grid-rows-5 gap-2 grid-flow-col py-12'>
                            <div className='col-start-1 col-span-2 row-start-1 row-span-5 overflow-auto glass-item'>
                                <Typography variant="h6" className='text-center pt-6'>Expired Quizs</Typography>
                                { quizes && quizes.map((quiz, index) => {
                                    if (compareDate(quiz.endDate) === -1) {
                                        return(
                                            <QuizLink key={index} quiz={quiz} />
                                        )
                                    }
                                })}
                            </div>
                            <div className='col-start-3 col-span-2 row-start-1 row-span-5 overflow-auto glass-item'>
                                <Typography variant="h6" className='text-center pt-6'>Today's Quizes</Typography>
                                { quizes && quizes.map((quiz, index) => {
                                    if (quiz.endDate.split('T')[0] === new Date().toISOString().split('T')[0]) {
                                        return(
                                            <QuizLink key={index} quiz={quiz} />
                                        )
                                    }
                                })}
                            </div>
                            <div className='col-start-5 col-span-2 row-start-1 row-span-5 overflow-auto glass-item'>
                                <Typography variant="h6" className='text-center pt-6'>Upcoming Quizes</Typography>
                                { quizes && quizes.map((quiz, index) => {
                                    if (compareDate(quiz.endDate) === 1) {
                                        return(
                                            <QuizLink key={index} quiz={quiz} />
                                        )
                                    }
                                })}
                            </div>
                            <div className='h-24'></div>
                            <div className='h-24'></div>
                            <div className='h-24'></div>
                            <div className='h-24'></div>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Index;


export const getStaticProps = async (context) => {

    const res = await fetch(`${URL}/api/quizes/`)
    const data = await res.json()
    // console.log({data})
    if (!data.success) {
      return {
        notFound: true,
        revalidate: 10
      }
    }
    return {
      props: { quizes: data.data }, // will be passed to the page component as props
      revalidate: 10
    }
  }