export const ADD_TODO = 'ADD_TODO';
export function addTodo(text) {
	return {type: ADD_TODO, text}
}

export const COMPLETE_TODO = 'COMPLETE_TODO';
export function completeTodo(id) {
	return {type: COMPLETE_TODO, id}
}

export const DELETE_TODO = 'DELETE_TODO';
export function deleteTodo(id) {
	return {type: DELETE_TODO, id}
}