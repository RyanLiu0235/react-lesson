var React = require('react'),
	Input = require('./Input'),
	List = require('./List'),
	superagent = require('superagent');


var TodoIndex = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: {}
	    };
	},
	componentDidMount: function() {
		superagent
			.get('http://localhost:5100/api/todo')
			.end(function(err, data) {
				this.setState({
					todoList: data.body
				});
				return data.body;
			}.bind(this));
	},
	/**
	 * 保存数据
	 * @param  {[number]} id [新加入的数据的id]
	 * @param  {[content]} content [新加入的数据的内容]
	 */
	_save: function(id, content) {
		var _newList = this.state.todoList;
		var _newTodo = {
			content: content,
			complete: undefined
		}
		_newList[id] = _newTodo;
		// setState方法改动`state`，同时引用了`state`的组件都会重新渲染
		this.setState({
			todoList: _newList
		});
	},
	/**
	 * 删除数据
	 * @return {[type]} [description]
	 */
	_del: function(id) {
		var _newList = this.state.todoList;
		delete _newList[id];
		this.setState({
			todoList: _newList
		})
	},
	render: function() {
		return (
			<div>
				<h2 className="title">
					TODO列表页
				</h2>	
				<Input _onSave={this._save} />
				<List _onDel={this._del} todoList={this.state.todoList} />
			</div>	
		);
	}
});

module.exports = TodoIndex;