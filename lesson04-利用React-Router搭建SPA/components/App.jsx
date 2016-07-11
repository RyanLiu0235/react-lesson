var React = require('react'),
	TodoIndex = require('./TodoIndex'),
	TodoDetail = require('./TodoDetail'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	browserHistory = require('react-router').browserHistory;

var App = React.createClass({
	render: function() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={TodoIndex} />
				<Route path="/detail/:id" component={TodoDetail} />
			</Router>
		)
	}
});

module.exports = App;