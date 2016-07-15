import React, {Component} from 'react';

export default class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			id: undefined
		}
		this._change = this._change.bind(this);
		this._save = this._save.bind(this);
	}

	_change(e) {
		let _v = e.target.value.trim();
		if (!_v) return;
		this.setState({
			content: _v,
			id: Date.now()
		});
	}

	_save() {
		if (!this.state.content.length) return;
		// 通过`props`，调用父组件的方法
		var text = {
			id: this.state.id,
			content: this.state.content
		}
		this.props._onSave(text);
		this.refs.input.value = "";
		this.setState({
			content: '',
			id: undefined
		});
	}

	render() {
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
}