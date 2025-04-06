import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store/store.js';
import { App } from './App.jsx';
import { StackComponent } from './StackComponent.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <StackComponent />
    </Provider>
  </React.StrictMode>
);