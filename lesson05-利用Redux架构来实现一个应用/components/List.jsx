import React, {Component} from 'react';
import ListItem from './ListItem';

export default class List extends Component {
	render() {
		let _list = this.props.todoList;
		let items = _list.map(function(item, index) {
			return (
				<ListItem 
					key={index} 
					_onDel={_id => this.props._onDel(_id)} 
					_onComplete={_id => this.props._onComplete(_id)} 
					{...item} />
			)
			
		}.bind(this))
		return (
			<ul className="list">
				{items}
			</ul>	
		);
	}
}