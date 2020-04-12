import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store.js'
import './index.css';
import 'normalize.css/normalize.css'
import App from './App.jsx';

import * as serviceWorker from '../serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

if ('production' === process.env.NODE_ENV) {
	serviceWorker.register();
} else {
	serviceWorker.unregister();
}
