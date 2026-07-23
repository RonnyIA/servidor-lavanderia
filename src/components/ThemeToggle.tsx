import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export default function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      type="button"
      className={`relative inline-flex items-center h-8 w-14 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:ring-offset-2 shrink-0 ${
        isDark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-200 border border-slate-300'
      } ${className}`}
      title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
      aria-label="Cambiar modo oscuro/claro"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Sliding thumb */}
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full transform transition-transform duration-300 shadow-md ${
          isDark 
            ? 'translate-x-6 bg-[#0052cc] text-amber-300' 
            : 'translate-x-0 bg-white text-amber-500'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 stroke-[2.5]" />
        ) : (
          <Sun className="w-3.5 h-3.5 stroke-[2.5]" />
        )}
      </span>

      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun className={`w-3.5 h-3.5 text-amber-500 transition-opacity duration-200 ${isDark ? 'opacity-40' : 'opacity-0'}`} />
        <Moon className={`w-3.5 h-3.5 text-indigo-300 transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-40'}`} />
      </div>
    </button>
  );
}
