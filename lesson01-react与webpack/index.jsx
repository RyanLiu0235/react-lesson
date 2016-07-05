var React = require('react'),
	ReactDom = require('react-dom');

var HelloWorld = React.createClass({
	render: function() {
		return(
			<div>
				<p>hello world!</p>
			</div>
			)
	}
});

ReactDom.render(<HelloWorld />, document.querySelector('#app'));