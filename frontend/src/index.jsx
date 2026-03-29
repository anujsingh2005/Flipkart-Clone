import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css';

const apiBaseUrl =
  import.meta.env.VITE_API_URL?.trim() ||
  'http://localhost:5000';

if (apiBaseUrl) {
  axios.defaults.baseURL = apiBaseUrl.replace(/\/+$/, '');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
