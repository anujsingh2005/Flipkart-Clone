import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css';

const fallbackApiBaseUrl = import.meta.env.PROD
  ? 'https://flipkart-clone-production-4dc8.up.railway.app'
  : 'http://localhost:5000';

const apiBaseUrl =
  import.meta.env.VITE_API_URL?.trim() ||
  fallbackApiBaseUrl;

if (apiBaseUrl) {
  axios.defaults.baseURL = apiBaseUrl.replace(/\/+$/, '');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
