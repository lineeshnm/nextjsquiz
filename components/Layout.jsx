import React from 'react';
import Head from 'next/head'
import { Header, Footer } from '.';
import Background from './Background';
const APP_NAME = process.env.APP_NAME

const Layout = ({ children }) => (
  <>
    <div className='bg-gray-900 min-h-screen flex flex-col items-center justify-center px-16'>
      {/* <div className='w-full max-w-lg overflow-hidden'> */}
        <Head>
          <title>{APP_NAME}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Background />
        <Header />
        {children }
        <Footer />
      {/* </div> */}
    </div>
  </>
);

export default Layout;