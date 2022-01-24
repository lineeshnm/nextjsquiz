import React from 'react';
import Head from 'next/head'
import { Header, Footer } from '.';
const APP_NAME = process.env.APP_NAME

const Layout = ({ children }) => (
  <>
    <Head>
      <title>{APP_NAME}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="flex flex-col min-h-screen ">
      {children}
    </div>
    <Footer />
  </>
);

export default Layout;