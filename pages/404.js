import React from 'react';
import Background from '../components/Background';
import ContactCard from '../components/ContactCard';


const APP_NAME = process.env.APP_NAME

const Page404 = () => {
  return (
    <div className='flex-grow px-12 pt-40 w-screen'>
      <div className="text-center h-full text-4xl font-semibold py-2 glass-item">
        {APP_NAME} - Page not found
      </div>
      <div className='h-full w-full relative overflow-hidden flex justify-center py-6'>
        <ContactCard />
      </div>
    </div>
  )
};

export default Page404;
