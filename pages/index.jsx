import React from 'react'
import Typography from '@mui/material/Typography';
import Link from 'next/link'

const APP_NAME = process.env.APP_NAME

export default function Home({certs}) {
  // console.log({certs})
  return (
    <>
      <div className='page-banner-container'>
        <div className="page-banner">
          {APP_NAME} - Home Page
        </div>
        <ul className='grid-container'>
          <li className='grid-item'>
            <div className='grid-item-h4'>Introduction</div>
            <div className='grid-item-h6'>Next JS based Quiz App</div>
            <div className='grid-item-body1'>A platform to create and share your Quizes</div>
            <div className='grid-item-body1'>Intented to use in Schools, Collages, Local Clubs, International Clubs</div>
          </li>
          <li className='grid-item'>
            <div className='grid-item-h4'>Features</div>
            <div className='grid-item-h6'>Standard Game</div>
            <div className='grid-item-body1'>Quiz doesn't have time limit. Can be used for Learning Purpose</div>
            <div className='grid-item-h6'>Scheduled Game</div>
            <div className='grid-item-body1'>You can build Quizes and Schedule it to run on a particular date and duration</div>
            <div className='grid-item-h6'>Timed Game</div>
            <div className='grid-item-body1'>This type of Quiz has timer running. If the timer ends, it will skip to next question. If answered within the time limit, the points will increase based on how quickly it was answered correctly</div>
          </li>
          <li className='grid-item'>
            <div className='grid-item-h4'>Getting Started</div>
            <div className="grid-item-body1"><Link href="/signup" ><a >Step1: SignUp</a></Link></div>
            <div className="grid-item-body1"><Link href="/signin" ><a >Step2: SingIn</a></Link></div>
            <div className="grid-item-body1"><Link href="/createquiz" ><a >Step3: Build a Quiz</a></Link></div>
            <div className="grid-item-body1">Step4: Review and Upload</div>
          </li>
          <li className='sm:h-0'><div className='grid-placeholder'></div></li>
          <li className='sm:h-0'><div className='grid-placeholder'></div></li>
          <li className='sm:h-0'><div className='grid-placeholder'></div></li>
          <li className='sm:h-0'><div className='grid-placeholder'></div></li>
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