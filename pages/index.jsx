import React from 'react'
import Typography from '@mui/material/Typography';

const URL = process.env.URL
const APP_NAME = process.env.APP_NAME

export default function Home({certs}) {
  // console.log({certs})
  return (
    <>
      <div className='flex-grow px-12 pt-40 w-screen'>
        <div className="text-center h-full text-4xl font-semibold py-2 glass-item">
          {APP_NAME} - Home Page
        </div>
        <ul className='grid grid-cols-6 grid-rows-5 gap-2 grid-flow-col py-12'>
          <li className='col-start-1 col-span-2 row-start-1 row-span-5 glass-item'>
            <Typography variant="h4" className='text-center pt-6'>Introduction</Typography>
            <Typography variant="h6" className='text-center pt-6'>Next JS based Quiz App</Typography>
            <Typography variant="body1" className='text-center pt-6'>A platform to create and share your Quizes</Typography>
            <Typography variant="body1" className='text-center pt-6'>Intented to use in Schools, Collages, Local Clubs, International Clubs</Typography>
          </li>
          <li className='col-start-3 col-span-2 row-start-1 row-span-5 glass-item'>
            <Typography variant="h4" className='text-center pt-6'>Features</Typography>
            <Typography variant="h6" className='text-center pt-6'>Standard Game</Typography>
            <Typography variant="body1" className='p-6'>Quiz doesn't have time limit. Can be used for Learning Purpose</Typography>
            <Typography variant="h6" className='text-center pt-6'>Scheduled Game</Typography>
            <Typography variant="body1" className='p-6'>You can build Quizes and Schedule it to run on a particular date and duration</Typography>
            <Typography variant="h6" className='text-center pt-6'>Timed Game</Typography>
            <Typography variant="body1" className='p-6'>This type of Quiz has timer running. If the timer ends, it will skip to next question. If answered within the time limit, the points will increase based on how quickly it was answered correctly</Typography>
          </li>
          <li className='col-start-5 col-span-2 row-start-1 row-span-5 glass-item'>
            <Typography variant="h4" className='text-center pt-6'>Getting Started</Typography>
            <Typography variant="h6" className='text-center pt-6'>Step1: SingUp</Typography>
            <Typography variant="h6" className='text-center pt-6'>Step2: SingIn</Typography>
            <Typography variant="h6" className='text-center pt-6'>Step3: Build a Quiz</Typography>
            <Typography variant="h6" className='text-center pt-6'>Step4: Review and Upload</Typography>
          </li>
          <li><div className='h-24'></div></li>
          <li><div className='h-24'></div></li>
          <li><div className='h-24'></div></li>
          <li><div className='h-24'></div></li>
        </ul>
      </div>
    </>
  )
}

export const getStaticProps = async (context) => {

  // const res = await fetch(`${URL}/api/certs`)
  // const data = await res.json()
  // console.log({data})
  // if (!data.success) {
    // return {
    //   notFound: true,
    //   revalidate: 10
    // }
  // }
  // return {
  //   props: { certs: data.data.filter(row => !row.hasOwnProperty('renew') && !row.hasOwnProperty('renewed') ) }, // will be passed to the page component as props
  //   revalidate: 10
  // }
   return {
    props: { quiz: [] }, // will be passed to the page component as props
    revalidate: 10
  }
}