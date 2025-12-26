
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Lumina Memory Architect: Initializing application...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Lumina Error: Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Lumina Memory Architect: Rendered successfully");
} catch (err) {
  console.error("Lumina Render Error:", err);
}
