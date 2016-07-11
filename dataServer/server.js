var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());


var data = {
    todo: {
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
}

app.get('/api/todo', function(req, res, next) {
	var id = req.query.id;

	if (!id) return res.json(data.todo);
	res.json(data.todo[id]);
    
});

app.listen(5100, function() {
	console.log('server is running at http://localhost:5100');
})