import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

const store = configureStore();

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
