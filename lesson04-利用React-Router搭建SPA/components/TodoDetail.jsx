var React = require('react'),
	superagent = require('superagent');

var Detail = React.createClass({
	getInitialState: function() {
	    return {
	    	content: '',
	    	createDate: '',
	    	completeDate: ''
	    };
	},
	componentDidMount: function() {
		function toLocalTime(date) {
			var _d = new Date(Number(date));
			return _d.toLocaleString();
		}
		var id = this.props.params.id;
	    superagent
	    	.get('http://localhost:5100/api/todo?id=' + id)
	    	.end(function(err, data) {
	    		var todoItem = data.body;

	    		this.setState({
	    			content: todoItem.content,
	    			createDate: toLocalTime(id),
	    			completeDate: !todoItem.complete ? '未结束' : toLocalTime(todoItem.complete)
	    		})
	    	}.bind(this))
	},
	render: function() {
		return (
			<div>
				<h2 className="title">TODO详情页</h2>
				<div className="detail">
					<p>详细内容：{this.state.content}</p>
					<p>创建时间：{this.state.createDate}</p>
					<p>完成时间：{this.state.completeDate}</p>
				</div>
				<a className="back" href="javascript:history.back();">返回首页</a>
			</div>
		)
	}
})

module.exports = Detail;