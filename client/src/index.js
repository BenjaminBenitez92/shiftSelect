import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import './components/Calendar/App.css';
import App from './App';
import Calendar from './components/Calendar/Calendar';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Calendar />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
