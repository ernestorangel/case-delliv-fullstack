import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './styles/index.css';

const serverApiAddress = 'http://localhost:3000';
const serverSocketAddress = 'http://localhost:3030';
const clientType = 'store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      serverApiAddress={serverApiAddress}
      serverSocketAddress={serverSocketAddress}
      clientType={clientType}
    />
  </React.StrictMode>
);
