var React = require('react');

var Input = React.createClass({
	render: function() {
		return (
			<div className="input">
				<div className="table_row">
					<div className="table_control">
						<input placeholder="请输入事件" />
					</div>
					<div className="table_action">
						<span>确认</span>
					</div>
				</div>	
			</div>	
		)
	}
})

module.exports = Input;