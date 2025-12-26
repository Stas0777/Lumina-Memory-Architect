import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Lumina Memory Architect: Front-end Loaded.");
} else {
  console.error("Lumina Fatal: Root container not found.");
}