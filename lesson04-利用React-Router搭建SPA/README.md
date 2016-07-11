# 利用React-Router搭建SPA

上一节我们利用`React`搭建了一个TODO应用。这节课我们结合`React-Router`，将这个TODO改成一个SPA(单页应用)。我们会多出一个TODO详情页面。

## React-Router 简介

`React-Router`是一个`React`的路由组件库，[github地址](https://github.com/reactjs/react-router)。

> React Router is a complete routing library for React.

> React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought.

在单页应用中，我们利用`React-Router`来管理路由。`React-Router`还是比较容易上手的。[阮一峰 React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)是一个比较好的中文入门教程，里面相关API的讲解比较到位，遇到不理解的地方可以去这里面看看。

## 需求分析

在前一节课的基础上，我们要继续增加一个TODO的详情页面，展示这个TODO的一些详情信息。我们会相对应地增加一些字段，同时，为了查询方便，我们还会修改一下我们存储的数据结构。

## 详情页

首先，我们还是先将详情页给搭建出来，命名为`TodoDetail.jsx`。同时，新建一个`TodoIndex.jsx`，将以前`App.jsx`里面的内容放到里面去。

``` jsx
// ./components/App.jsx

var React = require('react'),
	TodoIndex = require('./TodoIndex'),
	TodoDetail = require('./TodoDetail');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<TodoIndex />
				<TodoDetail />
			</div>
		)
	}
});

module.exports = App;
```

``` jsx
// ./components/TodoDetail.jsx

var React = require('react');

var Detail = React.createClass({
	render: function() {
		return (
			<div>
				<h2 className="title">TODO详情页</h2>
				<div className="detail">
					<p>TODO：吃饭饭</p>
					<p>创建时间：2016/7/11 下午1:37:24</p>
					<p>完成时间：2016/7/11 下午2:37:24</p>
				</div>
				<a className="back" href="javascript:history.back();">返回首页</a>
			</div>
		)
	}
})

module.exports = Detail;
```

当然，我们也会增加一些样式。这里就不写出来了。

现在，结构上我们已经把详情页的做出来了。

然后，我们还需要在数据里面增加一些字段，同时，为了我们查找数据以及修改数据的方便，我们还需要将数据结构从数组改成`id`为主键的对象结构。所以我们数据渲染的循环也要改一下。下面我们将所有的代码都改写一遍。


``` jsx
// ./components/TodoIndex.jsx

var React = require('react'),
	Input = require('./Input'),
	List = require('./List');


var App = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: {
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
	    };
	},
	/**
	 * 保存数据
	 * @param  {[number]} id [新加入的数据的id]
	 * @param  {[content]} content [新加入的数据的内容]
	 */
	_save: function(id, content) {
		var _newList = this.state.todoList;
		var _newTodo = {
			content: content,
			complete: undefined
		}
		_newList[id] = _newTodo;
		// setState方法改动`state`，同时引用了`state`的组件都会重新渲染
		this.setState({
			todoList: _newList
		});
	},
	/**
	 * 删除数据
	 * @return {[type]} [description]
	 */
	_del: function(id) {
		var _newList = this.state.todoList;
		delete _newList[id];
		this.setState({
			todoList: _newList
		})
	},
	render: function() {
		return (
			<div>
				<h2 className="title">TODO</h2>
				<Input _onSave={this._save} />
				<List _onDel={this._del} todoList={this.state.todoList} />
			</div>	
		);
	}
});

module.exports = App;
```

``` jsx
// ./components/Input.jsx
var React = require('react');

var Input = React.createClass({
	getInitialState: function() {
	    return {
			content: '',
			id: undefined
	    };
	},
	/**
	 * 数据改动
	 */
	_change: function(e) {
		var _v = e.target.value.trim();
		if (!_v) return;
		this.setState({
			content: _v,
			id: Date.now()
		});
	},
	/**
	 * 数据保存
	 */
	_save: function() {
		if (!this.state.content.length) return;
		// 通过`props`，调用父组件的方法
		this.props._onSave(this.state.id, this.state.content);
		this.refs.input.value = "";
		this.setState({
			content: '',
			id: undefined
		});
	},
	render: function() {
		return (
			<div className="input">
				<div className="table_row">
					<div className="table_control">
						<input ref="input" placeholder="请输入事件" onChange={this._change} />
					</div>
					<div className="table_action">
						<span onClick={this._save}>确认</span>
					</div>
				</div>	
			</div>	
		)
	}
})

module.exports = Input;
```

同时，我们将`List.jsx`拆分成两个文件，因为`React`的循环中每个循环元素都要有一个`key`，但是这个`key`并不建议写在HTML元素里，而应该写在组件元素的XML元素上。所以我们将每个循环元素拆分出来写一个文件，叫`ListItem.jsx`

``` jsx
// ./components/ListItem.jsx

var React = require('react');

var ListItem = React.createClass({
	render: function() {
		var item = this.props.item;
		var _url = "/detail/" + item.id;
		return (
			<li id={item.id} className="table_row">
				<a href="#" className="table_control">
					{item.content}
				</a>
				<div className="table_action">
					<span onClick={this.props._onDel}>完成</span>
				</div>
			</li>
		);
	}
});

module.exports = ListItem;
```

``` jsx
// ./components/List.jsx

var React = require('react'),
	ListItem = require('./ListItem'),
	assign = require('object-assign');

var List = React.createClass({
	_onDel: function(e) {
		var _id = e.target.parentNode.parentNode.id;
		this.props._onDel(_id);
	},
	render: function() {
		var _list = this.props.todoList;
		var items = [];
		for (var id in _list) {
			var _item = assign({}, _list[id], {id: id});
			items.push(<ListItem key={id} _onDel={this._onDel} item={_item} />)
		}
		return (
			<ul className="list">
				{items}
			</ul>	
		);
	}
});

module.exports = List;
```

`object-assign`是一个Node.js模块，它负责将几个对象组合成一个新的对象，[可以查看这里](https://github.com/sindresorhus/object-assign)，他是ES6标准里`Object.assign`的一个ES5的实现。

这里我们需要安装它。

``` sh
$ npm install object-assign --save
```

同时，我们将上节课为了加深对组件树的理解而剥离出来的头部直接加入到`TodoIndex.jsx`里面，因为这个部分并没有逻辑。

可以看到，因为改变了数据的结构，我们对于数据的增删改查更加容易了。对于数据的循环，我们还是用数组来循环，这样比较容易。

### webpack-dev-server

我们之前都是打开的静态页面，现在，我们希望创建一个服务器来预览页面，所以我们引入`webpack-dev-server`模块。

``` sh
$ npm install webpack-dev-server -g
```

同时，在`npm scripts`里添加对应字段

``` js
"start": "webpack-dev-server --port 5000"
```

这样，我们输入
``` sh
$ npm run start
```

就能在[http://localhost:5000](http://localhost:5000)打开我们的页面了。

另外，为了让数据交互更加接近真实应用场景，我们将数据独立到另外的服务器上，通过`Ajax`来获取。为了使用`Ajax`，我们需要安装`superagent`模块。

``` sh
$ npm install superagent --save
```

现在页面上已经将两个部分都显示出来了。我们接下来要将`React-Router`引进来，让页面成为一个单页应用。

## 引入React-Router

首先，我们需要改造一下我们的`App.jsx`，让它可以根据路由显示我们所需要的页面

``` jsx
// ./components/App.jsx

var React = require('react'),
	TodoIndex = require('./TodoIndex'),
	TodoDetail = require('./TodoDetail'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	browserHistory = require('react-router').browserHistory;

var App = React.createClass({
	render: function() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={TodoIndex} />
				<Route path="/detail/:id" component={TodoDetail} />
			</Router>
		)
	}
});

module.exports = App;
```

在现在的`App.jsx`中，我们引入了`react-router`模块。其实从结构上可以看出，`Router`，`Route`都是类似于`React`组件的形式。其中`Router`为最外层的路由组件，它里面可以包含很多组件，比如`Route`，`IndexRoute`等等。

现在可以看到，路由'/'对应的就是`TodoIndex`模块，路由'/detail/:id'对应的就是`TodoDetail`模块。

``` jsx
// ./components/TodoDetail.jsx

var React = require('react'),
	superagent = require('superagent');

var Detail = React.createClass({
	getInitialState: function() {
	    return {
	    	content: '',
	    	createDate: '',
	    	completeDate: ''
	    };
	},
	componentDidMount: function() {
		function toLocalTime(date) {
			var _d = new Date(Number(date));
			return _d.toLocaleString();
		}
		var id = this.props.params.id;
	    superagent
	    	.get('http://localhost:5100/api/todo?id=' + id)
	    	.end(function(err, data) {
	    		var todoItem = data.body;

	    		this.setState({
	    			content: todoItem.content,
	    			createDate: toLocalTime(id),
	    			completeDate: !todoItem.complete ? '未结束' : toLocalTime(todoItem.complete)
	    		})
	    	}.bind(this))
	},
	render: function() {
		return (
			<div>
				<h2 className="title">TODO详情页</h2>
				<div className="detail">
					<p>详细内容：{this.state.content}</p>
					<p>创建时间：{this.state.createDate}</p>
					<p>完成时间：{this.state.completeDate}</p>
				</div>
				<a className="back" href="javascript:history.back();">返回首页</a>
			</div>
		)
	}
})

module.exports = Detail;
```

``` jsx
// ./components/TodoIndex.jsx

var React = require('react'),
	Input = require('./Input'),
	List = require('./List'),
	superagent = require('superagent');


var TodoIndex = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: {}
	    };
	},
	componentDidMount: function() {
		superagent
			.get('http://localhost:5100/api/todo')
			.end(function(err, data) {
				this.setState({
					todoList: data.body
				});
				return data.body;
			}.bind(this));
	},
	/**
	 * 保存数据
	 * @param  {[number]} id [新加入的数据的id]
	 * @param  {[content]} content [新加入的数据的内容]
	 */
	_save: function(id, content) {
		var _newList = this.state.todoList;
		var _newTodo = {
			content: content,
			complete: undefined
		}
		_newList[id] = _newTodo;
		// setState方法改动`state`，同时引用了`state`的组件都会重新渲染
		this.setState({
			todoList: _newList
		});
	},
	/**
	 * 删除数据
	 * @return {[type]} [description]
	 */
	_del: function(id) {
		var _newList = this.state.todoList;
		delete _newList[id];
		this.setState({
			todoList: _newList
		})
	},
	render: function() {
		return (
			<div>
				<h2 className="title">
					TODO列表页
				</h2>	
				<Input _onSave={this._save} />
				<List _onDel={this._del} todoList={this.state.todoList} />
			</div>	
		);
	}
});

module.exports = TodoIndex;
```

这样，我们就成功搭建了一个基于`React-Router`的SPA。

当然，作为一个完整的应用，我们需要完善其功能。而不能只是为了使用`React-Router`而去虚构功能。

## 重新分析需求

基于之前我们做的功能，我们已经熟悉了`React-Router`的基本使用方法，现在我们来重新分析我们的TODO。

首先，我们能够通过Ajax获取初始数据，然后渲染在页面上。之后，我们可以增加一条TODO，完成一条TODO（被完成的TODO会被加上一条中划线），删除一条已完成的TODO。

算了。。。这些东西就当做大家的课下作业，最终代码我已经写好了放在本节课的目录里，大家有疑问的地方可以自行查看。另外服务器端的代码相信大家学过了之前的[Node.js课程之利用express搭建一个MVC应用]()之后应该能够自己写了。同样地，我也将后台的API写好了放在`dataServer`里。希望大家能够不断丰富自己的技术栈，最终前端后台都能一锅端。

### 题外话

本节课的代码有点乱，希望大家多多自行体会。。。









