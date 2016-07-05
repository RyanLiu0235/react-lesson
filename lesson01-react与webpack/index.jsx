var React = require('react'),
	ReactDOM = require('react-dom');

require('./public/less/style');
var Dog = require('./public/img/img.jpeg');

var HelloWorld = React.createClass({
	render: function() {
		return(
			<div>

				<p>hello world!</p>
				<img src={Dog} />
			</div>
			)
	}
});

ReactDOM.render(<HelloWorld />, document.querySelector('#app'));