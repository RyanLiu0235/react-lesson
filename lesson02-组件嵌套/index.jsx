var React = require('react'),
	ReactDOM = require('react-dom'),
	App = require('./components/App');

require('./public/less/style');

ReactDOM.render(<App />, document.getElementById('app'));