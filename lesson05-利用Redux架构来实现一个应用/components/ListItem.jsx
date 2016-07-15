import React, {Component} from 'react';
import {Link} from 'react-router';

export default class ListItem extends Component {
	constructor(props) {
		super(props);
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick(e) {
		let _type = e.target.className;
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
	}

	render() {
		let _url = "/detail/" + this.props.id;
		let _style = {
			textDecoration: this.props.complete ? 'line-through' : 'none'
		}
		return (
			<li id={this.props.id} className="table_row">
				<Link style={_style} to={_url} className="table_control">
					{this.props.content}
				</Link>
				<div className="table_action">
					<span className={this.props.complete ? 'complete' : 'delete'} onClick={this._handleClick}>{this.props.complete ? '完成' : '删除'}</span>
				</div>
			</li>
		);
	}
}