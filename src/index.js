import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './index.css';
import './vendor/fonts.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Router =
  process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;

root.render(
  <React.StrictMode>
    <Router basename='/'>
      <App />
    </Router>
  </React.StrictMode>
);
