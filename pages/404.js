import React from 'react';
import ContactCard from '../components/ContactCard';


const APP_NAME = process.env.APP_NAME

const Page404 = () => {
  return (
    <div className='flex-grow px-12'>
      <div className="text-center h-full text-4xl font-semibold text-white mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {APP_NAME} - Page not found
      </div>
      <ContactCard />
    </div>
  )
};

export default Page404;
