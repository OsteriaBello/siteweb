import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';

// Composant pour initialiser les animations au scroll
function ScrollObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    });

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

// Wrapper component
function Root() {
  return (
    <StrictMode>
      <LanguageProvider>
        <ScrollObserver />
        <App />
      </LanguageProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);