import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './modules/store';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

import './index.scss'

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker();








