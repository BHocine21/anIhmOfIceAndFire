import React from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import { store } from 'store/store';

import './css/index.css'

import App from './App'

const boot = () => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

boot()
