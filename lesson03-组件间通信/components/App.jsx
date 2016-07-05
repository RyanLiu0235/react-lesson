var React = require('react'),
	Title = require('./Title'),
	Input = require('./Input'),
	List = require('./List');


var App = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: [{
	    		id: 1467726253744,
	    		content: '吃饭饭'
	    	},{
	    		id: 1467726253746,
	    		content: '睡觉觉'
	    	},{
	    		id: 1467726253749,
	    		content: '打豆豆'
	    	}]
	    };
	},
	/**
	 * 保存数据
	 * @param  {[object]} newTodo [新加入的数据]
	 */
	_save: function(newTodo) {
		var _newList = this.state.todoList.concat(newTodo); // 与原先的数据进行合并
		// setState方法改动`state`，同时引用了`state`的组件都会重新渲染
		this.setState({
			todoList: _newList
		});
	},
	/**
	 * 删除数据
	 * @return {[type]} [description]
	 */
	_del: function(_id) {
		var newList = this.state.todoList;
		this.state.todoList.map(function(item, i) {
			if (item.id == _id) {
				newList.splice(i, 1);
				this.setState({
					todoList: newList
				})
			}
		}.bind(this));
	},
	render: function() {
		return (
			<div>
				<Title />
				<Input _onSave={this._save} />
				<List _onDel={this._del} todoList={this.state.todoList} />
			</div>	
		);
	}
});

module.exports = App;