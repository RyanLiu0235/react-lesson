var React = require('react'),
	Title = require('./Title'),
	Input = require('./Input'),
	List = require('./List');


var App = React.createClass({
	render: function() {
		return (
			<div>
				<Title />
				<Input />
				<List />
			</div>	
		)
	}
});

module.exports = App;