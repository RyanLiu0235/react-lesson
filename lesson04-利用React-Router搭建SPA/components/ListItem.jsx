var React = require('react'),
	Link = require('react-router').Link;

var ListItem = React.createClass({
	render: function() {
		var item = this.props.item;
		var _url = "/detail/" + item.id;
		return (
			<li id={item.id} className="table_row">
				<Link to={_url} className="table_control">
					{item.content}
				</Link>
				<div className="table_action">
					<span onClick={this.props._onDel}>完成</span>
				</div>
			</li>
		);
	}
});

module.exports = ListItem;