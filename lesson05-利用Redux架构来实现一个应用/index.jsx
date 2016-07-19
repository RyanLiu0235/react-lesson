import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';
import store from './store';

let rootElement = document.getElementById('app');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
)



			