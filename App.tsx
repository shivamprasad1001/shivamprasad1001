import React from 'react';
import Header from './src/components/Header';
import Services from './src/components/Services';
import Biography from './src/components/Biography';
import Achievements from './src/components/Achievements';
import FeaturedWorks from './src/components/FeaturedWorks';
import WorkExperience from './src/components/WorkExperience';
import Testimonials from './src/components/Testimonials';
import Blog from './src/components/Blog';
import Footer from './src/components/Footer';
import Chatbot from './src/components/Chatbot';
import { Analytics } from "@vercel/analytics/react"


const App: React.FC = () => {
  return (
    <div className="bg-[#FDFDFD] dark:bg-gray-900 text-gray-700 dark:text-gray-300 overflow-x-hidden">
      <Header />
      <main>
        <Biography />
        <Achievements />
        <FeaturedWorks />
        <WorkExperience />
        {/* <Testimonials /> */}
        <Blog />
      </main>
      <Footer />
      <Analytics />
      {/* <Chatbot /> */}
    </div>
  );
};

export default App;