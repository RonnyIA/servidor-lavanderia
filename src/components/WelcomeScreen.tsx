import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Sparkles, 
  ShoppingBag, 
  Clock, 
  Layers, 
  Users, 
  Calculator, 
  History, 
  Printer, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Tag,
  Receipt,
  X,
  Check,
  ChevronRight,
  Zap,
  Globe,
  Sliders,
  Radio,
  Tv,
  Download,
  Play,
  Lock
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface WelcomeScreenProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenDemo: () => void;
  onOpenRemoteMonitor: () => void;
  onOpenDownloadGuide: () => void;
}

export default function WelcomeScreen({ theme, onToggleTheme, onOpenDemo, onOpenRemoteMonitor, onOpenDownloadGuide }: WelcomeScreenProps) {
  const [activeFeatureModal, setActiveFeatureModal] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      category: 'ventas',
      icon: ShoppingBag,
      title: 'Punto de Venta y Recepción Express',
      desc: 'Registro inmediato de pedidos con cálculo automático de prendas, clasificación por tipo de servicio (lavado, secado, planchado, edredones), desglose de IVA y comprobantes.',
      highlights: [
        'Registro express en menos de 30 segundos',
        'Desglose automático por tipo de prenda y servicio',
        'Cálculo exacto de impuestos y totales',
        'Compatibilidad con códigos de barra e impresión rápida'
      ],
      color: 'bg-blue-50 text-[#0052cc] border-blue-200'
    },
    {
      id: 2,
      category: 'hardware',
      icon: Radio,
      title: 'Monitor Remoto en Tiempo Real',
      desc: 'Supervisión a distancia del estado de la lavandería mediante token de acceso seguro o URL privada para consultar ventas, flujo de caja y pedidos en tiempo real.',
      highlights: [
        'Sincronización remota con token de conexión único',
        'Consulta de ingresos y métricas de caja en tiempo real',
        'Monitoreo del estado de pedidos sin interrumpir la operación',
        'Acceso multiplataforma desde celulares, tablets o laptops'
      ],
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      id: 3,
      category: 'ventas',
      icon: Clock,
      title: 'Gestión de Servicios Pendientes',
      desc: 'Seguimiento visual del flujo operativo de prendas (Pendiente ➔ En Proceso ➔ Listo ➔ Entregado) con filtros inteligentes y cobro contra entrega.',
      highlights: [
        'Kanban visual por etapas de proceso',
        'Filtros por nombre, teléfono o número de ticket',
        'Aviso directo de pedidos listos para entrega',
        'Gestión de cobros al momento de la entrega'
      ],
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 4,
      category: 'ventas',
      icon: Layers,
      title: 'Catálogo de Servicios Adaptable',
      desc: 'Configuración personalizada de tarifas por kilo, pieza o edredón. Creación de paquetes promocionales, servicios express y suplementos.',
      highlights: [
        'Tarifas por kg, docena o pieza individual',
        'Edición instantánea de catálogo y precios',
        'Íconos de categoría para identificación visual',
        'Soporte para cobros por peso directo o servicio fijo'
      ],
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 5,
      category: 'clientes',
      icon: Users,
      title: 'Directorio e Historial de Clientes',
      desc: 'Base de datos centralizada de clientes con registro de consumo, historial de facturas y tickets emitidos con un solo clic.',
      highlights: [
        'Perfil detallado con datos de contacto',
        'Historial de pedidos anteriores y frecuencia',
        'Consulta instantánea de comprobantes',
        'Reimpresión directa de recibos anteriores'
      ],
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 6,
      category: 'finanzas',
      icon: Calculator,
      title: 'Corte de Caja e Imprevistos',
      desc: 'Apertura y cierre de turnos de caja, auditoría de entradas y salidas de efectivo y alertas automáticas de descuadres o faltantes.',
      highlights: [
        'Apertura con fondo de caja configurable',
        'Registro de egresos por suministros o imprevistos',
        'Detección inteligente de faltantes y sobrantes',
        'Resumen de ingresos desglosados en efectivo y tarjeta'
      ],
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: 7,
      category: 'finanzas',
      icon: History,
      title: 'Historial Financiero y Reportes PDF',
      desc: 'Panel analítico con gráficas de ingresos diarios, métricas por período y exportación de reportes gerenciales completos.',
      highlights: [
        'Métricas de ventas diarias, semanales y mensuales',
        'Gráficos interactivos de tendencias de ingresos',
        'Generación de reportes PDF estructurados',
        'Exportación de cierres de caja históricos'
      ],
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 8,
      category: 'hardware',
      icon: Printer,
      title: 'Impresión Térmica y Cajón Monedero',
      desc: 'Integración nativa con mini-impresoras térmicas de 80mm y 58mm (USB / ESC-POS) y pulso de apertura para cajón de dinero.',
      highlights: [
        'Comandos de corte automático y apertura de cajón',
        'Plantillas de ticket térmico optimizadas de alta claridad',
        'Reimpresión de tickets sin perder historial',
        'Compatibilidad con la mayoría de impresoras del mercado'
      ],
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      id: 9,
      category: 'ventas',
      icon: Tag,
      title: 'Cupones y Promociones Especiales',
      desc: 'Módulo de promociones con cupones de descuento fijo o porcentual para clientes frecuentes y campañas de temporada.',
      highlights: [
        'Descuentos por porcentaje o importe directo',
        'Validación de cupones en la caja registradora',
        'Vigencia y límites de uso por promoción',
        'Aumento en la retención de clientes recurrentes'
      ],
      color: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    {
      id: 10,
      category: 'hardware',
      icon: ShieldCheck,
      title: 'Seguridad y Control de Usuarios',
      desc: 'Gestión de roles de usuario (Administradores y Operadores) con acceso restringido por módulos y preguntas secretas de recuperación.',
      highlights: [
        'Niveles de acceso y permisos personalizables',
        'Protección de datos financieros para personal de caja',
        'Auditoría de acciones realizadas por usuario',
        'Recuperación de contraseña segura'
      ],
      color: 'bg-slate-100 text-slate-800 border-slate-300'
    }
  ];

  const activeModalData = activeFeatureModal !== null 
    ? features.find(f => f.id === activeFeatureModal) 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7ff] via-[#f9f9ff] to-[#eef3fe] dark:from-[#0b101d] dark:via-[#0f172a] dark:to-[#0b101d] text-[#111c2d] dark:text-slate-100 font-sans antialiased flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300">
      
      {/* Decorative background ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-300/20 via-indigo-200/20 to-purple-300/20 dark:from-blue-600/10 dark:via-indigo-600/10 dark:to-purple-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0052cc] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-bold text-lg text-[#003d9b] dark:text-blue-400 tracking-tight block">Lavandería Pro</span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Página de Presentación</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Presentación Activa
          </span>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      {/* Main Presentation Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-10 space-y-12">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 text-[#0052cc] dark:text-blue-300 text-xs font-bold font-mono border border-blue-200 dark:border-blue-800 shadow-2sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plataforma de Gestión Integral para Lavanderías y Tintorerías</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111c2d] dark:text-slate-100 tracking-tight leading-tight">
            Diseño, Control y Tecnología para tu <span className="text-[#0052cc] dark:text-blue-400">negocio de lavado</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Esta es la página de presentación oficial. Explora todas las capacidades operativas, financieras y de atención al cliente diseñadas para optimizar el servicio diario.
          </p>

          {/* Quick Metrics Badge Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-2sm">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Cero tiempos de espera</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-2sm">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Soporte Multiservicio</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-2sm">
              <Printer className="w-4 h-4 text-emerald-500" />
              <span>Tickets de 80mm y 58mm</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 pb-4">
          {/* Active Demo Button */}
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white dark:bg-[#131b2e] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer group"
          >
            <Play className="w-4 h-4 text-[#0052cc] fill-[#0052cc] dark:text-blue-400 dark:fill-blue-400 group-hover:scale-110 transition-transform" />
            <span>Probar Demo Interactivo</span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-200 dark:border-emerald-800">
              Disponible
            </span>
          </button>

          {/* Remote Monitor Button */}
          <button
            onClick={onOpenRemoteMonitor}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 dark:text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer group"
          >
            <Globe className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>Monitor Remoto</span>
            <span className="px-2 py-0.5 rounded-md bg-black/15 text-slate-950 text-[10px] font-mono font-bold">
              Token
            </span>
          </button>

          {/* Download Button */}
          <button
            onClick={onOpenDownloadGuide}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0052cc] hover:bg-[#003d9b] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Descargar Ahora</span>
            <ChevronRight className="w-4 h-4 text-blue-200" />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#0052cc] dark:text-blue-400" />
              <span>Módulos y Capacidades del Sistema</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Haz clic en cualquier tarjeta para ver los detalles completos de cada función</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.id}
                  onClick={() => setActiveFeatureModal(feat.id)}
                  className="bg-white dark:bg-[#131b2e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                        feat.color.includes('bg-blue-50') ? 'bg-blue-50 dark:bg-blue-950/80 text-[#0052cc] dark:text-blue-300 border-blue-200 dark:border-blue-800' :
                        feat.color.includes('bg-amber-50') ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
                        feat.color.includes('bg-purple-50') ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' :
                        feat.color.includes('bg-emerald-50') ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                        feat.color.includes('bg-rose-50') ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' :
                        feat.color.includes('bg-indigo-50') ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' :
                        feat.color.includes('bg-cyan-50') ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' :
                        feat.color.includes('bg-orange-50') ? 'bg-orange-50 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800' :
                        feat.color.includes('bg-teal-50') ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800' :
                        'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                      }`}>
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                        {feat.id < 10 ? `0${feat.id}` : feat.id}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-[#0052cc] dark:group-hover:text-blue-400 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#0052cc] dark:text-blue-400 border-t border-slate-100 dark:border-slate-800/80">
                    <span>Ver detalles</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical & Operational Advantages Section */}
        <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              ¿Por qué elegir esta solución?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Especialmente optimizado para un entorno comercial ágil y continuo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-[#0052cc] dark:text-blue-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Interfaz Intuitiva</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Diseño claro y accesible sin curvas de aprendizaje complejas para tus operadores de caja.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Cero Errores Financieros</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Auditoría en tiempo real para evitar pérdidas de efectivo durante los turnos de trabajo.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Adaptabilidad Total</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Apto para pequeñas lavanderías de barrio hasta cadenas multiturno de alto flujo.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Feature Detail Modal */}
      {activeModalData && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveFeatureModal(null);
          }}
        >
          <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveFeatureModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-[#0052cc] dark:text-blue-400 flex items-center justify-center shrink-0">
                <activeModalData.icon className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Módulo {activeModalData.id < 10 ? `0${activeModalData.id}` : activeModalData.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">{activeModalData.title}</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {activeModalData.desc}
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">Aspectos Destacados:</h4>
              <ul className="space-y-2">
                {activeModalData.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveFeatureModal(null)}
                className="w-full py-3 bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-bold rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Cerrar vista previa
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-[#0b101d] text-xs text-slate-500 dark:text-slate-400 font-mono mt-12">
        Lavandería Pro © 2026 — Página de Presentación
      </footer>

    </div>
  );
}
