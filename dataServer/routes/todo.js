var express = require('express');
var router = express.Router();

var todo = {
    1467726253744: {
        content: '吃饭饭',
        complete: 1468216457448
    },
    1467726253746: {
        content: '睡觉觉',
        complete: undefined
    },
    1467726253749: {
        content: '打豆豆',
        complete: 1468216458448
    }

}

router.get('/', function(req, res, next) {
    var id = req.query.id;
    if (!id) return res.json(todo);
    res.json(todo[id]);

});

router.post('/add', function(req, res, next) {
    var newTodo = req.body;
    todo[newTodo.id] = {
        content: newTodo.content,
        complete: newTodo.complete
    }
});

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    delete todo[id];
});

router.post('/complete', function(req, res, next) {
    var id = req.body.id;
    var _complete = req.body.complete
    todo[id].complete = _complete;
});

module.exports = router;
