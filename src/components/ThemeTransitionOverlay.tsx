import React from 'react';
import { createPortal } from 'react-dom';
import { Sun, Moon } from 'lucide-react';

interface ThemeTransitionOverlayProps {
  isVisible: boolean;
  targetTheme: 'light' | 'dark';
}

export default function ThemeTransitionOverlay({ isVisible, targetTheme }: ThemeTransitionOverlayProps) {
  if (!isVisible) return null;

  const isDark = targetTheme === 'dark';

  const bgColor = isDark ? '#0b0f19' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const subTextColor = isDark ? '#94a3b8' : '#64748b';
  const primaryRingColor = isDark ? '#60a5fa' : '#0052cc';
  const accentRingColor = isDark ? '#f59e0b' : '#6366f1';
  const dotColor = isDark ? '#60a5fa' : '#0052cc';

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-300"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      aria-live="polite"
      aria-label="Cambiando modo de pantalla"
    >
      <div className="relative flex flex-col items-center justify-center max-w-sm text-center">
        {/* Animated Outer Spinner & Centered Theme Icon */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer primary spinning ring */}
          <div
            className="w-20 h-20 rounded-full border-4 animate-spin"
            style={{
              borderColor: primaryRingColor,
              borderTopColor: 'transparent',
            }}
          />
          {/* Secondary counter-rotating accent ring */}
          <div
            className="absolute w-14 h-14 rounded-full border-2 animate-spin"
            style={{
              animationDirection: 'reverse',
              animationDuration: '1.2s',
              borderColor: accentRingColor,
              borderBottomColor: 'transparent',
            }}
          />

          {/* Center Sun / Moon Icon */}
          <div className="absolute flex items-center justify-center">
            {isDark ? (
              <Moon className="w-7 h-7 text-amber-300 animate-pulse stroke-[2.2]" />
            ) : (
              <Sun className="w-7 h-7 text-amber-500 animate-pulse stroke-[2.2]" />
            )}
          </div>
        </div>

        {/* Text Details */}
        <h3 className="text-lg font-bold tracking-tight mb-1" style={{ color: textColor }}>
          {isDark ? 'Cambiando a Modo Oscuro' : 'Cambiando a Modo Claro'}
        </h3>
        <p className="text-xs font-medium" style={{ color: subTextColor }}>
          Ajustando colores de la interfaz...
        </p>

        {/* Loading dots */}
        <div className="flex items-center gap-1.5 mt-4">
          <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: dotColor, animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: dotColor, animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: dotColor, animationDelay: '300ms' }} />
        </div>
      </div>
    </div>,
    document.body
  );
}
