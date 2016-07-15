import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import superagent from 'superagent';
import App from './containers/App';
import todoApp from './reducers';

superagent
	.get('http://localhost:5100/api/redux')
	.end(function(err, data) {
		let store = createStore(todoApp, {todo: data.body})
		let rootElement = document.getElementById('app')
		render(
		  <Provider store={store}>
		    <App />
		  </Provider>,
		  rootElement
		)
	});		



			