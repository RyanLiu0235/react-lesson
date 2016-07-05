# React + Webpack

这是我们推荐的第一步。

`React`用来实现`View`层的渲染，`Webpack`用来作为`打包&编译`工具足够了，至于任务管理（也就是以前`gulp&grunt`做的那一些事情），我们交给`npm scripts`来做。

## Webpack

我们首先来简单地学习一下`Webpack`。

`Webpack`是一个兼具编译与打包功能的构建工具，具体可以看看 [Webpack 入门指迷 - 题叶, JiyinYiyong - SegmentFault](https://segmentfault.com/a/1190000002551952)。它把所有的资源都通过loader打包进去，所有的资源最终都编译成为一个文件，被引入到html页面中。

### 安装`Webpack`

``` sh
$ sudo npm install -g webpack
```

这里我们需要全局安装`webpack`，因为后面我们会用到这个命令。

### webpack如何工作

在命令行里输入`webpack`，它会自己默认去找到`webpack.config.js`文件，或者你可以手动指定配置文件。找到配置文件之后，它会根据配置文件的信息去做对应的事情。

### 一个简单的webpack.config.js例子

``` javascript
var path = require('path');

module.exports = {
    entry: {
    	index: './index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react']
            }
        }]
    },
    resolve: {
    	extensions: ['', '.jsx', '.js']
    }
}
```

这里简单地介绍一下各个字段的意思：

* entry: 入口文件，也就是你`React`的主文件。

* output: 编译后的文件，里面定义的`path`跟`filename`分别为编译文件的路径与名字。

* module: `loaders`字段定义的是各个加载器，包括加载jsx文件的，图片的，样式的。

* resolve: 加载文件的后缀名。也就是说你后面写过的文件后缀在加载的时候就可以省略不写了。

### 一个简单的 React + Webpack 例子

本课程中含有一个简单的例子。这是个很简单的例子，所有的内容只是在页面上输出了一个`hello world!`。我们来一步步实现这个输出。

首先，我们还是将`webpack.config.js`放在项目文件的根目录。内容如上。

然后，我们创建`package.json`文件

``` sh
$ npm init
```

我们来根据我们的`webpack.config.js`来看看我们需要加载哪些包。

首先`react`，`react-dom`这两个包是一定要的。

``` sh
$ npm install react react-dom --save
```

然后我们在`webpack.config.js`里定义了一个`loader`，是`babel-loader`，它会帮我们编译`react`文件。所以我们需要安装`babel-core`，`babel-loader`，`babel-preset-react`，前两个是`babel`的核心包，后一个是react的预编译包。同样的，以后我们需要预编译`es2015`也就是ES6的时候，我们也需要安装`babel-preset-es2015`。

好了，我们先安装。

``` sh
$ npm install babel-core babel-loader babel-preset-react --save-dev
```

OK，这里我们需要的包就完全安装好了。

然后，我们需要创建一个React的渲染页面`index.html`，放在项目根目录下面。

我们前面说过，`webpack`会帮我们把所有的资源通过loader打包(包括所有的react文件)，最终的文件就是一个`bundle.js`。我们在`index.html`中只需要引入这个文件就成了。

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

然后，我们来写React组件。我们的功能就是输出一个`hello world`，那么，就只是需要一个组件。

``` jsx
var React = require('react'),
	ReactDom = require('react-dom');

var HelloWorld = React.createClass({
	render: function() {
		return(
			<div>
				<p>hello world!</p>
			</div>
			)
	}
});

ReactDom.render(<HelloWorld />, document.querySelector('#app'));
```

在前一节里我已经讲过了这个React组件是如何工作的。这里就略过了。

好了。所有的代码工作已经做完，现在我们来编译了。

任务管理我们交给`npm scripts`来解决。

打开`package.json`，在`scripts`字段中加入

``` javascript
"scripts": {
	"build": "webpack"
}
```

然后打开终端，编译

``` sh
$ npm run build
> react-webpack@1.0.0 build /Users/liucheng/Documents/react/react-lesson/lesson01-react与webpack
> webpack

Hash: 0b7518c8898422def38c
Version: webpack 1.13.1
Time: 1067ms
    Asset    Size  Chunks             Chunk Names
bundle.js  723 kB       0  [emitted]  index
    + 170 hidden modules
```

OK。我们的目录下面就多了一个`build`文件夹，里面有一个`bundle.js`，这跟我们在`webpack.config.js`里定义的是一样的。

直接在浏览器中打开`index.html`的静态文件，可以看到，`hello world`已经打印出来了。


