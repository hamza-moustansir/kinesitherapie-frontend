import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import AppRouter from './routes/AppRouter';
import './index.css';

// Vérifier que l'élément existe avant de créer la racine
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Élément 'root' introuvable dans le DOM !");
}