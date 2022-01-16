import React from 'react';
import Head from 'next/head'
import { Header, Footer } from '.';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>App Hosting Certificate Portal</title>
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