var React = require('react');

var Input = React.createClass({
	getInitialState: function() {
	    return {
			content: '',
			id: undefined
	    };
	},
	/**
	 * 数据改动
	 */
	_change: function(e) {
		var _v = e.target.value.trim();
		if (!_v) return;
		this.setState({
			content: _v,
			id: Date.now()
		});
	},
	/**
	 * 数据保存
	 */
	_save: function() {
		if (!this.state.content.length) return;
		// 通过`props`，调用父组件的方法
		this.props._onSave(this.state);
		this.refs.input.value = "";
		this.setState({
			content: '',
			id: undefined
		});
	},
	render: function() {
		return (
			<div className="input">
				<div className="table_row">
					<div className="table_control">
						<input ref="input" placeholder="请输入事件" onChange={this._change} />
					</div>
					<div className="table_action">
						<span onClick={this._save}>确认</span>
					</div>
				</div>	
			</div>	
		)
	}
})

module.exports = Input;