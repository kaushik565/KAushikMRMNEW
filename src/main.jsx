import React from 'react'
import ReactDOM from 'react-dom/client'
import Presentation from './Presentation'
import './styles.css'

// Suppress React DevTools async message errors in development
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0]?.toString?.().includes('A listener indicated an asynchronous response') ||
      args[0]?.toString?.().includes('message channel closed')
    ) {
      return; // Silently ignore DevTools errors
    }
    originalError(...args);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Presentation />
  </React.StrictMode>
)
