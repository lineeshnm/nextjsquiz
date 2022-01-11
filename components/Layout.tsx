import React from 'react';
import { Header, Footer } from '.';

const Layout: React.FC = ({ children }) => (
  <>
      <Header />
      <div className="flex flex-col min-h-screen ">
        {children}
      </div>
      <Footer />
  </>
);

export default Layout;