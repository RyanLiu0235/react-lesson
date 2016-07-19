import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Input from '../components/Input';
import List from '../components/List';
import { addTodo, completeTodo, deleteTodo} from '../actions';
import '../public/less/style';

class App extends Component {
	render() {
		let { todoList } = this.props;
		return (
			<div>
				<h2 className="title">
					TODO列表页
				</h2>	
				<Input 
					_onSave={(text) => {this.props.addTodo(text)}} />
				<List 
					_onComplete={(id) => {this.props.completeTodo(id)}} 
					_onDel={(id) => {this.props.deleteTodo(id)}} 
					todoList={todoList} />
			</div>	
		);
	}
}

function mapStateToProps(state) {
	return {
		todoList: state.todo
	}
}

function mapDispatchToProps(dispatch) {
	let a = bindActionCreators({ addTodo, completeTodo, deleteTodo }, dispatch);
	return a
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



