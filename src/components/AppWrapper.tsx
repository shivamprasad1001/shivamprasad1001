import React, { useState } from 'react';
import WelcomeIntro from './WelcomeIntro';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <WelcomeIntro onComplete={() => setIntroComplete(true)} />}
      {children}
    </>
  );
};

export default AppWrapper;
