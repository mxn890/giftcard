
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-light-gray">
      
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
