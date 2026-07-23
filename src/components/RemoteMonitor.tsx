import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Globe, 
  Plus, 
  Key, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  ArrowLeft, 
  Building, 
  Check, 
  Copy, 
  Radio, 
  ShieldCheck, 
  Zap, 
  Smartphone,
  X,
  Info,
  Lock
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export interface RemoteConnection {
  id: string;
  name: string;
  token: string;
  targetUrl: string;
  createdAt: string;
}

interface RemoteMonitorProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onBackToPresentation: () => void;
}

const BASE_MONITOR_URL = 'https://app.lavanderia.lat/ir/';

const DEFAULT_CONNECTIONS: RemoteConnection[] = [];

export default function RemoteMonitor({
  theme,
  onToggleTheme,
  onBackToPresentation
}: RemoteMonitorProps) {
  // State for connections cached in localStorage
  const [connections, setConnections] = useState<RemoteConnection[]>(() => {
    try {
      const saved = localStorage.getItem('lavanderia_remote_tokens');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out legacy demo connection if present in user's browser localStorage
          return parsed.filter((item: RemoteConnection) => item.id !== 'demo-conn-1');
        }
      }
    } catch (e) {
      console.error("Error loading remote tokens from cache:", e);
    }
    return DEFAULT_CONNECTIONS;
  });

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inputName, setInputName] = useState('');
  const [inputToken, setInputToken] = useState('');
  
  // Notice / Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);

  // Sync connections to localStorage cache
  useEffect(() => {
    try {
      localStorage.setItem('lavanderia_remote_tokens', JSON.stringify(connections));
    } catch (e) {
      console.error("Error saving remote tokens to cache:", e);
    }
  }, [connections]);

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingId(null);
    setInputName('');
    setInputToken('');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (conn: RemoteConnection) => {
    setEditingId(conn.id);
    setInputName(conn.name);
    setInputToken(conn.token);
    setIsModalOpen(true);
  };

  // Save connection (Add or Update)
  const handleSaveConnection = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = inputToken.trim();
    if (!inputName.trim() || !cleanToken) return;

    const formattedUrl = `${BASE_MONITOR_URL}${cleanToken}`;

    if (editingId) {
      // Update
      setConnections(prev => prev.map(item => item.id === editingId ? {
        ...item,
        name: inputName.trim(),
        token: cleanToken,
        targetUrl: formattedUrl
      } : item));
    } else {
      // Create new
      const newConn: RemoteConnection = {
        id: 'token-' + Date.now(),
        name: inputName.trim(),
        token: cleanToken,
        targetUrl: formattedUrl,
        createdAt: new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setConnections(prev => [newConn, ...prev]);
    }

    setIsModalOpen(false);
    setInputName('');
    setInputToken('');
    setEditingId(null);
  };

  // Delete connection from cache
  const handleDeleteConnection = (id: string) => {
    setConnections(prev => prev.filter(c => c.id !== id));
  };

  // Copy token to clipboard
  const handleCopyToken = (id: string, token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Trigger redirection to target link with token
  const handleConnect = (conn: RemoteConnection) => {
    const target = `${BASE_MONITOR_URL}${conn.token}`;

    setRedirectNotice(`Redireccionando a ${conn.name} (${target})...`);
    
    setTimeout(() => {
      window.open(target, '_blank');
      setRedirectNotice(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] via-[#f7f9ff] to-[#eaf2ff] dark:from-[#0b101d] dark:via-[#0f172a] dark:to-[#0b101d] text-[#111c2d] dark:text-slate-100 font-sans antialiased flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-teal-300/20 via-blue-300/20 to-indigo-300/20 dark:from-teal-600/10 dark:via-blue-600/10 dark:to-indigo-600/10 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-[#131b2e]/60 backdrop-blur-md sticky top-0 z-30 shadow-2sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPresentation}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
            title="Volver a la página de inicio"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100 tracking-tight">Monitor Remoto</span>
                <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] font-mono font-bold border border-teal-200 dark:border-teal-800">
                  TOKEN CACHE
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Panel de Conexiones Remotas</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Presentation Section */}
        <div className="bg-white dark:bg-[#131b2e] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-md relative overflow-hidden space-y-5">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-xs font-bold font-mono border border-teal-200 dark:border-teal-800">
                <Radio className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                <span>Supervisión a Distancia en Tiempo Real</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Gestiona tus <span className="text-teal-600 dark:text-teal-400">Conexiones Remotas</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                En esta página puedes gestionar tus conexiones remotas para ver los movimientos e información del sistema en tiempo real. Al hacer clic en cualquiera de tus conexiones guardadas, serás redirigido automáticamente a la plataforma de monitoreo.
              </p>

              {/* Quick Advantage Badges */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Guardado en caché de navegador</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Ingreso inmediato en 1 Clic</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <span>Móvil, Tablet o PC</span>
                </span>
              </div>
            </div>

            {/* Add New Token CTA */}
            <div className="shrink-0 flex flex-col gap-3">
              <button
                onClick={handleOpenAddModal}
                className="px-6 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-teal-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                <span>Añadir Nueva Conexión Remota</span>
              </button>

              <span className="text-[11px] font-mono text-center text-slate-400 dark:text-slate-500">
                {connections.length} {connections.length === 1 ? 'conexión guardada' : 'conexiones guardadas'}
              </span>
            </div>
          </div>
        </div>

        {/* Redirect Notice Toast */}
        {redirectNotice && (
          <div className="p-4 rounded-2xl bg-teal-600 text-white shadow-xl flex items-center gap-3 animate-fade-in font-medium text-xs sm:text-sm">
            <Radio className="w-5 h-5 animate-pulse shrink-0" />
            <span>{redirectNotice}</span>
          </div>
        )}

        {/* Tokens List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Key className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Gestión de conexiones guardadas</span>
            </h2>

            <button
              onClick={handleOpenAddModal}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir conexión remota</span>
            </button>
          </div>

          {connections.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white dark:bg-[#131b2e] border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                <Key className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No tienes ninguna conexión guardada</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Agrega tu primera conexión remota para ingresar rápidamente a la supervisión de tu lavandería.
                </p>
              </div>
              <button
                onClick={handleOpenAddModal}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Conexión Ahora</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map((conn) => (
                <div 
                  key={conn.id}
                  className="bg-white dark:bg-[#131b2e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Card Top */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {conn.name}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-400">
                            Agregado: {conn.createdAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(conn)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                          title="Editar conexión"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteConnection(conn.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                          title="Eliminar de caché"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Token Display Box */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Key className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-mono text-xs font-extrabold text-slate-800 dark:text-slate-200 tracking-wider truncate">
                          {conn.token}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyToken(conn.id, conn.token)}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 hover:bg-slate-100 cursor-pointer shrink-0"
                      >
                        {copiedId === conn.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Connection Status Info */}
                    <div className="flex items-center justify-end text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Listo
                      </span>
                    </div>
                  </div>

                  {/* Connect Action Button */}
                  <button
                    onClick={() => handleConnect(conn)}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer group-hover:shadow"
                  >
                    <span>Abrir Monitor Remoto</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Modal for Adding or Editing Connection */}
      {isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="bg-white dark:bg-[#131b2e] w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {editingId ? 'Editar Conexión Remota' : 'Añadir Nueva Conexión'}
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveConnection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre de la Sucursal / Conexión *
                </label>
                <input
                  type="text"
                  required
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="ej. Lavandería San Pedro, Sucursal Norte"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Token de Conexión Remota *
                </label>
                <input
                  type="text"
                  required
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="ej. LAV-PRO-8891-MX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-teal-600 dark:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Guardar Cambios' : 'Guardar Conexión'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>,
        document.body
      )}

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© 2026 Lavandería Pro. Conexión de Monitoreo Remoto con Almacenamiento Local Seguro.</p>
      </footer>

    </div>
  );
}
