import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Script loaded!');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color: white; padding: 50px; background: #1a202c;">ERROR: Root element not found</div>';
  throw new Error("Could not find root element to mount to");
}

console.log('Creating React root...');
const root = ReactDOM.createRoot(rootElement);
console.log('Rendering App...');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('App rendered!');