import React from 'react';
import Background from '../components/Background';
import ContactCard from '../components/ContactCard';


const APP_NAME = process.env.APP_NAME

const Page404 = () => {
  return (
    <div className='page-banner-container'>
      <div className="page-banner">
        {APP_NAME} - Page not found
      </div>
      <div className='h-full w-full relative overflow-hidden flex justify-center py-6'>
        <ContactCard />
      </div>
    </div>
  )
};

export default Page404;
