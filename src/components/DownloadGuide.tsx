import React, { useState } from 'react';
import { 
  Download, 
  ArrowLeft, 
  CheckCircle2, 
  HardDrive, 
  Printer, 
  Sliders, 
  UserCheck, 
  Radio, 
  HelpCircle, 
  FileText, 
  Monitor, 
  ShieldCheck, 
  Copy, 
  Check, 
  AlertTriangle,
  Zap,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface DownloadGuideProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onBackToPresentation: () => void;
}

export default function DownloadGuide({ theme, onToggleTheme, onBackToPresentation }: DownloadGuideProps) {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);

  const EXE_DOWNLOAD_URL = 'https://github.com/RonnyIA/servidor-lavanderia/releases/latest/download/Lavanderia.Pro.exe';

  const handleSimulateDownload = (filename: string) => {
    setDownloadStarted(filename);
    
    // Trigger real download
    const link = document.createElement('a');
    link.href = EXE_DOWNLOAD_URL;
    link.setAttribute('download', 'Lavanderia.Pro.exe');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStarted(null);
    }, 4000);
  };

  const handleCopyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7ff] via-[#f9f9ff] to-[#eef3fe] dark:from-[#0b101d] dark:via-[#0f172a] dark:to-[#0b101d] text-[#111c2d] dark:text-slate-100 font-sans antialiased flex flex-col justify-between relative transition-colors duration-300">
      
      {/* Decorative Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-blue-300/20 via-indigo-200/20 to-teal-300/20 dark:from-blue-600/10 dark:via-indigo-600/10 dark:to-teal-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* Header Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60">
        <button
          onClick={onBackToPresentation}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all shadow-2sm cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver a la Presentación</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-blue-100 dark:bg-blue-950/80 text-[#0052cc] dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <Download className="w-3.5 h-3.5" />
            Centro de Descarga e Instalación
          </span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-10 space-y-10">
        
        {/* Title & Introduction Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Edición Comercial POS — Sistema de Caja</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111c2d] dark:text-slate-100 tracking-tight">
            Descarga e Instalación de <span className="text-[#0052cc] dark:text-blue-400">Lavandería Pro</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Sigue esta guía paso a paso para poner en marcha el sistema en tu equipo, conectar tus impresoras térmicas de tickets y configurar tus datos iniciales de caja.
          </p>
        </div>

        {/* Download Showcase Hero Card */}
        <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-blue-500/5 relative overflow-hidden space-y-6">
          
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-teal-400/10 dark:from-blue-600/10 dark:to-teal-600/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

          {/* Card Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0052cc] to-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    Instalador Oficial para Windows
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Edición Comercial POS para Lavanderías &bull; Archivo ejecutable (.EXE)</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Verificado libre de virus &bull; Firma digital limpia</span>
            </div>
          </div>

          {/* Main Single Action Download Area */}
          <div className="max-w-2xl mx-auto space-y-4 text-center py-2 relative z-10">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Descarga e instala el software directamente en la computadora de tu lavandería. Incluye todo lo necesario para empezar a emitir comandas, tickets y registrar ventas en segundos.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleSimulateDownload('Lavanderia.Pro.exe')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0052cc] via-blue-600 to-[#003d9b] hover:from-[#0041a3] hover:to-[#002e75] text-white text-sm sm:text-base font-extrabold rounded-2xl transition-all shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-3 mx-auto cursor-pointer group"
              >
                <Download className="w-5 h-5 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
                <span>Descargar Lavanderia Pro.exe</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono pt-1">
              Compatible con Windows 10, Windows 11 y Windows Server (64-bit)
            </p>
          </div>

          {/* Feature Highlights Grid ("Varias Cositas") */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
            
            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#0052cc] dark:text-blue-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Instalación Express</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">Listo para operar en menos de 2 minutos</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">100% Seguro</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">Sin publicidad ni software adicional</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 shrink-0">
                <Printer className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Drivers Incluidos</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">Impresoras térmicas de 58mm y 80mm</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 shrink-0">
                <HardDrive className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Operación Local</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">Base de datos offline integrada</p>
              </div>
            </div>

          </div>

          {/* Toast alert if simulated download is clicked */}
          {downloadStarted && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between animate-fade-in relative z-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Descarga iniciada para: <strong className="font-mono">{downloadStarted}</strong></span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">Iniciando...</span>
            </div>
          )}
        </div>

        {/* System Requirements Table */}
        <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Monitor className="w-5 h-5 text-[#0052cc] dark:text-blue-400" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Requisitos Mínimos del Sistema</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-mono">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider w-1/3 sm:w-1/4">Componente</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Detalle del Requisito</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-200">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">Sistema operativo</td>
                  <td className="py-3 px-4">
                    Windows 10 de 64 bits (o superior). <span className="text-rose-600 dark:text-rose-400 font-semibold">No es compatible con Windows 7/8.</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">Procesador</td>
                  <td className="py-3 px-4">
                    Cualquier procesador de los últimos ~8 años (nada especial, no requiere gráfica dedicada).
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">Memoria RAM</td>
                  <td className="py-3 px-4">
                    4 GB mínimo <span className="text-slate-500 dark:text-slate-400">(se recomienda 8 GB si la PC hace más cosas a la vez).</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">Espacio en disco</td>
                  <td className="py-3 px-4">
                    Unos 450 MB libres para la instalación.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">Internet</td>
                  <td className="py-3 px-4">
                    No es necesario para el uso diario (ventas, pedidos, catálogo, caja). Solo hace falta si vas a usar el monitoreo remoto desde fuera de la lavandería.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">Impresora</td>
                  <td className="py-3 px-4">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Opcional</span> — si vas a imprimir tickets, se necesita una impresora térmica compatible con ESC/POS conectada por USB.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Step by Step Guide Steps */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Paso a Paso: Cómo instalar y poner en marcha el sistema
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Sigue estos 5 sencillos pasos para iniciar operaciones hoy mismo</p>
          </div>

          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 space-y-4 shadow-2sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-[#0052cc] dark:text-blue-400 font-extrabold font-mono flex items-center justify-center shrink-0">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Instalación de Lavandería Pro</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Pasos iniciales para descargar y ejecutar el programa</span>
                </div>
              </div>

              <div className="pl-12 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                <p>
                  1. <strong>Descarga el instalador:</strong> Haz clic en el botón de descarga superior para obtener el archivo <strong>.exe</strong>.
                </p>
                <p>
                  2. <strong>Ejecuta el archivo descargado:</strong> Es posible que Windows muestre una advertencia de seguridad (<em>"Windows protegió su PC"</em>). Esto es normal en programas nuevos — haz clic en <strong>"Más información"</strong> y luego en <strong>"Ejecutar de todas formas"</strong>.
                </p>
                <p>
                  3. <strong>Sigue los pasos del instalador:</strong> Puedes dejar la carpeta de instalación que se sugiere por defecto, o elegir otra.
                </p>
                <p>
                  4. <strong>Abre "Lavandería Pro":</strong> Desde el acceso directo que se creó en el Escritorio o en el Menú Inicio.
                </p>
                <p className="pt-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                  5. <strong>¡Listo!</strong> El programa funciona sin necesidad de internet para el uso diario (ventas, pedidos, catálogo, cortes de caja).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 space-y-4 shadow-2sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 font-extrabold font-mono flex items-center justify-center shrink-0">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Conexión de Impresora Térmica y Cajón Monedero</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Configuración del ticket impreso y corte de papel</span>
                </div>
              </div>

              <div className="pl-12 space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Conecta tu mini-impresora térmica (USB de 80mm o 58mm) al puerto USB del equipo. El sistema reconoce automáticamente drivers estándar <strong>POS-58</strong> y <strong>POS-80</strong>.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                    <Printer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Prueba de Impresión Directa:</span>
                  </div>
                  <p>
                    Desde el panel de <strong>Configuración ➔ Impresora</strong>, haz clic en <strong>"Probar Ticket de Muestra"</strong> para verificar que la tipografía y el corte automático de papel funcionen correctamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 space-y-4 shadow-2sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 font-extrabold font-mono flex items-center justify-center shrink-0">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Asistente de Configuración Inicial (Setup Wizard)</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Personalización de los datos de tu lavandería</span>
                </div>
              </div>

              <div className="pl-12 space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Al abrir el programa por primera vez, el asistente te guiará para ingresar:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Nombre del Establecimiento:</strong> Aparecerá en el encabezado de los tickets.</li>
                  <li><strong>Dirección y Teléfono:</strong> Para contacto directo con tus clientes.</li>
                  <li><strong>Tasa de Impuestos (IVA/Tax):</strong> Configurable del 0% al 16% según tu región.</li>
                  <li><strong>Mensaje de pie de ticket:</strong> Ej. "¡Gracias por su preferencia! Guarde su ticket para recoger sus prendas."</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 space-y-4 shadow-2sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold font-mono flex items-center justify-center shrink-0">
                  04
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Cuentas de Usuario y Permisos de Caja</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Acceso restringido para cajeros y operadores</span>
                </div>
              </div>

              <div className="pl-12 space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Por defecto, el usuario administrador es <code className="bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-[11px] font-bold">admin_pro</code> con la clave <code className="bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-[11px] font-bold">admin</code>.
                </p>
                <p>
                  Te recomendamos cambiar esta contraseña inmediatamente en la pestaña de <strong>Usuarios</strong> y crear perfiles independientes para cada cajero o empleado para mantener auditorías de caja impecables.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-slate-800 space-y-4 shadow-2sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 font-extrabold font-mono flex items-center justify-center shrink-0">
                  05
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Sincronización de Monitor Remoto en Tiempo Real</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Consulta de ventas desde tu celular o tablet</span>
                </div>
              </div>

              <div className="pl-12 space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Si deseas revisar las ventas y cortes de caja desde tu smartphone sin estar en el local:
                </p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Ve a <strong>Configuración ➔ Monitor Remoto</strong>.</li>
                  <li>Genera tu <strong>Token de Conexión Seguro</strong>.</li>
                  <li>Escanea el código QR o copia el enlace privado para abrir la vista remota en tu navegador móvil.</li>
                </ol>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#0052cc] dark:text-blue-400" />
            <span>Preguntas Frecuentes de Instalación</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">¿El sistema requiere conexión a internet continua?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                No. Lavandería Pro funciona 100% de manera local y offline en la caja registradora. Internet solo es necesario si deseas utilizar la sincronización remota opcional.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">¿Cómo realizo respaldos de mis datos?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                En la sección de Configuración puedes generar copias de seguridad comprimidas (.JSON/.ZIP) con un solo clic para guardarlas en una memoria USB o la nube.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">¿Qué impresoras térmicas son compatibles?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Todas las marcas comerciales con comandos ESC/POS (Epson, Xprinter, EC Line, 3nStar, Bixolon, Ghica, etc.) de 58mm o 80mm de ancho.
              </p>
            </div>
          </div>
        </div>

        {/* Back Bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onBackToPresentation}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Página de Presentación</span>
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-[#0b101d] text-xs text-slate-500 dark:text-slate-400 font-mono mt-12">
        Lavandería Pro © 2026 — Centro de Descarga e Instalación Oficial
      </footer>

    </div>
  );
}
