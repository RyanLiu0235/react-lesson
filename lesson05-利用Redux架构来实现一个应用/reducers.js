import { ADD_TODO, COMPLETE_TODO, DELETE_TODO } from './actions';
import { combineReducers } from 'redux';

function getIndex(id, state) {
    for (var i = 0; i < state.length; i++) {
        if (state[i].id == id) {
            return i;
        }
    }
}

function todo(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                action.text
            ]
        case COMPLETE_TODO:
            let index = getIndex(action.id, state);
            return [
                ...state.slice(0, index),
                Object.assign({}, state[index], { complete: true }),
                ...state.slice(index + 1)
            ]
        case DELETE_TODO:
            let _index = getIndex(action.id, state);
            return [
                ...state.slice(0, _index),
                ...state.slice(_index + 1)
            ]
        default:
        	return state;
    }
}

const todoApp = combineReducers({
    todo
})

export default todoApp;