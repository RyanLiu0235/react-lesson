import reqwest from 'reqwest';

export const ADD_TODO = 'ADD_TODO';
export const addTodo = (text) => (dispatch, getState) => {
    reqwest({
        url: 'http://localhost:5100/api/redux/add',
        method: 'post',
        data: text,
        success: function(res) {
            dispatch({ type: ADD_TODO, text })
        },
        error: function() {
            console.error('请求失败');
        }
    })
}


export const COMPLETE_TODO = 'COMPLETE_TODO';
export const completeTodo = (id) => (dispatch, getState) => {
    reqwest({
        url: 'http://localhost:5100/api/redux/complete',
        method: 'post',
        data: {id: id},
        success: function(res) {
            dispatch({ type: COMPLETE_TODO, id })
        },
        error: function() {
            console.error('请求失败');
        }
    })
}


export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (id) => (dispatch, getState) => {
    reqwest({
        url: 'http://localhost:5100/api/redux/delete',
        method: 'post',
        data: {id: id},
        success: function(res) {
            dispatch({ type: DELETE_TODO, id })
        },
        error: function() {
            console.error('请求失败');
        }
    })


}
