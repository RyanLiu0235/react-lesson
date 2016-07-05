# 组件间通信

承接上一节，我们继续将组件间的通信写出来。我们的应用肯定会有一些初始数据，然后通过与用户的交互，肯定也会有一些数据的变化。

## 渲染初始数据

我们习惯将数据定义在父组件的`state`中，然后通过`props`传给子组件。子组件通过触发	`props`上的父元素的方法，来修改父元素上的`state`，从而达到数据的修改。`React`中组件间通信大概就是这样的模式。

现在我们在父组件`App.jsx`中定义数据。

``` jsx
// ./components/App.jsx

var App = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: []
	    };
	},
	render: function() {
		return (
			<div>
				<Title />
				<Input />
				<List todoList={this.state.todoList} />
			</div>	
		)
	}
});
```

我们在`App.jsx`的`getInitialState`方法中定义了一个数据`todoList`，并且通过一个类似HTML里属性的方式传给了`List`组件。子组件`List`可以通过`this.props.todoList`来获取到这个值。

`getInitialState`在组件挂载之前调用一次。返回值将会作为`this.state`的初始值。

现在我们给`todoList`伪造一些初始值。

``` jsx
// ./components/App.jsx

var App = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: [{
	    		id: 1467726253744,
	    		content: '吃饭饭'
	    	},{
	    		id: 1467726253746,
	    		content: '睡觉觉'
	    	},{
	    		id: 1467726253749,
	    		content: '打豆豆'
	    	}]
	    };
	},
	render: function() {
		return (
			<div>
				<Title />
				<Input />
				<List todoList={this.state.todoList} />
			</div>	
		)
	}
});
```

然后我在子组件里面获取这个初始值，并且渲染它。

``` jsx
// ./components/List.jsx

var List = React.createClass({
	render: function() {
		var list = this.props.todoList.map(function(item) {
			return (
				<li key={item.id} className="table_row">
					<div className="table_control">
						{item.content}
					</div>
					<div className="table_action">
						<span>完成</span>
					</div>
				</li>
			)
		})
		return (
			<ul className="list">
				{list}
			</ul>	
		)
	}
});
```
刷新页面，发现原先的假数据已经变成了现在父组件里面定义的伪数据。

至此，我们已经完成了初始数据的渲染工作，通过`传递props`来将父组件里的数据传递到子组件，这是React里的惯用方法。

## 数据的变动

### 数据的增加

通过表单元素`input`，`select`，`textarea`等，我们可以与用户获得一些数据的交互。具体可以查看这里[React中文文档——表单元素](http://reactjs.cn/react/docs/forms.html)。

我们在子元素里对表单元素的变动做一些处理

``` jsx
// ./components/Input.jsx

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
		this.setState({
			content: _v,
			id: Date.now()
		});
	},
	/**
	 * 数据保存
	 */
	_save: function() {
		if (!this.state.content) return;
		// 通过`props`，调用父组件的方法
		this.props._onSave(this.state);
	},
	render: function() {
		return (
			<div className="input">
				<div className="table_row">
					<div className="table_control">
						<input placeholder="请输入事件" onChange={this._change} />
					</div>
					<div className="table_action">
						<span onClick={this._save}>确认</span>
					</div>
				</div>	
			</div>	
		)
	}
})

```

``` jsx
// ./components/App.jsx

var App = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: [{
	    		id: 1467726253744,
	    		content: '吃饭饭'
	    	},{
	    		id: 1467726253746,
	    		content: '睡觉觉'
	    	},{
	    		id: 1467726253749,
	    		content: '打豆豆'
	    	}]
	    };
	},
	/**
	 * 保存数据
	 * @param  {[object]} newTodo [新加入的数据]
	 */
	_save: function(newTodo) {
		var _newList = this.state.todoList.concat(newTodo); // 与原先的数据进行合并
		// setState方法改动`state`，同时引用了`state`的组件都会重新渲染
		this.setState({
			todoList: _newList
		});
	},
	render: function() {
		return (
			<div>
				<Title />
				<Input _onSave={this._save} />
				<List todoList={this.state.todoList} />
			</div>	
		);
	}
});
```

至此，我们完成了初始数据的渲染，与用户数据的交互，数据的修改，同时二次渲染界面。

在这个过程中，父组件通过`props`将数据传递给子组件调用，同时子组件通过`props`调用父组件的方法，在父组件里修改了父组件的`state`。在这个过程中，`state`的变动触发了引用这个`state`的组件模板的重新渲染。

这就是React里组件之间通信的基本过程。

最后，我们还有一点善后的工作：在用户确认提交数据之后，将原先输入的数据清空。修改`Input.jsx`

``` jsx
// ./components/Input.jsx
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
		this.setState({
			content: _v,
			id: Date.now()
		});
	},
	/**
	 * 数据保存
	 */
	_save: function() {
		if (!this.state.content) return;
		// 通过`props`，调用父组件的方法
		this.props._onSave(this.state);
		this.refs.input.value = "";
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
});
```

这里我们绑定了一个`ref`属性到`input`元素上去，然后再通过`this.refs`获取这个元素的`支撑实例`，然后通过设置它的`value`为空，将输入内容清空。具体有关于`ref`的相关信息，请移步[React中文文档](http://reactjs.cn/react/docs/more-about-refs.html)。

### 数据的删除

在TODO列表中，我们点击`完成`的时候，会删除掉这个已经完成的TODO。我们来在`List`组件中添加对应的事件。

``` jsx
// ./components/List.jsx

var List = React.createClass({
	_onDel: function(e) {
		var _id = e.target.parentNode.parentNode.id;
		this.props._onDel(_id);
	},
	render: function() {
		var list = this.props.todoList.map(function(item) {
			return (
				<li key={item.id} id={item.id} className="table_row">
					<div className="table_control">
						{item.content}
					</div>
					<div className="table_action">
						<span onClick={this._onDel}>完成</span>
					</div>
				</li>
			)
		}.bind(this))
		return (
			<ul className="list">
				{list}
			</ul>	
		)
	}
});
```

同时，我们在父组件`App.jsx`中定义相关的处理方法。

``` jsx
// ./components/App.jsx

var App = React.createClass({
	getInitialState: function() {
	    return {
	    	todoList: [{
	    		id: 1467726253744,
	    		content: '吃饭饭'
	    	},{
	    		id: 1467726253746,
	    		content: '睡觉觉'
	    	},{
	    		id: 1467726253749,
	    		content: '打豆豆'
	    	}]
	    };
	},
	/**
	 * 保存数据
	 * @param  {[object]} newTodo [新加入的数据]
	 */
	_save: function(newTodo) {
		var _newList = this.state.todoList.concat(newTodo); // 与原先的数据进行合并

		// setState方法改动`state`，同时引用了`state`的组件都会重新渲染
		this.setState({
			todoList: _newList
		});
	},
	/**
	 * 删除数据
	 * @return {[type]} [description]
	 */
	_del: function(_id) {
		var newList = this.state.todoList;
		this.state.todoList.map(function(item, i) {
			if (item.id == _id) {
				newList.splice(i, 1);
				this.setState({
					todoList: newList
				})
			}
		}.bind(this));
	},
	render: function() {
		return (
			<div>
				<Title />
				<Input _onSave={this._save} />
				<List _onDel={this._del} todoList={this.state.todoList} />
			</div>	
		);
	}
});
```
至此，我们完成数据的增加和删除，无非就是利用`props`翻来覆去地折腾。


