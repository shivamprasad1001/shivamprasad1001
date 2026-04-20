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
import PapersPage from './src/components/PapersPage';
import NotFound from './src/components/NotFound';
import { Analytics } from "@vercel/analytics/react"
import GwenWidget from './src/components/GwenWidget';

const usePathname = () => {
  const [pathname, setPathname] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return pathname;
};

const App: React.FC = () => {
  const pathname = usePathname();

  if (pathname === '/papers' || pathname === '/papers/') {
    return (
      <AppWrapper>
        <SEO
          title="Shivam Prasad - Research Papers"
          description="Read research papers and research-in-progress by Shivam Prasad, including collaborative AI/ML work and future paper uploads."
          keywords="Shivam Prasad papers, AI ML papers, research portfolio, machine learning paper"
          url="https://shivamprasad1001.vercel.app/papers"
        />
        <div className="overflow-x-hidden bg-[#FAF7F2] text-[#2C2825]">
          <CustomCursor />
          <PapersPage />
          <Analytics />
        </div>
      </AppWrapper>
    );
  }

  if (pathname !== '/') {
    return (
      <AppWrapper>
        <NotFound />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <SEO />
      <div className="overflow-x-hidden bg-[#FAF7F2] text-[#2C2825]">
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
        <GwenWidget />
      </div>
    </AppWrapper>
  );
};

export default App;
