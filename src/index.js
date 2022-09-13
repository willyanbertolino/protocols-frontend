import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ProtocolProvider } from './context/protocolsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProtocolProvider>
      <App />
    </ProtocolProvider>
  </React.StrictMode>
);
