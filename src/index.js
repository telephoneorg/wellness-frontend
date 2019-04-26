//General react liberaries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history'

import "assets/scss/material-kit-pro-react.scss?v=1.3.0";

import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
  <Router history={history}>
      <App />
  </Router>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// TODO check if service worker is needed
serviceWorker.unregister();
