var express = require('express');
var router = express.Router();

var todo = [
    {	
    	id: 1467726253744,
        content: '吃饭饭',
        complete: true
    },
    {
    	id: 1467726253746,
        content: '睡觉觉',
        complete: false
    },
    {
    	id: 1467726253749,
        content: '打豆豆',
        complete: true
    }
]

router.get('/', function(req, res, next) {
    var id = req.query.id;
    // console.log(todo)
	return res.json(todo);

});

router.post('/add', function(req, res, next) {
    var newTodo = req.body;
    todo.push(newTodo);
});

function getIndex(id) {
	for (var i = 0; i < todo.length; i++) {
		if (todo[i].id == id) {
			return i;
		}
	}
}

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    todo.splice(getIndex(id), 1);
});

router.post('/complete', function(req, res, next) {
    var id = req.body.id;
    todo[getIndex(id)].complete = true;
});

module.exports = router;
