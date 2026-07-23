import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept benign Vite HMR websocket reconnection errors in development containers
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (String(event.reason?.message || event.reason).includes('WebSocket') ||
       String(event.reason?.message || event.reason).includes('ws'))
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
