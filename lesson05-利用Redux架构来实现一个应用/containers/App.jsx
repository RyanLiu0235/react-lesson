import React, {Component} from 'react';
import Input from '../components/Input';
import List from '../components/List';
import { addTodo, completeTodo, deleteTodo} from '../actions';
import superagent from 'superagent';
import {connect} from 'react-redux';
import '../public/less/style';

export default class App extends Component {
	constructor(props) {
		super(props);
		this._save = this._save.bind(this);
		this._del = this._del.bind(this);
		this._complete = this._complete.bind(this);
	}
	_save(text) {
		superagent
			.post('http://localhost:5100/api/redux/add')
			.send(text)
			.end(function(res) {
				console.log('dispatch')
				
			})

		this.props.dispatch(addTodo(text))
	}
	_del(id) {
		superagent
			.post('http://localhost:5100/api/redux/delete')
			.send({
				id: id
			})
			.end(function(res) {
				
			});

		this.props.dispatch(deleteTodo(id));
	}
	_complete(id) {
		superagent
			.post('http://localhost:5100/api/redux/complete')
			.send({
				id: id
			})
			.end(function(res) {
				
			});

		this.props.dispatch(completeTodo(id))
	}
	render() {
		let { todoList} = this.props;
		return (
			<div>
				<h2 className="title">
					TODO列表页
				</h2>	
				<Input _onSave={this._save} />
				<List _onComplete={this._complete} _onDel={this._del} todoList={todoList} />
			</div>	
		);
	}
}

function select(state) {
	return {
		todoList: state.todo
	}
}


export default connect(select)(App);



