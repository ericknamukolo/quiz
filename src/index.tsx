import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DateCounter from './DateCounter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DateCounter />
  </React.StrictMode>
);
