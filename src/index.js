import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { UserProvider } from './context/UserContext';
import { UserProvider } from './context/UserContext';
import { TextProvider } from './context/TextContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <TextProvider>
        <App />
      </TextProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
