import React, {Component} from 'react';
import ListItem from './ListItem';

export default class List extends Component {
	constructor(props) {
		super(props)
		this._onDel = this._onDel.bind(this);
		this._onComplete = this._onComplete.bind(this);
	}
	_onDel(_id) {
		this.props._onDel(_id);
	}

	_onComplete(_id) {
		this.props._onComplete(_id);
	}

	render() {
		let _list = this.props.todoList;
		let items = _list.map(function(item, index) {
			return (
				<ListItem key={index} _onDel={this._onDel} _onComplete={this._onComplete} {...item} />
			)
			
		}.bind(this))
		return (
			<ul className="list">
				{items}
			</ul>	
		);
	}
}