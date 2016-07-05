# 组件的嵌套

一个项目肯定不会只有一个组件，而且组件之间也肯定不会都平级关系，这时候我们需要多个组件，它们之间有平级，也有父子关系。

本节课，我们通过建立一个TODO应用，来学习React的组件通信。另外，我们还会涉及到一些其他的知识。我们并不会把React的知识点各个击破，那样学到的知识点难以串联起来。如果各位倾向于上述这种学习方式或者对某一个知识点不熟悉不理解，可以去看看[React中文文档](http://reactjs.cn/react/docs/getting-started.html)或者是[阮一峰老师的React教程](http://www.ruanyifeng.com/blog/2015/03/react.html)。

## 需求

建立一个TODO应用，展示一些初始伪造的数据。

### 建立项目

准备工作在上一节已经学习了，这一次我们一笔带过。

首先，建立`webpack.config.js`

然后`package.json`

``` sh
$ npm init
```

然后安装依赖
``` sh
$ npm install react react-dom --save
$ npm install babel-core babel-loader babel-preset-react less-loader css-loader style-loader less url-loader --save-dev
```

修改`npm scripts`
``` js
"scripts": {
	"build": "webpack --watch -d"
}
```

然后建立`index.html`
``` html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>helloworld</title>
</head>
<body>
	<div id="app"></div>
	<script type="text/javascript" src="./build/bundle.js"></script>
</body>
</html>
```

然后我们新建一个`components`文件夹，来存放所有的组件文件。

### 分析需求

#### 组件树

一个TODO应用，首先一个容器，然后下面是标题，输入框，TODO列表。所以，一共是三个组件，并且平级。

#### 组件通信

我们在输入框里面输入了TODO信息，点击确认，然后TODO列表里会自动增加一行。这就是唯一的组件间通信。

## 编写组件

### 组件树

我们将所有的组件放在`./components/`文件夹里，只对外暴露出`./components/App.jsx`文件，将所有的组件都打包在这里面。然后在`./index.jsx`文件中渲染。

``` jsx
// ./index.jsx
var React = require('react'),
	ReactDOM = require('react-dom'),
	App = require('./components/App');

ReactDOM.render(<App />, document.getElementById('app'));
```

``` jsx
// ./components/App.jsx
var React = require('react'),
	Title = require('./Title'),
	Input = require('./Input'),
	List = require('./List');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Title />
				<Input />
				<List />
			</div>	
		)
	}
});

module.exports = App;
```

``` jsx
// ./components/Title.jsx
var React = require('react');

var Title = React.createClass({
	render: function() {
		return (
			<h2 className="title">
				TODO
			</h2>	
		)
	}
})

module.exports = Title;
```

``` jsx
// ./components/Input.jsx
var React = require('react');

var Input = React.createClass({
	render: function() {
		return (
			<div className="input">
				input
			</div>	
		)
	}
})

module.exports = Input;
```

``` jsx
// ./components/List.jsx

var React = require('react');

var List = React.createClass({
	render: function() {
		return (
			<div className="list">
				list
			</div>	
		)
	}
})

module.exports = List;
```

``` sh
$ npm run build
```
 
打开`index.html`，可以看到页面上已经显示出了大概的结构了。

### DOM结构

然后我们将各个组件的DOM结构写出来

``` jsx
// ./comonents/Input.jsx

var React = require('react');

var Input = React.createClass({
	render: function() {
		return (
			<div className="input">
				<div className="table_row">
					<div className="table_control">
						<input placeholder="请输入事件" />
					</div>
					<div className="table_action">
						<span>确认</span>
					</div>
				</div>
			</div>	
		)
	}
})

module.exports = Input;
```

``` jsx
// ./components/List.jsx

var React = require('react');

var List = React.createClass({
	render: function() {
		return (
			<ul className="list">
				<li className="table_row">
					<div className="table_control">
						吃饭
					</div>
					<div className="table_action">
						<span>完成</span>
					</div>
				</li>
				<li className="table_row">
					<div className="table_control">
						睡觉
					</div>
					<div className="table_action">
						<span>完成</span>
					</div>
				</li>
				<li className="table_row">
					<div className="table_control">
						打豆豆
					</div>
					<div className="table_action">
						<span>完成</span>
					</div>
				</li>
			</ul>	
		)
	}
})

module.exports = List;
```

由于我们已经动态监控了项目，所以直接刷新`index.html`，查看效果。

效果已经出来了。我们来稍微加点样式。

建立`./public/less/style.less`，这里省略样式文件的代码。在`index.jsx`中引入文件。

``` jsx
require('./public/less/style');
```

重新刷新页面，发现页面我们要的东西已经大致出来了。至此，我们已经完成了React组件的嵌套。
