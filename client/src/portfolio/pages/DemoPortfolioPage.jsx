import React from 'react';
import { useParams } from 'react-router-dom';
import PublicPortfolioPage from './PublicPortfolioPage.jsx';

export const DemoPortfolioPage = ({ defaultDemo = 'demo1' }) => {
  const { demoId } = useParams();
  const activeDemo = demoId || defaultDemo;

  // Render the public portfolio page with target demo username
  return <PublicPortfolioPage key={activeDemo} />;
};

export default DemoPortfolioPage;
