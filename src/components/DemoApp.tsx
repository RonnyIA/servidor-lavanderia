import React from 'react';
import { 
  Download, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';

interface DemoAppProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenDownloadGuide: () => void;
  onBackToPresentation: () => void;
}

export default function DemoApp({
  onOpenDownloadGuide,
  onBackToPresentation
}: DemoAppProps) {
  return (
    <div className="h-screen bg-slate-100 dark:bg-[#0b101d] text-[#111c2d] dark:text-slate-100 font-sans antialiased flex flex-col relative overflow-hidden transition-colors duration-300">
      
      {/* 1. TOP DEMO RECOMMENDATION BANNER */}
      <div className="shrink-0 bg-gradient-to-r from-amber-500 via-orange-500 to-[#0052cc] text-white px-4 py-3 shadow-md flex flex-col lg:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium z-30">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Volver al inicio Button */}
          <button
            onClick={onBackToPresentation}
            className="px-3.5 py-1.5 rounded-xl bg-black/25 hover:bg-black/40 text-white font-bold transition-all shadow-sm text-xs flex items-center gap-2 shrink-0 cursor-pointer active:scale-95 border border-white/20 self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>

          <div className="flex items-center gap-2.5 text-left">
            <span className="px-2 py-0.5 rounded bg-black/20 text-white font-extrabold font-mono text-[11px] uppercase tracking-wider shrink-0">
              Modo Demo Activo
            </span>
            <p className="leading-tight text-xs sm:text-sm">
              Estás utilizando la versión de demostración en línea. Para operabilidad 100% offline, impresión física en tickets térmicos de 80mm y aperturas de cajón monedero, te recomendamos instalar la versión completa.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDownloadGuide}
          className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all shadow text-xs flex items-center gap-2 shrink-0 cursor-pointer active:scale-95 self-end lg:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#0052cc] stroke-[2.5]" />
          <span>Descargar Lavanderia Pro.exe</span>
        </button>
      </div>

      {/* 2. DEMO INTERACTIVO REAL (Lavandería Pro corriendo dentro de un iframe) */}
      <div className="flex-1 min-h-0 relative">
        <iframe
          src="/demo/index.html"
          title="Demo interactivo de Lavandería Pro"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>

      {/* 3. FLOATING DEMO RECOMMENDATION BOTTOM BAR */}
      <div className="shrink-0 z-30 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 py-3.5 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white fill-current" />
            </div>
            <div>
              <span className="font-bold text-blue-300 block">¿Te gustó el funcionamiento del sistema?</span>
              <p className="text-slate-300 text-[11px]">
                Instala la versión ejecutable oficial para Windows para uso diario sin depender de internet.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDownloadGuide}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0052cc] to-blue-600 hover:from-[#0041a3] hover:to-blue-700 text-white font-extrabold shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Descargar Versión Completa (.EXE)</span>
          </button>
        </div>
      </div>

    </div>
  );
}

