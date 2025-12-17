import React from 'react';
import AppWrapper from './src/components/AppWrapper';
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
import ContactForm from './src/components/ContactForm';
import SEO from './src/components/SEO';
import SkillsRadar from './src/components/SkillsRadar';
import { Analytics } from "@vercel/analytics/react"


const App: React.FC = () => {
  return (
    <AppWrapper>
      <SEO />
      <div className="bg-[#FDFDFD] dark:bg-gray-900 text-gray-700 dark:text-gray-300 overflow-x-hidden">
        <Header />
        <main>
          <Biography />
          <SkillsRadar />
          <Achievements />
          <FeaturedWorks />
          <WorkExperience />
          {/* <Testimonials /> */}
          <Blog />
          <ContactForm />
        </main>
        <Footer />
        <Analytics />
        {/* <Chatbot /> */}
      </div>
    </AppWrapper>
  );
};

export default App;