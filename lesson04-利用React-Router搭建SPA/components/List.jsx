var React = require('react'),
	ListItem = require('./ListItem'),
	assign = require('object-assign');

var List = React.createClass({
	_onDel: function(e) {
		var _id = e.target.parentNode.parentNode.id;
		this.props._onDel(_id);
	},
	render: function() {
		var _list = this.props.todoList;
		var items = [];
		for (var id in _list) {
			var _item = assign({}, _list[id], {id: id});
			items.push(<ListItem key={id} _onDel={this._onDel} item={_item} />)
		}
		return (
			<ul className="list">
				{items}
			</ul>	
		);
	}
});

module.exports = List;