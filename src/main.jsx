import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>
);
