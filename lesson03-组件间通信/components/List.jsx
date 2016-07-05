var React = require('react');

var List = React.createClass({
	_onDel: function(e) {
		var _id = e.target.parentNode.parentNode.id;
		this.props._onDel(_id);
	},
	render: function() {
		var list = this.props.todoList.map(function(item) {
			return (
				<li key={item.id} id={item.id} className="table_row">
					<div className="table_control">
						{item.content}
					</div>
					<div className="table_action">
						<span onClick={this._onDel}>完成</span>
					</div>
				</li>
			)
		}.bind(this))
		return (
			<ul className="list">
				{list}
			</ul>	
		);
	}
});

module.exports = List;