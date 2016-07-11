var React = require('react'),
	Link = require('react-router').Link;

var ListItem = React.createClass({
	_handleClick: function(e) {
		var _type = e.target.className;
		switch (_type) {
			case 'complete': 
				this.props._onComplete(e);
				break;
			case 'delete':
				this.props._onDel(e);
				break;
			default:
				return;
		}
	},
	render: function() {
		var item = this.props.item;
		var _url = "/detail/" + item.id;
		var _style = {
			textDecoration: !item.complete ? 'none' : 'line-through'
		}
		return (
			<li id={item.id} className="table_row">
				<Link style={_style} to={_url} className="table_control">
					{item.content}
				</Link>
				<div className="table_action">
					<span className={!item.complete ? 'complete' : 'delete'} onClick={this._handleClick}>{!item.complete ? '完成' : '删除'}</span>
				</div>
			</li>
		);
	}
});

module.exports = ListItem;