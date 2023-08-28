import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/Store';
import './i18next';

const defaultTheme = createTheme(); 
// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={defaultTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
