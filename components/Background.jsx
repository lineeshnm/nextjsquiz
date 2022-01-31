import React from 'react';

const Background = () => {
  return (<>
    <div className="h-80-r w-80-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-1/3 -top-56 transform rotate-160 animate-pulse"></div>
    <div className="h-80-r w-80-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
  </>)
};

export default Background;
