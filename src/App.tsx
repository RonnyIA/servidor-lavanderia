import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import WelcomeScreen from './components/WelcomeScreen';
import DownloadGuide from './components/DownloadGuide';
import DemoApp from './components/DemoApp';
import RemoteMonitor from './components/RemoteMonitor';
import ThemeTransitionOverlay from './components/ThemeTransitionOverlay';

export default function App() {
  const [activeView, setActiveView] = useState<'presentation' | 'demo' | 'remote' | 'download'>('presentation');

  // Theme State (Light / Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('lavanderia_theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isThemeChanging, setIsThemeChanging] = useState<boolean>(false);
  const [targetTheme, setTargetTheme] = useState<'light' | 'dark'>(theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('lavanderia_theme', theme);
  }, [theme]);

  // Update browser document.title when active view changes
  useEffect(() => {
    switch (activeView) {
      case 'demo':
        document.title = 'Demo - Lavanderia Pro';
        break;
      case 'remote':
        document.title = 'Monitor Remoto - Lavanderia Pro';
        break;
      case 'download':
        document.title = 'Descargas - Lavanderia Pro';
        break;
      case 'presentation':
      default:
        document.title = 'Lavanderia Pro';
        break;
    }
  }, [activeView]);

  const toggleTheme = () => {
    if (isThemeChanging) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTargetTheme(nextTheme);
    setIsThemeChanging(true);

    // Apply dark/light class behind the spinner overlay after it is visible
    setTimeout(() => {
      setTheme(nextTheme);
    }, 150);

    // Keep spinner visible for 1.8s so theme switch is smooth
    setTimeout(() => {
      setIsThemeChanging(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b101d] transition-colors duration-300">
      <ThemeTransitionOverlay isVisible={isThemeChanging} targetTheme={targetTheme} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'none' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full"
        >
          {activeView === 'presentation' ? (
            <WelcomeScreen 
              theme={theme} 
              onToggleTheme={toggleTheme} 
              onOpenDemo={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveView('demo');
              }}
              onOpenRemoteMonitor={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveView('remote');
              }}
              onOpenDownloadGuide={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveView('download');
              }} 
            />
          ) : activeView === 'demo' ? (
            <DemoApp
              theme={theme}
              onToggleTheme={toggleTheme}
              onOpenDownloadGuide={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveView('download');
              }}
              onBackToPresentation={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveView('presentation');
              }}
            />
          ) : activeView === 'remote' ? (
            <RemoteMonitor
              theme={theme}
              onToggleTheme={toggleTheme}
              onBackToPresentation={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveView('presentation');
              }}
            />
          ) : (
            <DownloadGuide 
              theme={theme} 
              onToggleTheme={toggleTheme} 
              onBackToPresentation={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveView('presentation');
              }} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
