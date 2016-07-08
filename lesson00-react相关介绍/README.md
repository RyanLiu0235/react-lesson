# React相关介绍

## 特点

根据其官网上介绍，有如下三点：

> **仅仅是UI**——许多人使用React作为MVC架构的V层。 尽管React并没有假设过你的其余技术栈，但它仍可以作为一个小特征轻易地在已有项目中使用

> **虚拟DOM**——React为了更高超的性能而使用虚拟DOM作为其不同的实现。 它同时也可以由服务端Node.js渲染 － 而不需要过重的浏览器DOM支持

> **数据流**——React实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单

## 一切皆组件

`React`将一个页面在逻辑与功能上切分为一个组件数，即`一切皆组件`，通过组件的复用，使MVC架构的VIEW层分离得更加清楚。

## 一个简单的`React`组件

``` jsx
var React = require('react'),
	ReactDOm = require('react-dom');

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDom.render(<HelloMessage name="John" />, mountNode);
```

首先我们通过`React.createClass`方法创建一个组件，然后通过组件的`render()`方法返回这个组件的HTML结构，最后，通过`ReactDom.render()`方法渲染组件。

## 相关技术栈

现在做React开发，一般而言技术栈是：

> React + React-Router + Redux + webpack + Babel + npm + (测试模块)

其中前三者为JS部分，后面三者为构建工具。

我建议大家的学习步骤

* React + webpack

* React + React-Router + webpack

* React + React-Router + Flux + webpack

* React + React-Router + Flux + ES6 + webpack

* React + React-Router + Redux + ES6 + webpack

这样一来，基本的一套技术栈就算齐全了，至于说其他的延伸的工具或者插件，就不多作介绍了。

借用一段阮一峰老师在其博客[React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)里写的。

> 真正学会 React 是一个漫长的过程。

> 你会发现，它不是一个库，也不是一个框架，而是一个庞大的体系。想要发挥它的威力，整个技术栈都要配合它改造。你要学习一整套解决方案，从后端到前端，都是全新的做法。

> 举例来说，React 不使用 HTML，而使用 JSX 。它打算抛弃 DOM，要求开发者不要使用任何 DOM 方法。它甚至还抛弃了 SQL ，自己发明了一套查询语言 GraphQL 。当然，这些你都可以不用，React 照样运行，但是就发挥不出它的最大威力。
这样说吧，你只要用了 React，就会发现合理的选择就是，采用它的整个技术栈。






