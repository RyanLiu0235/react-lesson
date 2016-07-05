var React = require('react');

var List = React.createClass({
	render: function() {
		return (
			<ul className="list">
				<li className="table_row">
					<div className="table_control">
						吃饭
					</div>
					<div className="table_action">
						<span>完成</span>
					</div>
				</li>
				<li className="table_row">
					<div className="table_control">
						睡觉
					</div>
					<div className="table_action">
						<span>完成</span>
					</div>
				</li>
				<li className="table_row">
					<div className="table_control">
						打豆豆
					</div>
					<div className="table_action">
						<span>完成</span>
					</div>
				</li>
			</ul>	
		)
	}
})

module.exports = List;