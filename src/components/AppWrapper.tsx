import React, { useState, useEffect } from 'react';
import WelcomeIntro from './WelcomeIntro';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const scrollToMain = () => {
    const mainSection = document.getElementById('main-header');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <WelcomeIntro onComplete={scrollToMain} />
      {children}
    </>
  );
};

export default AppWrapper;