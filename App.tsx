import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import SEO from './src/components/SEO';
import PapersPage from './src/components/PapersPage';
import NotFound from './src/components/NotFound';
import PortfolioHome from './src/components/PortfolioHome';

const App: React.FC = () => {
  const pathname = window.location.pathname;

  if (pathname === '/papers' || pathname === '/papers/') {
    return <><SEO title="Shivam Prasad — Research papers" /><PapersPage /><Analytics /></>;
  }

  if (pathname !== '/') return <NotFound />;

  return <><SEO /><PortfolioHome /><Analytics /></>;
};

export default App;
