import React, { useEffect } from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';

export default function AdminStudio() {
  // Ensure the body has no global styles that conflict with Sanity Studio
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Studio config={config} />
    </div>
  );
}
