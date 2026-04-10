import React from 'react';
import AppWrapper from './src/components/AppWrapper';
import Header from './src/components/Header';
import Services from './src/components/Services';
import Biography from './src/components/Biography';
import Achievements from './src/components/Achievements';
import FeaturedWorks from './src/components/FeaturedWorks';
import WorkExperience from './src/components/WorkExperience';
import Blog from './src/components/Blog';
import Footer from './src/components/Footer';
import ContactForm from './src/components/ContactForm';
import SEO from './src/components/SEO';
import SkillsRadar from './src/components/SkillsRadar';
import CustomCursor from './src/components/CustomCursor';
import BackToTop from './src/components/BackToTop';
import { Analytics } from "@vercel/analytics/react"


const App: React.FC = () => {
  return (
    <AppWrapper>
      <SEO />
      <div className="overflow-x-hidden bg-white text-slate-900">
        <CustomCursor />
        <Header />
        <main>
          <Biography />
          <SkillsRadar />
          <Achievements />
          <Services />
          <FeaturedWorks />
          <WorkExperience />
          {/* <Testimonials /> */}
          <Blog />
          <ContactForm />
        </main>
        <Footer />
        <BackToTop />
        <Analytics />
        {/* <Chatbot /> */}
      </div>
    </AppWrapper>
  );
};

export default App;
