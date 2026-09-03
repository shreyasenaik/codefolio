import React from 'react';
import MinimalistTemplate from './Minimalist/MinimalistTemplate.jsx';

// DefaultLayout acts as the rock-solid fallback layout when templateId is unrecognized
export const DefaultLayout = (props) => {
  return <MinimalistTemplate {...props} />;
};

export default DefaultLayout;
