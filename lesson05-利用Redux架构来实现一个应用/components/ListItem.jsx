import React, {Component} from 'react';

export default class ListItem extends Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick(e) {
		let _type = e.target.className;
		switch (_type) {
			case 'complete': 
				this.props._onComplete(e.target.parentNode.parentNode.id);
				break;
			case 'delete':
				this.props._onDel(e.target.parentNode.parentNode.id);
				break;
			default:
				return;
		}
	}

	render() {
		let _url = "/detail/" + this.props.id;
		let _style = {
			textDecoration: this.props.complete ? 'line-through' : 'none'
		}
		return (
			<li 
				id={this.props.id} 
				className="table_row"
			>
				<a style={_style} href="#" className="table_control">
					{this.props.content}
				</a>
				<div className="table_action">
					<span 
						className={this.props.complete ? 'delete' : 'complete'} 
						onClick={this._handleClick}
					>
						{this.props.complete ? '删除' : '完成'}
					</span>
				</div>
			</li>
		);
	}
}