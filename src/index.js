import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app'

var firebaseConfig = {
  apiKey: "AIzaSyBPAEj0ku0YBF1DzCc1b6mGpEKz0Bhn9Fk",
  authDomain: "bloodbank-pro.firebaseapp.com",
  databaseURL: "https://bloodbank-pro-default-rtdb.firebaseio.com",
  projectId: "bloodbank-pro",
  storageBucket: "bloodbank-pro.appspot.com",
  messagingSenderId: "533183192799",
  appId: "1:533183192799:web:82b1a608af84d64e6d536a",
  measurementId: "G-06F49XSLF4"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
