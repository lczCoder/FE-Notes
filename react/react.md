# REACT

## 介绍

一款javascript前端框架，把用户界面抽象成一个个的组件，按需组合成页面，[官网](https://zh-hans.reactjs.org/)，与其他框架的共同点是，都采用虚拟dom，和数据驱动

|          | angularJs | reactJs | vueJs | angularTs |
| -------- | --------- | ------- | ----- | --------- |
| 控制器   | √         | -       | -     | 弱化      |
| 过滤器   | √         | -       | √     | √         |
| 指令     | √         | -       | √     | √         |
| 模板语法 | √         | -       | √     | √         |
| 服务     | √         | -       | -     | √         |
| 组件     | -         | √       | √     | √         |
| jsx      | -         | √       | 加入  | -         |



## 环境搭建

### 官方脚手架

安装 [yarn](https://classic.yarnpkg.com/zh-Hans/docs/install)

```js
//查询当前镜像
yarn config get registry 
//设置为淘宝镜像
yarn config set registry https://registry.npm.taobao.org/
//设置为官方镜像
//yarn config set registry https://registry.yarnpkg.com
```

**安装** [create-react-app](https://create-react-app.dev/docs/getting-started)

```js
yarn global add create-react-app 
或
npm install create-react-app	-g //非安装包安装的yarn 推荐
```

**创建** react项目

```js
create-react-app 目录 | npx create-react-app 目录 | npm init react-app 目录

yarn eject   解构出所有的配置文件 可选
yarn start |  npm start 			开发
yarn build |  npm run build	 打包

//调试 需要安装给chrome浏览器一个插件 react-dev-tools
```

**环境解析**

- react: 核心包，解析组件,识别jsx **演示**
- react-dom: 编译 -> 浏览器 **演示**
- react-scrpts: react的项目环境配置
- manifest.json 生成一个网页的桌面快捷方式时，会以这个文件中的内容作为图标和文字的显示内容
- registerServiceWorker.js支持离线访问，所以用起来和原生app的体验很接近,只有打包生成线上版本的react项目时，registerServiceWorker.js才会有效。服务器必须采用https协议
- 对Internet Explorer 9,10和11的支持需要polyfill。

**环境配置**

```js
npm run eject | yarn eject
报git错误时: 
	git add . -> git commit -m 'init' -> yarn eject

  报缺少babel 包: 安装一下
  
//修改端口
//修改script/start.js
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3001;

//去除eslint 警告
//config/webpack.config.js
//注释关于eslint的导入和rules规则
```

### 第三方脚手架

yomen/umi

### webpack手动搭建



## **资源限制**

- 本地资源导入(import) 不可以导入src之外的包

- 相对 路径的根式src，绝对路径 的根是 public目录

- 前景图片, 相对 和 绝对路径 都指向了 public目录



## JSX

jsx是一个 JavaScript 的语法扩展，可以理解为js的一个新的数据类型，类XML（JSON前身）语法，出现在js当中，文件为xx.js|xx.jsx

```jsx
var b= <strong>强壮</strong>
```

**语法要求**

- 标签要闭合
- 元素必须要有一个顶层元素
- 变量首字母大写代表组件，小写对应是js数据类型
- 属性，小驼峰命名  `<xx tabIndex="2">`

JSX 是一个 JavaScript 语法扩展。它类似于模板语言，但它具有 JavaScript 的全部能力。JSX 最终会被编译为 `React.createElement()` 函数调用，返回称为 “React 元素” 的普通 JavaScript 对象

## 类

es6

```js
class Person2223{
  constructor(name){
    this.name=name||'alex'  //实例属性创建，赋值
  }
  show(){//实例方法
    console.log('show',this.name);
  }
}
Person2223.VERSION='1.2.3';//静态属性|类属性

//子类
class Worker123 extends Person2223{
  constructor(name,job){
    super(name);//类如果有继承 super就要出现
    this.job=job||'卖烧饼';
  }
  show2(){
    console.log(this.job,this.name);
  }
}
```

es6+

```js
//es7 类
class Person123{
  name='alex'; //实例属性  放在类内部,设置默认值
  age; //没有默认值的实例属性
  static VER='1.11.1';  //类属性 静态属性
  constructor(name,age){
    this.name=name;
    this.age=age||20; //构造器里面可以初始化实例属性
  }

  show(){//方法
    console.log(this.name,this.age,this.show);//访问实例属性
  }

  static show2(){//静态|类 方法定义
    console.log(this.name)
  }
}

class Workerr321 extends Person123{

  job; //实例属性

  static SUM=100;

  constructor(name,age,job){
    super(name,age);//调用父类 影响父类传入到当前的实例属性
    this.job=job||'卖闲鱼'; //构造器初始化
    // this.address='外滩18号';//实例属性，要实现声明
  }

  showJob(){
    console.log(this.job);
  }

}
```



## 组件

react组件：`类`组件和`函数式`组件和`api`组件(React.createClass)

**创建组件**

```jsx
//es6
import React from 'react';

class 组件名 extends React.Component{

  state={} 实例属性 组件状态

  static msg;  类属性

  constrctor(props){ //需要在构造时，修改组件的状态时，constrctor才会出现
    super(props) //类如果有继承 super就要出现
      需要在组件构造器内处理传递过来的props时，props参数就出现

    this.state={ // 本地状态

    }
  }
  render(){
    return jsx|null   //jsx~~要渲染   null不渲染
  }
  方法1(){} 自定义的方法
  static 方法2(){}
}

//es5
//var React = require('react');
//let 组件名 = React.createClass({
 // getInitialState:function(){  //组件状态
   // return {
     // 数据:值
   // }
  //}
  //render:function(){
   // return jsx
  //}
//})
```

**使用组件**

```jsx
<App/>
<Header></Header>

嵌套组件
```

**渲染**（描画）页面

```js
import ReactDom from 'react-dom';
var RactDom = require('react-dom');
ReactDom.render(jsx,插入点,回调)
```



## props

**传递属性**

```jsx
<组件名 属性名=值 属性名2=值2 .. />
```

> propName="字符"  propName={js数据类型}

**使用属性**

```jsx
{this.props.属性名}
```

> this 代表的是组件本身
>
> 对象无法直接通过{对象}展示

**类型检查**

```jsx
import propsTypes from 'prop-types'

//默认值:		
组件.defaultProps={propName:值,xx:oo}

//类型约定:
组件.propTypes={propsName:propsTypes库.类型名,xx:类型}
//propsTypes库.array/bool/func/number/object/string

//必传参数
propName: propsTypes库.类型名.isRequired
```

> 组件无论是使用[函数声明还是通过 class 声明](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)，都决不能修改自身的 props



## 事件

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
- 类组件，事件函数内部this会丢失

事件绑定

```jsx
<JSX元素 onClick={this.实例方法|函数体}
```

修正this

```jsx
onClick={this.方法.bind(this,值)}
onClick={()=>this.方法()}
构造器： this.方法=this.方法.bind(this)  √
实例方法=()=>{箭头函数定义方法}  √√
```

事件对象

```js
实例方法(ev)	ev 代理事件对象 ev.target 返回虚拟Vdom √
```

冒泡

```js
阻止： ev.stopPropagation()
```

默认行为

```js
阻止： ev.preventDefault()
```



## 组件状态

state|数据|私有状态|本地状态

**定义**

```jsx
//es6+ 
//实例属性: state    
class App{state:{}}

//es6：构造器 this.state  
class App extends React.Component{
  constructor(){
    this.state={}
  }
}

//ES5：
React.createClass({
  getInitialState:function(){
    return {
      状态名:值,xx:oo
    }
  }   
})
```

**获取**

```jsx
//渲染
{this.state.proname}
//获取
this.state.proname
```

**修改状态**

```jsx
//修改
this.setState(对象)  //浅合并state

this.setState((asyncState,prevProps)=>{
  //一般是用于在setState之前做一些操作
  //this.state==同步结果
  //asyncState==异步结果
  return {
    sname:value
  }
}) 

this.setState({
  sname:value
}, () => {
  //一般是用于在setState之后做一些操作
  //this.state == 修改之后的state
})
```

> setState是异步的

## 列表渲染

```jsx
//对象 数组 string 数字
this.props|state.属性名.map(function(val,index){
  return jsx
})
```



## 条件渲染

```jsx
//表达式渲染
this.state|props.proname ? jsx1 : jsx2
this.state|props.proname && jsx

//render里面写语句
render(){
  let el=null;
  if(this.state|props.proname){
    el=jsx1
  }else{
    el=jsx2
  }
  
  return el
}

//渲染写成实例方法
renderFn(参数){
  ...参数 做判断
  return el
}
render(){
  return {this.renderFn(条件)}
}
```



## refs

需要抓取dom元素与第三方 DOM 库集成，触发命令式动画，管理焦点，文本选择或媒体播放

**用法**

refs用法 有4种

```jsx
//1、 string refs
<jsx元素 ref="名字"...
this.refs.名字

//2. 实例化
this.firstRef = React.createRef() //发生在构造器
<jsx ref={this.firstRef} />
  
this.firstRef 访问 -》 {current:dom}
  
// 3. callback refs  回调 √
<jsx ref={el => this.定义一个实例属性 = el}
this.定义一个实例属性 //后期用作访问jsx元素

// 4. 转发 refs
  
//当组件挂载时，将 DOM el元素传递给 ref 的回调
//当组件卸载时，则会传递 null。
//ref 回调会在 componentDidMount 和 componentDidUpdate 生命周期之前调用
```

## 受控元素

表单的value受控，受数据控制

```jsx
value={this.state.数据名}  //model->view
onChange={this.方法}   //view->model
```

**处理多个输入元素**

可以为每个元素添加一个 name 属性(通常和数据名一致)，处理函数根据 event.target.name 的值来选择要做什

```jsx
<input name="inputUserName" 
<input name="inputContent"

this.setState({[ev.target.name]:ev.target.value})
```

`双向绑定`

## 非受控元素

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 [使用 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 来从 DOM 节点中获取表单数据

```jsx
<input type="text" ref="xx" />
```

**默认值**

表单元素上的 `value` 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新,指定一个 `defaultValue` 属性，而不是 `value`

`留言板`

## 样式

### css

**引用**

```jsx
<jsx className="类名 类名2" className={返回字符}
<jsx style={{key:value,key:value}}
//style的属性值，可以不给单位，默认px  子属性小驼峰
```

**定义**

- index.html ： 引入  link/style  公共样式  不优化 第三方样式

- index.jsx： import './css/xx.css'  是全局 公共样式 会优化

- 组件.jsx  import './css/xx.css'  全局  公共样式 会优化

**选择器冲突**解决方案

- 命名空间  BEM

- 模块化

```jsx
import 变量  from './css/xx.module.css' 
<jsx className={变量.类名|id}

//配置1 
//webpack配置 "style-loader!css-loader?modules" | module:true
//问题：所有css都需要模块化使用

//配置2 
//改名xx.css -> xx.module.css 
//需要模块化的才修改,不影响其他非模块化css写法
```

### **scss**

安装: node-sass

```scss
/*定义scss*/
$bg-color: #399;
.box{
  background: $bg-color;
}
```

```jsx
//引入
import 'xx/xx.scss'

//使用
<jsx className="box"

//模块化
import style form xx.module.scss
<xx className={style.box}
```

引入scss**全局变量**

- 局部scss文件内部： @import './全局.scss'

- webpack配置一次，局部scss内部直接使用

```js
//1. 安装插件 : sass-resources-loader
//2. 配置修改webpack.config.js

{
  test:sassRegex,
  ...
  use: [
    {loader:'style-loader'},
    {loader:'css-loader'}, 
    {loader:'sass-loader'},
    {
      loader: 'sass-resources-loader',
      options:{
        resources:'./src/xx/全局主题.scss'
      }
    }
  ]
}

```

> 注意: 
> 		loader:'css-loader?modules'    ?modules 模块化时需要添加
> 		resources 指向作用域在项目环境下



## 组件拆分规则

组件拆分目标：为了复用

组件如何拆：单一原则

状态应该给谁（状态提升）

- 尽量给顶层组件(状态提升),->props->子组件

- 可以从 props(属性) 得到，那么它可能不应该在 state(状态) 中

- 方法-》操作数据(数据|状态在哪，方法就应该在哪)
- props取名从组件本身的角度来命名, 而不是它被使用的上下文环境





## 动画

**tansition**

```css
transition: .5s ease all;
进度条
```

**AntMotion**

[官网](https://motion.ant.design/index-cn)，是一款蚂蚁金服的动画组件库，支持单元素，css、进出场动画、及文字动画

组件内部的 一级元素&& 做动画
一级元素要有key，根据编号依次做动画,无key不动画，路由离场动画无效
包裹路由组件无效(一级元素&& 进退场)





## 生命周期

实例化 ->  更新期  -> 销毁时

### es5版

**实例化**

1. 取得默认属性(**getDefaultProps**) 外部传入的props
2. 初始状态(**getInitailState**)  state状态
3. 即将挂载 **componentWillMount**
4. 描画VDOM  **render**
5. 挂载完毕 **componentDidMount**

### 次新版

**实例化**

1. 取得默认属性，初始状态在constructor中完成

   运行一次，可读数据，同步修改state，可以访问到props

2. 即将挂载 **componentWillMount**

3. 描画VDOM  **render**

4. 挂载完毕 **componentDidMount**

   使用ref，使用setState，读取数据

**更新期**

1. props改变 **componentWillReceiveProps**(nextProps)
   初始化render时不执行 这里调用更新状态是安全的，并不会触发额外的render调用，nextProps 更新后  this.props更新前

2. 是否更新 **shouldComponentUpdate**  

   指视图 return true/false

3. 即将更新 **componentWillUpdate**

4. 描画dom  **render**

   不要在这里修改数据

5. 描画结束 componentDidUpdate

**销毁时**

**componentWillUnmount**即将卸载，可以做一些组件相关的清理工作，例如取消计时器、网络请求等

> 所有子挂载完，才标志着父挂载完，父更新子更新，子更新父不更新

### 新版

[脑图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)，挂载前、更新前、props更新前统一用getDerivedStateFromProps代替，并添加了返回快照钩子getSnapshotBeforeUpdate

> 返回快照：发生在render完了，但还没有去编译真实dom之前，返回dom的快照

**实例化**

1. 渲染前 static **getDerivedStateFromProps**(nextProps,nextState)  {} 

   > 无法访问this
   > nextProps,nextState是更新后的
   > 必须返回 一个对象，用来更新state 或者 返回 null不更新
   > 必须要初始化state
   > 场景：state 的值在任何时候都取决于 props时

2. 渲染中 **render**

   > 必须return jsx|string|number|null
   > 不会直接与浏览器交互:不要操作DOM|和数据

3. 挂载后 **componentDidMount**

**更新期**

1. 渲染前 static **getDerivedStateFromProps**(nextProps, nextState)

2. 是否渲染 **shouldComponentUpdate**(nextProps, nextState)

   > 是否更新，必须返回true/false
   > 首次渲染或使用 forceUpdate() 时不会调用该方法
   > nextProps,nextState更新后的,this.props,this.state 更新前的
   > return false 只阻止当前组件渲染

3. 渲染中 **render**

4. dom快照 **getSnapshotBeforeUpdate**(prevProps, prevState)

   > 组件能在发生更改之前从 DOM 中捕获一些信息（dom渲染前的状态)
   > 返回的 值|null 会给 componentDidUpdate
   > prevProps, prevState 更新前 this.props,this.state更新后
   >
   > [事例](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

5. 更新后 **componentDidUpdate**(prevProps, prevState,snopshot)

   > this.props.更新后的
   > snopshot 是 getSnapshotBeforeUpdate构造的返回值
   >
   > 抓取到的是渲染后的dom状态，通过snopshot拿到dom渲染前的状态

**销毁时**

即将卸载 **componentWillUnmount**



## 数据交互

### fetch

js原生api，是promise的语法糖，用法如下

```jsx
fetch(url+get数据,{配置}).then((res)=>{}).catch((err)=>{})

//配置
//method:'POST'  默认get
//headers:{"Content-type":"application/x-www-form-urlencoded"},
//body:'a=1&b=2'|URLSearchParams
//注意： body数据为字符时，需要携带请求头
//async + await 用法
```

> res.ok :	true/false 成功/失败
> 		res.status:	 状态码
> 		res.body :	数据 数据流(stream)
> 		res.text() ：	转换 文本(string)，过程异步，return res.text()
> 		res.json() ：	转  对象

[文档](https://github.github.io/fetch/)

**jsonp**

fetch不带jsonp请求  需要依赖第三库`yarn add  fetch-jsonp --save`

```js
import fetchJsonp from 'fetch-jsonp'

fetchJsonp(url+数据,{配置}).then((res)=>{}).catch(err=>{})

//是个promise 返回promise 数据是个流
//res.json()  -> 流转换数据 是异步
```

> timeout: 延时  5000	配置
> 		jsonpCallback: 回调函数key callback
> 		jsonpCallbackFunction: null
>
> **百度下拉**（函数节流、事件、setState异步）

### axios

同vue

### umi-request

[文档](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md)

### 客户端代理

正向代理隐藏真实客户端，反向代理隐藏真实服务端，正向代理实现翻墙，反向代理实现跨域，客户端代理指的就是代码写在客户端，不过实现的是跨域

方案1

```js
//配置: package.json
"proxy":"https://uncle9.top"

//组件
/api/xx ...

问题： 只能代理一个服务器
```

方案2

利用客户端代理中间件(http-proxy-middleware)完成, 官网给了新的使用方式，在src下新建文件setupProxy.js加下面代码，无需单独应用，webpack会自动引入文件。

```js
// src/ 创建 setupProxy.js

//verion < 1.0
const proxy = require('http-proxy-middleware'); //需要安装中间件  
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: 'https://uncle9.top',
      changeOrigin: true
    })
  );
  app.use(
    proxy("/v2", {
      target: "https://api.douban.com",
      changeOrigin: true
    })
  );
};

//组件： /api/xx ... | /v2/...

//verion > 1.0
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }));

  app.use('/api2', createProxyMiddleware({
    target: 'http://vareyoung.top',
    changeOrigin: true,
    pathRewrite: { //路径替换
      '^/api2': '/api', // axios 访问/api2 == target + /api
    }
  }));

};
```

方案3

配置create-react-app环境下的webpack

```.
// config/webpackDevServer.js

proxy: {
  '/api2': {
    target: 'http://vareyoung.top', // 后台服务地址以及端口号
    ws: true, // websoket 服务
    changeOrigin: true, //是否跨域
    pathRewrite: { '^/api2': '/api' }
  }
}
```



## mock

JSON-Server 是一个 Node 模块，运行 Express 服务器，你可以指定一个 json 文件作为 api 的数据源。

### 安装json-server

```sh
npm install -g json-server
```

### 启动 json-server

`json-server`可以直接把一个`json`文件托管成一个具备全`RESTful`风格的`API`,并支持跨域、`jsonp`、路由订制、数据快照保存等功能的 web 服务器。

db.json文件的内容：

```json
{
  "course": [
    {
      "id": 1000,
      "course_name": "马连白米且",
      "autor": "袁明",
      "college": "金并即总变史",
      "category_Id": 2
    },
    {
      "id": 1001,
      "course_name": "公拉农题队始果动",
      "autor": "高丽",
      "college": "先了队叫及便",
      "category_Id": 2
    }
  ]
}
```

例如以下命令，把`db.json`文件托管成一个 web 服务。

```sh
$ json-server --watch --port 53000 db.json
```

输出类似以下内容，说明启动成功。

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:53000/course

Home
http://localhost:53000

Type s + enter at any time to create a snapshot of the database
Watching...
```

此时，你可以打开你的浏览器，然后输入：<http://localhost:53000/course>

### json-server 的相关启动参数

- 语法：`json-server [options] <source>`
- 选项列表：

| 参数               | 简写 | 默认值                                              | 说明                             |
| :----------------- | :--- | :-------------------------------------------------- | :------------------------------- |
| --config           | -c   | 指定配置文件                                        | [默认值: "json-server.json"]     |
| --port             | -p   | 设置端口 [默认值: 3000]                             | Number                           |
| --host             | -H   | 设置域 [默认值: "0.0.0.0"]                          | String                           |
| --watch            | -w   | Watch file(s)                                       | 是否监听                         |
| --routes           | -r   | 指定自定义路由                                      |                                  |
| --middlewares      | -m   | 指定中间件 files                                    | [数组]                           |
| --static           | -s   | Set static files directory                          | 静态目录,类比：express的静态目录 |
| --readonly         | --ro | Allow only GET requests [布尔]                      |                                  |
| --nocors           | --nc | Disable Cross-Origin Resource Sharing [布尔]        |                                  |
| --no               | gzip | , --ng Disable GZIP Content-Encoding [布尔]         |                                  |
| --snapshots        | -S   | Set snapshots directory [默认值: "."]               |                                  |
| --delay            | -d   | Add delay to responses (ms)                         |                                  |
| --id               | -i   | Set database id property (e.g. _id) [默认值: "id"]  |                                  |
| --foreignKeySuffix | --   | fks Set foreign key suffix (e.g. _id as in post_id) | [默认值: "Id"]                   |
| --help             | -h   | 显示帮助信息                                        | [布尔]                           |
| --version          | -v   | 显示版本号                                          | [布尔]                           |

- source可以是json文件或者js文件。实例：

```sh
json-server --watch -c ./jsonserver.json
json-server --watch db.js  命令行里面要的db是个函数
json-server db.json
json-server --watch -port 8888 db.json
```

### 动态生成模拟数据

启动json-server的命令：`json-server --watch db.js` 是把一个js文件返回的数据托管成web服务。

app.js配合[mockjs](http://mockjs.com/)库可以很方便的进行生成模拟数据

```js
// 用mockjs模拟生成数据
var Mock = require('mockjs');

module.exports = () => {
  // 使用 Mock
  var data = Mock.mock({
    'course|227': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1000,
        course_name: '@ctitle(5,10)',
        autor: '@cname',
        college: '@ctitle(6)',
        'category_Id|1-6': 1
      }
    ],
    'course_category|6': [
      {
        "id|+1": 1,
        "pid": -1,
        cName: '@ctitle(4)'
      }
    ]
  });
  // 返回的data会作为json-server的数据
  return data;
};
```

### 路由

#### 默认的路由

`json-server`为提供了`GET`,`POST`, `PUT`, `PATCH` ,`DELETE`等请求的API,分别对应数据中的所有类型的实体。

```
# 获取所有的课程信息
GET    /course

# 获取id=1001的课程信息
GET    /course/1001

# 添加课程信息，请求body中必须包含course的属性数据，json-server自动保存。
POST   /course

# 修改课程，请求body中必须包含course的属性数据
PUT    /course/1
PATCH  /course/1

# 删除课程信息
DELETE /course/1

# 获取具体课程信息id=1001
GET    /course/1001
```

#### 自定义路由

当然你可以自定义路由：

```sh
$ json-server --watch --routes route.json db.json
```

`route.json`文件

```json
{
  "/api/*": "/$1",    //   /api/course   <==>  /course
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

### 自定义配置文件

通过命令行配置路由、数据文件、监控等会让命令变的很长，而且容易敲错，可以把命令写到npm的scripts中，但是依然配置不方便。

json-server允许我们把所有的配置放到一个配置文件中，这个配置文件默认`json-server.json`;

例如:

```json
{
  "port": 53000,
  "watch": true,
  "static": "./public",
  "read-only": false,
  "no-cors": false,
  "no-gzip": false,
  "routes": "route.json"
}
```

使用配置文件启动json-server:

```sh
# 默认使用：json-server.json配置文件
$ json-server db.js  
$ json-server db.json 

# 指定配置文件
$ json-server --watch -c jserver.json db.json
```

### 过滤查询

查询数据，可以额外提供

```
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2

# 可以用 . 访问更深层的属性。
GET /comments?author.name=typicode
```

还可以使用一些判断条件作为过滤查询的辅助。

```http
GET /posts?views_gte=10&views_lte=20
```

可以用的拼接条件为：

- `_gte` : 大于等于
- `_lte` : 小于等于
- `_ne` : 不等于
- `_like` : 包含

```http
GET /posts?id_ne=1
GET /posts?id_lte=100
GET /posts?title_like=server
```

### 分页查询

默认后台处理分页参数为： `_page` 第几页， `_limit`一页多少条。

```
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```

> 默认一页10条。

后台会返回总条数，总条数的数据在响应头:`X-Total-Count`中。

### 排序

- 参数： `_sort`设定排序的字段
- 参数： `_order`设定排序的方式（默认升序）

```http
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
```

支持多个字段排序：

```http
GET /posts?_sort=user,views&_order=desc,asc
```

### 任意切片数据

```http
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
```

### 全文检索

可以通过`q`参数进行全文检索，例如：`GET /posts?q=internet`

### 实体关联

#### 关联子实体

包含children的对象, 添加`_embed`

```http
GET /posts?_embed=comments
GET /posts/1?_embed=comments
```

#### 关联父实体

包含 parent 的对象, 添加`_expand`

```http
GET /comments?_expand=post
GET /comments/1?_expand=post
```

### 其他高级用法

`json-server`本身就是依赖express开发而来，可以进行深度定制。细节就不展开，具体详情请参考[官网](https://github.com/typicode/json-server)。

```js
const jsonServer = require('json-server');//在node里面使用json-server包
const db = require('./db.js');//引入mockjs配置模块
const path = require('path');
const Mock = require('mockjs');
let mock='/mock';//定义路由根别名

//创建服务器
const server = jsonServer.create();//创建jsonserver 服务对象


//配置jsonserver服务器 中间件
server.use(jsonServer.defaults({
  static:path.join(__dirname, '/public'),//静态资源托管
}));
server.use(jsonServer.bodyParser);//抓取body数据使用json-server中间件


//响应
server.use((request, res, next) => {//可选 统一修改请求方式
  // console.log(1)
  // request.method = 'GET';
  next();
});

//登录注册校验
let mr = Mock.Random;//提取mock的随机对象
server.get(mock+'/login', (req, res) => {
  // console.log(req.query, req.body);//抓取提交过来的query和body
  let username=req.query.username;
  let password=req.query.password;
  (username === 'aa' && password === 'aa123')?
    res.jsonp({
      "err": 0,
      "msg": "登录成功",
      "data": {
        "follow": mr.integer(1,5),
        "fans": mr.integer(1,5),
        "nikename": mr.cname(),
        "icon": mr.image('20x20',mr.color(),mr.cword(1)),
        "time": mr.integer(13,13)
      }
    }) :
    res.jsonp({
      "err": 1,
      "msg": "登录失败",
    })

});
server.post(mock+'/reg', (req, res) => {
  let username=req.body.username;
  (username !== 'aa') ?
    res.jsonp({
      "err": 0,
      "msg": "注册成功",
      "data": {
        "follow": mr.integer(0,0),
        "fans": mr.integer(0,0),
        "nikename": mr.cname(),
        "icon": mr.image('20x20',mr.color(),mr.cword(1)),
        "time": mr.integer(13,13)
      }
    }) :
    res.jsonp({
      "err": 1,
      "msg": "注册失败",
    })

});

//响应mock接口 自定义返回结构 定义mock接口别名
const router = jsonServer.router(db);//创建路由对象 db为mock接口路由配置  db==object

router.render = (req, res) => {//自定义返回结构
  let len = Object.keys(res.locals.data).length; //判断数据是不是空数组和空对象
  // console.log(len);

  setTimeout(()=>{//模拟服务器延时
    res.jsonp({
      err: len !== 0 ? 0 : 1,
      msg: len !== 0 ? '成功' : '失败',
      data: res.locals.data
    })
  },1000)

  // res.jsonp(res.locals.data)

};

server.use(jsonServer.rewriter({//路由自定义别名
  [mock+"/*"]: "/$1",

  // "/product\\?dataName=:dataName": "/:dataName",
  // "/banner\\?dataName=:dataName": "/:dataName",
  // "/detail\\?dataName=:dataName&id=:id": "/:dataName/:id",

  // "/product/del\\?dataName=:dataName&id=:id": "/:dataName/:id",
  // "/product/add\\?dataName=:dataName": "/:dataName",
  // "/product/check\\?dataName=:dataName&id=:id": "/:dataName/:id"
}));

server.use(router);//路由响应



//开启jsonserver服务
server.listen(3333, () => {
  console.log('mock server is running')
});
```



## 路由

[官网](https://reacttraining.com/react-router/) 中文

|          | vue-router                   | react-router                 |
| -------- | ---------------------------- | ---------------------------- |
| **配置** | 分离式（统一位置配置）       | 嵌套式（路由配置在组件内部） |
| **匹配** | 排他性（只有一个路由被渲染） | 包容性（多路由渲染）         |
| **形态** | 静态路由                     | 动态路由                     |

**理念**

遵循Just Component的 API 设计理念 万物皆组件，路由规则位于布局和 UI 本身之间

**安装**

React Router被拆分成三个包：react-router,react-router-dom和react-router-native。react-router提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件

```node
yarn add react-router-dom --save
```

**提供组件**

| 组件          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| BrowserRouter | 约定模式 为 history，使用 HTML5 提供的 history API 来保持 UI 和 URL 的同步 |
| HashRouter    | 约定模式 为 hash，使用 URL 的 hash (例如：window.location.hash) 来保持 UI 和URL 的同步 |
| NavLink       | 声明式跳转 还可以约定 路由激活状态                           |
| Link          | 声明式跳转    ~~ push 无激活状态                             |
| Redirect      | 重定向    ~~ replace                                         |
| Route         | 匹配、展示                                                   |
| Switch        | 排他性匹配                                                   |
| Prompt        | 后置守卫                                                     |
| withRouter    | 把不是通过路由切换过来的组件中，将 history、location、match 三个对象传入props对象上 |

**结构**

- BrowserRouter|HashRouter
  - 根组件(App)
    - NavLink|Link
    - Route
    - Redirect
      - 子组件
        - NavLink|Link
        - Route
        - ...

**BrowserRouter**

| 属性                | 类型     | 作用                                                         |
| ------------------- | -------- | ------------------------------------------------------------ |
| basename            | string   | 所有位置的基本URL。如果您的应用是从服务器上的子目录提供的，则需要将其设置为子目录。格式正确的基本名称应以斜杠开头，但不能以斜杠结尾 |
| getUserConfirmation | Function | 用于确认导航的功能。默认使用[`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)。 |
| forceRefresh        | boolean  | 是否调整时强制刷新，模拟旧式服务器渲染                       |

**Route**

| 属性      | 类型                     | 作用                                                         |
| --------- | ------------------------ | ------------------------------------------------------------ |
| path      | string  object           | 路由匹配路径。没有path属性的Route 总是会 匹配                |
| exact     | boolean                  | 为true时，要求全路径匹配(/home)。路由默认为“包含”的(/和/home都匹配)，这意味着多个 Route 可以同时进行匹配和渲染 |
| component | Function    ReactElement | 在地址匹配的时候React的组件才会被渲染，route props也会随着一起被渲染 |
| render    | Function                 | 内联渲染和包装组件，要求要返回目标组件的调用                 |

**Link**

| 属性    | 类型                             | 作用               |
| ------- | -------------------------------- | ------------------ |
| to      | string \| {pathname,search,hash} | 要跳转的路径或地址 |
| replace | boolean                          | 是否替换历史记录   |

**NavLink**

| 属性            | 类型          | 作用                                          |
| --------------- | ------------- | --------------------------------------------- |
| to              | string object | 要跳转的路径或地址                            |
| replace         | boolean       | 是否替换历史记录                              |
| activeClassName | string        | 当元素被选中时，设置选中样式，默认值为 active |
| activeStyle     | object        | 当元素被选中时，设置选中样式                  |
| exact           | boolean       | 严格匹配                                      |

**Switch**

该组件用来渲染匹配地址的第一个Route或者Redirect，仅渲染一个路由，排他性路由,默认全匹配(场景：侧边栏和面包屑，引导选项卡等

| 属性     | 类型          | 作用 |
| -------- | ------------- | ---- |
| location | string object |      |
| children | node          |      |

**Redirect**

该组件用来渲染匹配地址的第一个Route或者Redirect，仅渲染一个路由，排他性路由,默认全匹配(场景：侧边栏和面包屑，引导选项卡等

| 属性      | 类型          | 作用         |
| --------- | ------------- | ------------ |
| from      | string        | 来自         |
| to        | string object | 去向         |
| push      | boolean       | 添加历史记录 |
| exact     | boolean       | 严格匹配     |
| sensitive | boolean       | 区分大小写   |

**404**

```jsx
<Route component={Error}/> 总是会匹配
```

**参数数据传递**

```jsx
let {history,location,match}=props
<Link to={match.url+'/001'}/>
<Link to={`${match.url}/002?a=1&b=2`}/>
<Link to={{pathname:match.url+'/003',search:'?a=11&b=12',hash:'#a1'}}

<Route path={match.path+'/:aid'} component={Detail}
```

> url - (浏览器 URL 中的实际路径) URL 匹配的部分。 用于构建嵌套的 <Link>
> 		path - (路由编写的路径) 用于匹配路径模式。用于构建嵌套的 <Route>

**接收**

```jsx
//接参数:
{match.params.aid}
//接数据
{location.search}
//接地址:
{location.pathname}
```

> 无法从v4+ 中获取 URL 的查询字符串了。因为没有关于如何处理复杂查询字符串的标准。所以，作者让开发者去选择如何处理查询字符串。推荐qs库|query-string

**编程式跳转**

```jsx
history.push('/user?a=1&b=2')
history.push({pathname:'/user',search:'?a=11&b=22'})
history.replace({pathname:'/user',search:'?a=111&b=222'})
history.go(-1)
```

**非路由跳转组件**

不是所有组件会通过路由跳转，也需要抓取路由上下文时，解决方案

1. 通过路由跳转
2. 通过属性传递
3. 通过withRouter包装

```jsx
import {withRouter} from 'react-router-dom'
class 组件 extends Component{}
export default withRouter(组件)
```



**前置授权路由**

需要自定义路由，具体为，自定义一个组件，代替Route，其内部根据条件返回一个Route 组件指向目标组件，或者Route的render函数内部判断加载目标，最后组件树关系为：switch>自定义组件>Route>目标组件

```jsx
<Auth path="/goods" component={Goods} />
<Auth path="/user" component={User} />

export default class Auth extends React.Component{

  state={
    hasSendAuth:false,
    auth:false,
    data:{}
  };

  async componentDidMount(){
    let res = await axios({url:'/data/user.json'})
    console.log('数据回来了')
    this.setState({
      auth:res.data.auth,
      hasSendAuth:true,
      data:res.data.data
    })
  }

  render(){
    // console.log('渲染了',this.props)  //包含了path,component的一个传入
    let {component:Component} = this.props;//目标组件
    if (!this.state.hasSendAuth) return null;

    return <Route render={props=>(//...props 目标组件需要用到的路由信息
      this.state.auth ?
        <Component {...props} data={this.state.data} /> :// 数据预载
        <Redirect to="/login" />
    )}/>

  }
}
```

**后置守卫**

```jsx
// reg.jsx
import { Prompt } from 'react-router-dom'
<Prompt
  when={this.state.isBlocking}
  message={location=>...}
/>
```

> message: 后面可以跟简单的提示语，也可以跟函数，函数是有默认参数的。
> 		when: when的属性值为true时防止跳转；





## 项目

### 技术栈选型

**前端**

create-react-app 

react-router-dom

axios 

redux/react-redux/react-think

mockjs/json-server

**后端**

nodejs

express

mongodb

bcrypt

jsonwebtoken

multer

### **环境规划**

```js
|-config	 CRA配置
|-scirpts  CRA配置
|-pubilc
  |- data
    |- 静态数据
  |-index.html 浏览器入口
|-node_modules
|-mock 数据模拟
  |-db.js
  |-server.js
|-src
  |-library 公司内部库
    |-jquery.js
    |-swiper.js
  |-utils 工具包
    |-date.js / fillzero.js/...
  |-layouts 布局
    |- App/Header/Footer
  |-components 应用内部基础通用组件、木偶组件
    |- swiper、input、loading
    |- cell、uc-nav
    |- button
  |-pages  智能组件 页面
    |- Home / Follow / Column / User
    |- Detail / Login / Reg / Error
	|-guard
			守卫组件
  |- assets
    |- img
    |- css、sass
    |- font
  |- store
    |- state/reducer/asyncAction
	|- plugins
		|- axios / ....
  Index.js
```

### 组件开发

**准备工作**

移动端(设置视口,设置字体比例，基础样式normal，base)

**资源引入**

- index.html引入  不优化
- index.js  引入 优化
- 组件 引入 优化

**资源指向**

相对路径 以src为根静态资源，绝对路径 以public为根动态资源， jsx前景图片默认都指向public， jsx里面行间样式链接图片资源指向了pubic，

**布局方案**

- 切图，需要设计稿，用户端开发时用到
- UI库，管理端开发时用到，常用的UI库(elementUI/ant.design)
- 模板移植，老项目重构时用到

### 数据交互

**客户端代理**

```js
module.exports = function(app) {

  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }));

  app.use('/api2', createProxyMiddleware({
    target: 'http://vareyoung.top',
    changeOrigin: true,
    pathRewrite: { //路径替换
      '^/api2': '/api', // axios 访问/api2 == target + /api
    }
  }));

};
```

**拦截器axios**

```js
import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router} from 'react-router-dom'
import {baseLocalUrl} from '../server'
import qs from 'qs'

// 添加一个请求的拦截
axios.interceptors.request.use((config) => {
  //1抓取本地token，携带在请求头里
  let user = window.localStorage.getItem('user');
  user = user ? qs.parse(user) : '';
  config.headers={'token': user.token}

  //显示loading...

  return config;//2返回请求

}, function(error) {
  // 请求错误时做点事
  return Promise.reject(error);
});

//添加一个响应拦截
axios.interceptors.response.use(function(response) {
  console.log('响应拦截',response);
  
  let router=new Router();
  //token过期: 返回值2,当前路由不是login时跳转 
  if (response.data.err === 2 && !router.history.location.pathname.includes('/login')) {
    console.log('token 失败 跳转到login',router);
    window.location.href=baseLocalUrl+'/login?path='+router.history.location.pathname

    /*router.history.push({  //hash 模式可以，history模式有问题
      pathname: '/login',
      search: "path="+router.history.location.pathname
    })*/

  }
  return response;

}, function(error) {

  return Promise.reject(error);
});

React.axios = axios;//axios绑到对象包上
React.Component.prototype.axios = axios; // axios绑定到Component类的原型   组件|this.axios
window.axios = axios;  //×   希望全局使用axios , 使用webpack 来配置
export default axios;

```

**拦截器umi-request**

```js
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import request,{ extend } from 'umi-request';
import qs from 'qs'

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  
  //1抓取本地token，携带在请求头里
  let user = window.localStorage.getItem('user');
  user = user ? qs.parse(user) : '';
  options.headers={'token': user.token}
  
  return (
    {
      url,
      options
    }
  );
});

// 提前对响应做异常处理
request.interceptors.response.use(async (response) => {
  
  const codeMaps = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  
  console.log(codeMaps[response.status]);
  
	const data = await response.clone().json();//克隆响应对象做解析处理
  
  let router=new Router();
  //token过期: 返回值2,当前路由不是login时跳转 
  if (data.err === 2 && !router.history.location.pathname.includes('/login')) {
    console.log('token 失败 跳转到login',router);
    window.location.href=baseLocalUrl+'/login?path='+router.history.location.pathname

    /*router.history.push({  //hash 模式可以，history模式有问题
      pathname: '/login',
      search: "path="+router.history.location.pathname
    })*/
  }
  
  return response;
});


React.request = request;//request绑到对象包上
React.Component.prototype.request = request; // request绑定到Component类的原型   组件|this.request
window.request = request;  //×   希望全局使用request , 使用webpack 来配置
export default request;
```



**登录**

```jsx
//更新同步localStrage
window.localStorage.setItem('user',qs.stingify(...))
//跳转到之前
history.push({
  pathname:qs.parse(
    this.props.location.search,{ 
    ignoreQueryPrefix:true
  }).path
})
```

**列表、详情**

home-> cell/swiper    -> detail 拿到id dataName

`<jsx dangerouslySetInnerHTML={{__html:HTML字符的数据}}></jsx>`危险数据的信任和转换

**全局方法过滤**

```jsx
|-common|utils
  date.js
  fillzero.js
  ...
  index.js
    import date/fillzero ..
    export {
      date,fillzero
    }
```

**公共数据**

```jsx
//路由检测: pathname的变化

static getDerivedStateFromProps(nextProps,nextState){

  let path = nextProps.location.pathname;

  if (/home|follow|column/.test(path)){
    return {bNav:true,bFoot:true}
  }
  if (/detail|login|reg/.test(path)){
    return {bNav:false,bFoot:false}
  }
  if (/user/.test(path)){
    return {bNav:false,bFoot:true}
  }

  return null;

}

//loading数据 
//订阅发布库
//订阅发布库： App订阅,  组件求数据时发布 | 拦截器发布
```

### pubsub-js

**安装**

```js
 yarn add pubsub-js -S
```

**订阅**

```js
token = PubSub.subscribe('事件名称', 函数(msg,data));
//msg == 事件名称
//data == 传入的数据
```

发布

```js
PubSub.publish('事件名称', '数据')
```

**取消订阅**

```jsx
PubSub.unsubscribe(token);  //取消指定订阅
PubSub.clearAllSubscriptions(); //取消所有订阅 不推荐使用
```

> 先订阅，再发布





## 部署

react的项目打包(dist)，拷贝到空node项目环境（public)下，利用node做后端代理，访问json-server服务器的数据（mock），再一同拷贝到购买的云服务器上，阿里云的服务器类型选择centos

| 前端                          | 代理端       | 服务端                |
| ----------------------------- | ------------ | --------------------- |
| react                         | node         | json-server + mock    |
| 在node目录的public/template下 | 提供静态请求 | 提供api和库的动态请求 |

### **node做代理**

方案1

```js
// node项目环境 下安装 http-proxy-middleware 中间件
npm i http-proxy-middleware --save

// app.js
const { createProxyMiddleware } = require('http-proxy-middleware');

//因为 bodyParser 导致的代理转发带有 body 数据的 post 请求会失败，代理中加上把解析后的 body 数据再转回来即可
var restream = function(proxyReq, req) {
  if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type','application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
  }
}

//响应mock请求，交由中间件转发
app.use('/mock', createProxyMiddleware({
  target: 'http://localhost:3333',
  changeOrigin: true,
  secure: false,
  onProxyReq: restream
}));
```

方案2

```js
// node项目环境 下安装 express-http-proxy 中间件
npm i express-http-proxy --save

// app.js
const proxy = require('express-http-proxy');

//配置
let opts = {
  preserveHostHdr: true,
  reqAsBuffer: true,
  //转发之前触发该方法
  proxyReqPathResolver: function(req, res) {
      //这个代理会把匹配到的url（下面的 ‘/api’等）去掉，转发过去直接404，这里手动加回来，
      req.url = req.baseUrl+req.url;
      return require('url').parse(req.url).path;
  },
}

//响应mock请求，交由中间件转发
app.use('/mock',proxy('http://localhost:3333',opts));
```

> json-server服务器：三目有问题，压缩分号  ***
>

### 阿里云部署

#### 简洁型部署

**买服务器(机器)**

- 选择**云服务器ECS、centos系统**，[学生特惠地址](https://promotion.aliyun.com/ntms/act/campus2018.html?spm=5176.230344.1224685.2.3b84443e9LLgUu) 

- 支付宝-》注册-》实名认证填写身份证的信息-》ecs

- 重设密码初始化磁盘：ecs服务器->控制台

**使用finalShell连接服务器**

- [安装](http://js.downcc.com//down2/finalshell_downcc.com.zip) finalShell

- 启动 finalShell-》新建会话-》SSH链接->主机：公网IP-》端口 ： 22-》用户名：root-》密码: **登录密码**

**給服务器安装环境**

```js
//安装node 在 finalShell里面

curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
yum install -y nodejs
检测: node -v
```

**上传代码**

- react 打包:			``yarn build``  -> build目录

- 创建空的node环境:		``express -e .``

- build里面的文件  copy -> node 的 public下面

- 把node项目 -》 拖拽到 finalSheel/usr/local/创建目录/

- ```js
  //让阿里云支持node里面的3000端口
  找到控制台->安全组-》配置规则-》添加规则-》端口范围（3000/3000）,授权对象(0.0.0.0/0)
  ```

- ```js
  finalShell 里面-> cd /usr/local/你的目录 -> npm start
  ```

  > 测试: 浏览器输入： http://公网IP:3000

#### 高要求部署

**买服务器(机器)**

- [成人特惠地址](https://promotion.aliyun.com/ntms/act/qwbk.html?spm=5176.8112568.420890.1.67ae9ed5edEDHe)，认准云服务器ECS/centos系统

- 支付宝-》注册-》实名认证填写身份证的信息-》ecs

- 手动停止服务器 ----> 初始化磁盘 ---> 重设密码（登录密码）

**使用finalShell连接服务器**

- [安装](http://js.downcc.com//down2/finalshell_downcc.com.zip) finalShell

- 启动 finalShell-》新建会话-》主机：公网IP-》端口 ： 22-》用户名：root-》密码: **登录密码**

**給服务器安装环境**

```js
curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs
检测: node -v
```

**上传代码**

- react 打包:			``npm run build``  -> build
- 本地测试生产环境（css有时打包后有出错)

```js
npm i serve -g
serve -s dist -l 8080
问题 ： 生产环境下 不能访问 3001
原因  : 生产环境下客户端代理是无效的,部署后的代码需要在服务端做代理
解决: 服务器端 安装ngnix  来完成代理
```

- 拷贝 build ->  node的public下面   + 本地测试(启动node服务)
- 整合好的node 拖到 finalShell 下面(不拽node_modules)

```js
npm i 
npm start
```

**給服务器安装json-server服务**

```js
//1 copy react下面的mock 到服务器其他目录
|-app.js
|-db.js
|-public
//2 安装依赖
npm init
npm i
//3 开一个3333安全组(防火墙)
```

#### 问题汇总

**关闭finalShell ,服务断了**

```js
//安装pm2, nodejs服务器管理器
npm i pm2 -g

//启动服务器:
pm2 start 启动文件.js 

//浏览器访问项目即可
http://公网IP:node端口

//如果想停掉服务器: 
pm2 stop all

```

> [pm2使用](https://blog.csdn.net/chengxuyuanyonghu/article/details/74910875)

**可以有多个app？使用一个实例？**

分析：app指向不同端口就好了
		解决：app指向不同端口，安全组里添加多个端口，pm2 进入到对应服务器位置，逐个启动，如果端口重复，先启用的应用会占用端口

**不想要端口可以？**

分析：使用http协议默认的80端口,使用https协议默认端口443
		解决： 修改本地的端口号指向80,安全组添加80   

**不使用ip，使用网址?**

分析： 是一个IP和域名关联的过程

解决： 必须得用于一个已经备过案的域名(未备案不可使用一级域名和省略端口)，[域名购买地址](https://promotion.aliyun.com/ntms/act/domainbrand.html?spm=5176.8112568.483655.2.67ae9ed5edEDHe)

备案: 	特惠专区-》域名与网站->域名新手多重礼（实名，备案15工作日）

域名解析：域名-》解析-》添加记录->记录值(ip)

```js
www：解析后的域名为www.aliyun.com。
@：直接解析主域名 aliyun.com。
二级域名：如：abc.aliyun.com，填写abc。
```

**不备案有什么影响**

小程序上线时不能部署,但不影响学习
		没有域名不便于宣传，解决：做成二维码
		无法使用https安全协议访问

**启用https访问**

流程：SSL证书->获取https免费证书->配置(node服务器使用https模块响应)

[获取https免费证书](https://yq.aliyun.com/articles/221596?spm=5176.10695662.1996646101.searchclickresult.1dec5d98Oy3WNE)

下载： 证书通过后->下载 other类型的 xx.key/xx.pem 下载到-> bin/www

配置node：

```js
var https = require('https');
const fs = require('fs');
const port=443;		
app.set('port', port);

const options = {
  key: fs.readFileSync('./bin/1826016_uncle9.top.key'),//指向key
  cert: fs.readFileSync('./bin/1826016_uncle9.top.pem'),
}; 
var server = https.createServer(options,app);//查看nodejs.cn>https模块|或已完成的node项目
```

安全组规则：添加443 ，443是https的默认端口

**在阿里云配置apache+mysql+php**

[参考资料](https://blog.csdn.net/chwshuang/article/details/52443274)

**历史记录模式路由，强刷找不到**

现象：客户端路由服务找/todos/42时，服务器会找/todos/42的接口（没有这个子服务接口)
		解决：服务器路由优先，找不到时，返回vue的前端index.html，交还给客户端路由

```js
// node项目 app.js

app.use(function(err, req, res, next) {
	...
  
  if(req.url.includes('/api')){//webApi接口错误
    res.send({
      err:1,
      msg:'不存在的接口名'
    })
  }else if(req.url.includes('/admin')){//服务端Api接口错误
    res.render('error');
  }else{//交还给客户端判断
    res.sendFile(path.join(__dirname, 'public','template', 'index.html'));
  }

});
```

> 也可以通过中间件  connect-history-api-fallback 实现

## 无状态组件

是个函数，不能访问this对象，也就不存在state、实例方法、钩子、也不需要，只能访问props，无需实例化，渲染性能高，适用场景：展示，纯渲染的地方，别名：UI组件，哑组件，函数式组件，无状态组件，木偶组件

```jsx
const 组件名=(props)=>(jsx)
const 组件名=props=>jsx
const 组件名=(props)=>{
  let xx=props.xx
  return jsx
}
```



## 组件通讯

### **父子**

```jsx
//单项数据流
<Child 属性=数据/>
this.props.属性
```

### **子父**

```jsx
//反向数据流
<Child 属性=父方法/>
this.props.属性(子数据)
```

### **中间人**

```jsx
<ChildA 属性=父方法/>
<ChildB 属性=接受的a数据/>
```

> 所有 React 组件都必须是纯函数，并禁止修改其自身 props
>
> 纯函数不会试图改变它们的输入，并且对于同样的输入,始终可以得到相同的结果,React
> 		组件都必须是纯函数，并禁止修改其自身 props

### **转发 refs**

Forwarding refs，将 ref 通过组件传递给其子节点的技术。它对于可复用组件库和高阶组件（HOC）等情况非常有用

```jsx
this.inputRef = React.createRef()//构造器
<子组件 ref={(e)=>this.inputRef=e} />
<子组件 ref={this.inputRef} />
  
//子组件是个函数时
const 子组件 = React.forwardRef((props, ref) => (
  ...
  <input type="text"  ref={ref}/>)
  ...                       
);
```

### **context组件上下文**

Context 旨在共享一个组件树内可被视为 “全局” 的数据，达到越级传递，场景：当前经过身份验证的用户，主题或首选语言，包括管理当前的 locale，theme，或者一些缓存数据

**老api**

```jsx
//顶层组件 类属性 组件属性 定义子上下文类型
static childContextTypes={
  msg: propTypes.string,
  setMsg : propTypes.func
};

getChildContext(){//返回上下文对象
  return {
    msg:this.state.msg,
    setMsg:this.setMsg
  }
}

//下层组件 类属性 组件属性 接受上下文
static contextTypes = {
  msg: propTypes.string,
  setMsg: propTypes.func
};

//使用
this.context.msg | this.context.setMsg(数据)
```

**新api**

```jsx
//Context
import {createContext} from 'react'
const Context = createContext(默认值);//默认值可以不给
export default Context

//祖先组件  Context.Provider包裹组件并且传递属性值
import Context from './Context';
class 祖先组件 extends Component {
  
  state = {
    count: 60
  };

  render() {
    const { count } = this.state;
    return (
      <Context.Provider value={count}>
        ...
        <中间件层组件 />
        ...
      </Context.Provider>
    );
  }
}

//后代组件 Context.Consumer来接收值,Consumer里面不能直接渲染其他组件，而是要声明一个函数。函数的参数就是context的值

import Context from './Context';
export default class Leaf extends Component {
  render() {
    return (
      <Context.Consumer>
        {
          value => {
            return (
              <div className="leaf">
                {value}
              </div>
            )
          }
        }
      </Context.Consumer>
    )
  }
}



//封装Context.Provider

import React,{Component} from "react";

import Context from './Context'
export default class Provider extends Component {
  state={
    count:10
    ...
  };

  increment=(val=1,ev)=>this.setState({count:this.state.count+val})
  decrement=(val=1,ev)=>this.setState({count:this.state.count-val})
	...
  
  render(){
    return (
      <Context.Provider value={
        {
          count: this.state.count,
          increment: this.increment,
          decrement: this.decrement
        }
      }>
        {this.props.children}
      </Context.Provider>
    )
  }
}

//使用封装
<Provider>
	<App/>
</Provider>
```



### 订阅发布

pub/sub模式、 消息通知、观察者模式、`yarn add pubsub-js -D`

- 订阅:	token=pubsub.subscribe('消息名',回调函数('消息名',数据))
- 发布：  pubsub.publish('消息名',数据)
- 清除指定订阅：pubsub.unsubscribe(token|'消息名'|回调函数名);
- 清除所有：pubsub.unsubscribeAll()

### **路由**

```jsx
let {history,location,match}=props
import {widthRoute}='react-router-dom'
```

### web存储

localStrage、cookie

### 状态管理

后面学习



## 高阶组件 HOC

又叫Higher-Order Components，是一个函数能够接受一个组件并返回一个新的组件。组件是将props转化成UI，然而高阶组件将一个组价转化成另外一个组件，例如Redux的connect

就是一个函数接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件，withUser函数就是一个高阶组件，它返回了一个新的组件，这个组件具有了它提供的获取用户信息的功能。

```jsx
const withRouter = WrappedComponent => {
  ....  抓取到history,location,match
  return props => <WrappedComponent history={history} {...props} />;
  //return 要求是个类或者函数
};

const Swiper = props => (
  <div class="user-container">
    <p>My name is {props.history}!</p>
  </div>
);
export default withRouter(Swiper);
```

## 渲染属性（Render Props）

**render prop 是一个用于告知组件需要渲染什么内容的函数**,

```jsx
class Mouse extends React.Component{

  mouseOver = () => {console.log('over')};
  mouseOut = () => {console.log('out')};

  render(){
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.render()}
      </div>
    )
  }
}

//
<Mouse render={()=>{
    return (
      <>
        <h3>标题</h3>
        <p>段落</p>
        <p>段落</p>
        <p>段落</p>
      </>
    )
  }}/>
```



## 状态管理

- 思想：flux
- 实现：vuex  redux

### redux

可以同一个地方查询状态，改变状态，传播状态，用在中大项目,组件状态需要共享，在任何地方都可以拿到，组件需要改变全局状态，一个组件需要改变另外一个组件的状态，创建store实例，其他组件导入并共享这个store实例

**redux成员**

| 成员            | 作用                      | 类型 |
| --------------- | ------------------------- | ---- |
| createStore     | 创建store实例             | 函数 |
| combineReducers | 合并多个reducer           | 函数 |
| applyMiddleware | 安装中间件，改装增强redux | 函数 |

**store成员**

| 成员           | 作用                                           | 类型 |
| -------------- | ---------------------------------------------- | ---- |
| subscribe      | 订阅state变化                                  | 函数 |
| dispatch       | 发送action 给 reducer                          | 函数 |
| getState       | 获取一次state的值                              | 函数 |
| replaceReducer | 一般在 Webpack Code-Splitting 按需加载的时候用 | 函数 |

**数据流动**

| component（views）  | action              | reducer                                    | state    | component（views） |
| ------------------- | ------------------- | ------------------------------------------ | -------- | ------------------ |
| 展示state           | 转发的动作,异步业务 | 同步业务处理逻辑, 修改state，并且返回state | 状态收集 |                    |
| store.dispatch---》 | -------------》     |                                            |          | 《--subscribe      |
|                     |                     |                                            |          | 《--getState       |

**操作流程**

```jsx
import {createStore} from 'redux'

//生成默认state 
let defaultState={}

//创建reducer
const reducer = (state=defaultState,action)=>{
  let {type,payload}=action    
  swtich type
    case XXXXX
    更新copy后的state  Object.assign(空,老,新)
  default:
    return state
}

//创建store对象
store = createStore(reducer,state)
export default store;

//组件内部更新，状态获取state
import store from '...'
store.dispatch({type:xxx,payload:ooo}) //发送action给reducer  type是必传参数
store.subscribe(回调)  //订阅 state  更新state时触发
store.getState() //获取状态，执行一次
```

提取并定义 **Action Creators**

```jsx
let nextTodoId = 0;

export const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text
});

export const removeTodo = id => ({
  type: "REMOVE_TODO",
  id
});

export const checkNav = bl => ({
  type: "CHECK_NAV",
  bl
});

//处理异步
const updateHome = (collectionName) => dispatch => { //dispatch接受函数 需要thunk中间件
  return axios.get({api:collectionName}).then(
    res=> {
      dispatch({type:'UPDATE_HOME',payload:res.data.data});
      return res//有回执
    }
  )
};

//安装中间件改装 redux
import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
let store = createStore(rootReducer,rootState,applyMiddleware(thunk));

//组件内部
dispatch(checkNav(!bNav))
dispatch(addTodo('呵呵哒'))
```

**combineReducers**提取reducer

当应用逻辑逐渐复杂的时候，我们就要考虑将巨大的 Reducer 函数拆分成一个个独立的单元，这在算法中被称为 ”分而治之“，Reducers 在 Redux 中实际上是用来处理 Store 中存储的 State 中的某个部分，一个 Reducer 和 State 对象树中的某个属性一一对应，一个 Reducer 负责处理 State 中对应的那个属性

```jsx
// src/plugins/redux
import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import todos from '../store/reducers/todos'
import bNav from '../store/reducers/nav'
let rootReducer=combineReducers({bNav,todos});
let store = createStore(rootReducer,applyMiddleware(thunk));
export default store;

// src/store/reducers/todos
let initState=[]

const todos = (todos=initState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return [
        ...todos,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    }

    case "REMOVE_TODO": {
      const { id } = action;
      todos.map((item,index) => item.id ===id && todos.splice(index, 1));
      return [...todos]
    }

    case "CHECK_TODO": {
      const { id } = action;
      todos.map((item,index) => item.id ===id && (todos[index].completed=!todos[index].completed));
      return [...todos]
    }

    default:
      return todos;
  }
};

export default todos;

// src/store/reducers/bNav
const bNav = (bNav=false, action) => {
  switch (action.type) {
    case "CHECK_NAV": {
      const { bl } = action;
      return bl
    }

    default:
      return bNav;
  }
};

export default bNav;
```

> state数据不写在构造器内订阅，可以写在主入口文件 订阅reactdom的更新

```jsx
let render = ()=>{
    ReactDOM.render(
      <App/>,
      document.getElementById('root')
    )
};
render();
store.subscribe(render);
```

### react-redux

基于redux思想,专门为react使用redux而生，把组件拆分为容器组件, UI组件,所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它

#### UI组件

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供
- 不使用任何 Redux 的 API

#### 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

#### 最佳实现

```jsx
//主入口
import {Provider} from react-redux
import store from './plugins/redux'
<Provider store={redux打造的store}>
  <容器组件/>
</Provider>
  
  
        
//Creators改装  把异步actins内部有关，api请求的通用部分封装出来的一个过程

//api
const get = ({api,_page=1,_limit=10,id=null}) => (
  axios({
    url: id ? `/mock/${api}/${id}` : `/mock/${api}`,
    params: {_page,_limit}
  })
);

//actionsCreators
const clearHome={type: 'CLEAR_HOME'};//dispatch接受对象 默认

const updateHome = () => dispatch => { //dispatch接受函数 需要thunk中间件
  return get({api:'home'}).then(
    res=> {
      dispatch({type:'UPDATE_HOME',payload:res.data.data});
      return res//有回执
    }
  )
};

const updateBANNER=()=>async dispatch => {
  let res = await get({api:'banner'});
  dispatch({type:'UPDATE_BANNER',payload:res.data.data})
};

export {clearHome,updateHome,updateBANNER}


//UI组件 
const Home = ({home, banner,dispatch}) => {
  useEffect(() => {
    dispatch(clearHome);
    dispatch(updateHome()).then(data => 收取回执)
    dispatch(updateBANNER())
  }, []);
  
  return (
    <div className="Home">

      <Swiper data={banner}/>
      {
        home.map(item => (
          <Cell key={item.id} item={item} dataName="home"/>
        ))
      }

    </div>
  )
};

//容器组件 dispatch方法 默认传递给UI组件
export default connect(
  state=>({banner:state.banner, home:state.home})
)(Home)
```

**redux-devtools使用**

```jsx
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
//compose 增强器

import thunk from 'redux-thunk'

let rootReducer = combineReducers({banner, column, detail, follow, home, user});

//使用redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));//安装了中间件，改装了redux

export default store;
```



**token加入redux 做持久化处理**

思路1：登录种cookie同步redux，axios拦截器只读redux，为了速度，index主入口读取cookie同步redux为了强刷做好准备，**跳转有axios完成**， 问题是组件会渲染，再去跳转

思路2：全局守卫，redux里面准备一条数据，axios和其他组件都去修改他 , BaseLayout界面根据这条数据**响应式渲染**, 其他组件或者拦截器，无需跳转

```jsx
//BaseLayout.jsx
export const connect(user=> state.user)(function Auth({user:{err}, ...rest}){
    if (err==1) { return <Login {...rest} /> }
    if (err==3) { return <Reg /> }
    return <default {...rest}/>
})
```

思想3： 前置路由守卫(部分路由独享)，axios和其他组件负责跳转



## 片段

为一个组件返回多个元素。 可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点

```jsx
<React.Fragment key="bmw"></..>
<></>
```





## 异步组件

把静态导入的组件，变成一个可以返回promise的函数，函数内部在路由跳转时，去异步加载目标组件，关键字import()，create-react-app 环境 webpack自动分片打包

```jsx
//import 语法
import ("./ChildB.js").then(
  ChildB=>console.log(ChildB)
)

//方式1
const Child = asyncComponent(()=>import("./Child"))

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

//方式2
import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;
const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
  loading:()=>{return null}
});
```

## PureComponent

- 使用PureCompoent是因为它是一个更具性能的Component的版本
- 性能的提高还伴随着一些附加的条件
- 提供了具有浅比较的shouldComponentUpdate方法
- 当props或者state改变时，PureComponent将对props和state进行浅比较
- Component的shouldComponentUpdate构造被调用默认重渲，PureCompoent不一定
- 不能再重写shouldComponentUpdate
- 不渲染的情况: 父组件中改变对象,子组件比较的是引用是否相同，
- 不要在`render`方法中创建一个新的函数，对象或者是数组
- 场景：组件收到的props和定义的state是基本类型时***

## 单页滚动条

路由切换，每次切换到页面顶部 

```jsx
static getDerivedStateFromProps(nextProps){//props改变时
  if(this.props.location !== nextProps.location){//当前地址不等于目标地址
    window.scrollTo(0,0);//滚动到顶部
  }
}
```

页面切换出去再切换回来后怎样保持之前的滚动位置

```jsx
//sTop =  模块内部变量 | 类属性
componentDidMount(){
  window.scrollTo(0,sTop)
}
componentWillUnmount(){
  sTop = document.documentElement.scrollTop
}			
```



## UI库

###  [**Ant Design**](https://ant.design/docs/react/introduce-cn)

`antd` 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

 **特性**

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 全链路开发和设计工具体系。
- 🌍 数十个国际化语言支持。
- 🎨 深入每个细节的主题定制能力。

**安装**

```jsx
yarn add antd --save
```

**按需引入**

```jsx
yarn add babel-plugin-import --save

webpack loader配置,找到babel-loader  按需引入配置
+ options 项目
"plugins": [
  ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }], 
  // `style: true` 会加载 less 文件 pc

]
```

**使用组件**

```jsx
import {LocaleProvider, DatePicker,Button } from 'antd';
```

**修改文案**

```jsx
// 方案1  V3
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

//组件需要被 包裹
<LocaleProvider locale={zhCN}>
  <App/>
</LocaleProvider>

//方案2  V4
import zhCN from 'antd/es/locale/zh_CN';

return (
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
```

栗子***

### [antd-mobile](https://mobile.ant.design/index-cn)

**安装**

```jsx
yarn add antd-mobile --save
```

**按需引入**

```jsx
yarn add babel-plugin-import --save 

//webpack loader配置,找到babel-loader  按需引入配置
// + options 项目
"plugins": [
    ["import", { libraryName: "antd-mobile", style: "css" }] 
  // `style: true` 会加载 less 文件 touch  pc端配置和touch端配置不可并存
]
```

**使用组件**

```jsx
import { DatePickerView } from 'antd-mobile'; //直接使用组件 文案是中文
//import 'antd-mobile/lib/DatePickerView/style/css';  手动 
```

**栗子**

```jsx
//Tabbar组件
//TabBar>TabBar.Item + 数据(title,key,path,icon,selectedIcon)

//路由: 
history.push(this.state.tabs[index].path)

//监听: 
static getDerivedStateFromProps(nextProps,nextState)  {} 
location.pathname.indexOf(item.path)
setState->selectedTab:item.key

//home
Flex 组件
  Flex>Flex.Item  style={{flex:0.6}} 约定比例
  WhiteSpace 上下留白
Carousel 走马灯
  Link>img
Grid 宫格
Tabs 标签页

//category
分段器手写 + Route

//follow/column
PullToRefresh 拉动刷新
				List 列表
					List.Item  history.push(编程式跳转)
						List.Item.Brief
//detail
NavBar导航 
    箭头样式 写入base.css 覆盖默认，同类共用
    WingBlank 两侧留白
    Flex>Flex.Item

//shopcart
SwipeAction 滑动操作
	List>SwipeAction>List.Item>Stepper步进器

//user
卡片 card
  Card>Card.Header|Body>Badge 徽标
  Card>Card.Header|Body>Grid 宫格
NoticeBar 通告栏

//登录|注册
InputItem 文本输入
Button 按钮
行间样式修改 覆盖样式
```



## mobx

一款可以与redux媲美的数据流方案，Flux思想单向数据流方案，以 Redux 为代表，Reactive响应式数据流方案，以 [Mobx](https://cn.mobx.js.org/) 为代表

- 单向数据流实现：redux + react-redux + react-thunk

- 响应式数据流实现：mobx + mobx-react

MobX 的理念是通过观察者模式对数据做出追踪处理，在对可观察属性作出变更或者引用的时候，触发其依赖的监听函数，整体的store注入机制采用react提供的context来进行传递

适用场景可以是react vue angular mpvue 小程序 taro



### **装饰器**Decorator

是个函数,用来装饰类或者类成员 ，是Object.defineProperty的语法糖

```jsx
//给对象添加或修改属性
Object.defineProperty(target, prop, desc)
//target 需要定义属性的当前对象
//prop 当前需要定义的属性名 类型：字符
```

| desc         | 默认值    | 说明                                                      |
| ------------ | --------- | --------------------------------------------------------- |
| configurable | false     | 描述属性是否可以被删除，默认为 false                      |
| enumerable   | false     | 描述属性是否可以被for...in或Object.keys枚举，默认为 false |
| writable     | false     | 描述属性是否可以修改，默认为 false                        |
| get          | undefined | 当访问属性时触发该方法，默认为undefined                   |
| set          | undefined | 当属性被修改时触发该方法，默认为undefined                 |
| value        | undefined | 属性值，默认为undefined                                   |

```jsx
//定义装饰器
function 装饰器名 (target,prop,descriptor){
  descriptor.writable=false;//writable属性是否可以写入
  return descriptor;
}

//使用定时器
@装饰器名 类
@装饰器名 类的实例属性|静态属性
@装饰器名 类的实例方法|静态方法

//使用场景
mobx / angluarTs / vueTs / reactTs / java ...
```

**配置**

cra脚手架 不支持装饰器语法，需要小配一下

```jsx
yarn add @babel/plugin-proposal-decorators --save
```

package.json

```json
babel: {
  "presets":...

  +
  "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
   ]

  ....
}
```

**vscode**编辑配置

```jsx
vscode->设置->搜索设置输入：experimentalDecorators->勾上
//webstrom 无需设置
```

### mobx成员

`observable` `action` 装饰类和其成员

@observable 装饰store类的成员，为被观察者
		@action 实例方法, 处理实例属性，修改状态，不推荐组件内部改

###  mobx-react成员

`inject` `observer` `Provider`

Provider，顶层提供store的服务

```jsx
<Provider store={store}></Provider>
```

inject，注入Provider提供的store到该组件的props中，组件内部使用,inject 是一个高阶组件 高阶组件返回的是组件，作用在包装组件

```jsx
export default inject('store')(react函数式组件)
```

@inject 是装饰器，装饰的是类本身和类成员

```jsx
@inject('store') class 类组件
```

observer，设置当前组件为观察者,一旦检测到store中被监测者发生变化就会进行视图的强制刷新

```jsx
@observer class 类组件
  
const 组件=observer((store)=>{jsx})
```

### 构建

程序主入口

```jsx
import {Provider} from 'mobx-react'
import store from './store';
<Provider store={store}>所有</.>
```

store

```jsx
// src/store/index
import User from './user'
...

class Store {

  constructor(){
    this.user = new User(this);//传递this防止this丢失
   	.... 可以把组件的数据交给一个一个类来处理，有的模块管理的感觉
  }

}
export default new Store();


// src/store/user
import { observable, action } from 'mobx'
import axios from "axios";

class User {
	
  //被观测者
  @observable user= window.localStorage.getItem('1909_newsapp') ?
    JSON.parse(window.localStorage.getItem('1909_newsapp')) :
    {
      err:1,
      msg:'未登录',
      data:{}
    };

  constructor(store){
    this.store=store;
  }
	
	//处理被观测者数据
  @action check = async ({api,method='get',username,password}) => {
    return axios({
      url:`/api/${api}`,
      method,
      params: method === 'get' ? {username, password}: null,
      data: method === 'post' ? {username, password}: null,
    }).then(
      res=>{
        this.user = res.data;
        window.localStorage.setItem('xxx',JSON.stringify(res.data));
        return res
      }
    )
  };
}

export default User;

//组件注入 被做一个观察者
import {inject, observer} from "mobx-react";

@inject('store')
@observer
export default class Home extends React.Component{
  constructor(props){
    super(props);
    props.store.goods.update({
      ...
    })
  }

  render(){
    let {goods:{home,banner}}=this.props.store;
    return(
      ...
    )
  }
}
  
//面对函数式组件
const react函数式组件=observer((store)=>{jsx})
export default inject('store')(react函数式组件)
```



## hooks 钩子

**Hook 使你在非 class 的情况下可以使用更多的 React 特性**，React为什么要搞一个Hooks，想要复用一个有状态的组件太麻烦了！我们都知道react都核心思想就是，将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来。但假如你在大型的工作项目中用react，你会发现你的项目中实际上很多react组件冗长且难以复用。尤其是那些写成class的组件，它们本身包含了状态（state），所以复用这类组件就变得很麻烦，那之前，官方推荐怎么解决这个问题呢？答案是：渲染属性（Render Props）和高阶组件（Higher-Order Components)，hooks为共享状态逻辑提供更好的原生途径，**使你在无需修改组件结构的情况下复用状态逻辑**

版本支持上，16.7.0-alpha 开始支持  16.8.0 第一个正式版

### **使用规则**

- Hook可让您在不编写类的情况下使用状态和其他React功能
- 只能在顶层调用Hooks 。不要在循环，条件或嵌套函数中调用Hook
- 只能在functional component或者自定义钩子中使用Hooks
- 钩子在类内部不起作用，没有计划从React中删除类

### **useState 状态**

```jsx
import { useState } from 'react';
const [状态属性, 状态方法] = useState(状态属性的初始值);
const [count, setCount] = useState(0);

//使用状态
{状态属性}  //返回 状态值

//修改状态
setCount(新值)
```

> 可以自由命名,状态变量可以不只一个state变量了

### **useEffect 生命周期**

每当 React更新之后，就会触发 useEffect，在第一次 render 和每次 update 后触发，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

```jsx
import { useEffect } from 'react'; 

useEffect(()=>{
  //didMount || didUpdate
  return ()=>{willUnmount}
},[])
```

> [] == didMount ，不传递==didUpdate
>
> [state|props] == 指定的state或者props变化时
>
> 每一个state|props可以拥有一个effect（关注点分离），按照 effect 声明的顺序依次调用
>
> return 函数，在需要清除副作用时使用

### **useRef 元素引用**

返回一个可变的ref对象,current属性初始化为传递的参数initialValue

```jsx
let refContainer = useRef(initialValue)   // ~~ React.createRef(init)

<JSX ref={refContainer} ...

refContainer.current.dom操作
```

### **自定义钩子 useXxxXxx**

- 重用不同组件之间的常见有状态业务逻辑。
- 但每次使用自定义钩子时，其中的所有状态和效果都是完全隔离的
- 我必须以“ use” 开头命名我的自定义Hook
- 自定义Hook是一个JavaScript函数，其名称以“ use” 开头，可以调用其他Hook

```jsx
function useList(initList) {

  //使用系统和自定义钩子
  let [list, setList] = useState(initList);

  //业务
  function add(item) {
    alert('add')
    setList([...list, item])
  }

  function del(index) {
    let arr = [...list];
    arr.splice(index, 1);
    setList(arr);
  }

  function check(index, key,value) {
    alert('check')
    let arr = [...list];
    arr[index][key] = value;
    setList(arr);
  }

  // return [list, add, del, check]
  return {list, add, del, check}
}

//上面的业务，可以被购物结算和留言列表多个组件复用
```

### **useContext**

不使用组件嵌套就可以订阅 React 的 Context，`useContext(MyContext)` 相当于 class 组件中的 `static contextType = MyContext` 或者 `MyContext.Consumer`

```jsx
const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Xxx />
    </ThemeContext.Provider>
  );
}

function Xxx(props) {
  return (
    <div>
      <Ooo />
    </div>
  );
}

function Ooo() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      ...
    </button>
  );
}
```

## 扩展

## Immutable.js

****

***

## typescript

### 搭建环境

```dos
create-react-app 目录 --template typescript 
```

### 统一变化

- 所有用到`jsx`语法的文件都需要以`tsx`后缀命名
- 使用组件声明时的`Component`泛型参数声明，来代替PropTypes！
- 全局变量或者自定义的window对象属性，统一在项目根下的`global.d.ts`中进行声明定义
- 对于项目中常用到的接口数据对象，在`types/`目录下定义好其结构化类型声明

### react类型

RouteComponentProps

RouteComponentProps<ParamsInfo>

RouteChildrenProps

HTMLDivElement

match

React.FC

React.FunctionComponent

React.ReactNode

ComponentType<any>

JSX.Element

Dispatch

AxiosRequestConfig

AxiosPromise<any>



### 类组件

#### 创建组件

```tsx
export default class 组件名 extends React.Component<IProps, IState>{}
export default class Comp3 extends React.Component<{ //内联类型注解
  value: string; 
  onChange: (value: string ) => void 
}, {}> {}
export default class 组件名 extends React.Component<{}, {}>{} //组件没有props和状态时
```

> IProps，IState接口类型需要定义，可以定义在组件文件内部，或者types目录

#### 类型约束

```tsx
export interface List {//通用,可以丢到外部,也可以在外部定义，推荐`types/`目录下
  readonly id: number;
  name: string;
}
type IProps = { //未export 不通用
  readonly id: number;
  title: string;
  num?: number;
  arr?: string[]
}
type IState = {
  msg1: string;
  msg2: number;
  list: List[]
}
```

#### 组件状态

```tsx
export default class 组件名 extends React.Component<IProps, IState>{
	state: Readonly<IState> = initState;//state不建议通过实例属性修改，作为只读定义
}
```

> initState 可定义到组件外部，也可定义在内部

```tsx
let initState:IState = {
  msg1: 'xx',
  msg2: 12,
  list: [
    { id: 1, name: 'alex' },
    { id: 2, name: 'alex2' },
    { id: 2, name: 'alex3' },
  ]
};
```

#### props属性

类型约束内部确定只读，必传，可选特性，默认值在类属性defaultProps设定

```tsx
type IProps = { //未export 不通用
  readonly id: number;//只读, props理论都应该是只读
  title: string;//必传
  num?: number;//可选
  arr?: string[]
}
export default class 组件名 extends React.Component<IProps, IState>{
	
  //props默认值
  static defaultProps={
    num:0
  }
}
```

#### 事件

```tsx
const initialState = { clicksCount: 0 };//先定义值

//再使用typeof推断类型,并设置只读，限定this.state修改
type TState = Readonly<typeof initialState>;
                      
class Counter extends Component<{}, TState>{
  readonly state: TState = initialState;//因为 React 不推荐直接更新 state 及其属性
  render() {
    const { clicksCount } = this.state;
    return (
      <div>
        <h3>事件</h3>
        <button onClick={this.handlerIncrement}>+</button>
        <button onClick={this.handlerDecrement}>-</button>
        <div>{clicksCount}</div>
      </div>
    )
  }

  // private handlerIncrement=()=>this.setState({clicksCount:this.state.clicksCount+1})
  // private handlerDecrement=()=>this.setState({clicksCount:this.state.clicksCount-1})
  private handlerIncrement = () => this.setState(increment)
  private handlerDecrement = () => this.setState(decrement)
}

//独立纯函数，编译单独测试
const increment = (prevState: State) => ({ clicksCount: prevState.clicksCount + 1 })
const decrement = (prevState: State) => ({ clicksCount: prevState.clicksCount - 1 })
```



### 函数式组件

#### 定义组件

使用 `React.FunctionComponent` 接口定义函数组件

```tsx
type Props = {
  foo: string;
};

const MyComponent: React.FunctionComponent<Props> = props => {
  return <span>{props.foo}</span>;
};
export {MyComponent}
```

使用 `React.FC` 别名定义函数组件

```tsx
interface IProps {
  readonly id?:number;
  title?:string;
  num?:number;
  arr?:string[]
}

type IProps2=Readonly<IProps>;//类型映射

//函数式组件
const Footer: React.FC<IProps2> = (props) => {
  // props.num=2; //error 类型约束props为只读
  // props.title='2323';//error
  return (
    <div className="Footer">
      footer
    </div>
  )
}
export default Footer
```

#### 事件,props

事件函数通过props传入

```tsx
type TProps = {
  onClick(e: MouseEvent<HTMLElement>): void//必传
  text?: string//可选
}

//props默认值在函数接收参数时设定，handleClick为对象别名
const Button: FC<TProps> = ({ onClick: handleClick, text = '按钮' }: TProps) => (
  <>
    <h3>无状态组件</h3>
    <button onClick={handleClick}>按钮</button>
  </>
);
```



### 组件注入

通过props或直接嵌套的方式，向组件注入一些可变的元素

#### jsx节点

注入的元素有：string,number,boolean,ReactElement

**举例：**``<Comp2 header={<h4>Header</h4>} body={12} />``

```tsx
interface Iprops {
  header?: React.ReactNode;//jsx节点类型 string,number,boolean,ReactElement
  body: ReactNode;//类型需要导入，来自react包
}

//! 代表排除null
class Comp2 extends React.Component<Iprops, {}> {
  render() {
    return (
      <>
        <div>---------接收可渲染的内容start--------</div>
        {this.props!.header}
        {this.props.body}
        <div>---------接收可渲染的内容end--------</div>
      </>
    );
  }
}
```

##### children嵌套

调用组件时，插入到组件的内容`<组件>内容</组件>`

```tsx
type AuthProps = {
  children?: JSX.Element;//设定children类型，可选
  [propName:string]:any//props可以接受其他任何值
}
const authState = { show: false }//先赋值
type AuthState = Readonly<typeof authState>//后推断类型

class Auth extends Component<AuthProps, AuthState>{
  static readonly defaultProps: AuthProps = {title:'bmw'}
  readonly state: AuthState = authState
  render() {
    const { children } = this.props
    return (
    	<>
      	<div>组件自身内容</div>
        {children && children}
        <div>组件自身内容</div>
      </>
    )
  }
}
```

##### 注入组件

类似于``<Auth path="/foo" component={MyView} />``

```tsx
type AuthProps = {
  component?: ComponentType<any>;//设定要接受的组件类型ComponentType
}
const authState = { show: false }
type AuthState = Readonly<typeof authState>

class Auth extends Component<AuthProps, AuthState>{
  static readonly defaultProps: AuthProps = {title:'bmw'}
  readonly state: AuthState = authState
  render() {
    const { component: InjectedComponent } = this.props //InjectedComponent字面量别名
    
    return (
    	<>
      	<h3>组件本身</h3>
      	{/* 调用通过props传入的组件 */}
      	{InjectedComponent && <InjectedComponent/>}
      </>
    )
  }
}
```

##### 注入render属性

给调用的组件传递render函数，指定被调用组件的渲染内容

**举例：**

```tsx
<Auth render={() => (
  <div>render后的内容</div>
)} />
```

**实现:**

```tsx
type AuthProps = {
  render?: () => JSX.Element;
  [propName:string]:any
}
const authState = { show: false }
type AuthState = Readonly<typeof authState>

class Auth extends Component<AuthProps, AuthState>{
  static readonly defaultProps: AuthProps = {title:'bmw'}
  readonly state: AuthState = authState
  render() {
    const { render } = this.props
    if (render) {
      return render()//调用传入渲染函数，按照外部要求渲染
    }
    return (
    	<div>原本内容</div>
    )
  }
}
```



#### ref在类组件

引用渲染完成后的元素

##### 方式1

```tsx
import React from 'react';

export default class Comp3 extends React.Component<{ //内联类型注解
  value: string; 
  onChange: (value: string ) => void 
}, {}> {
	
  //使用 ref 和 null 的联合类型，并且在回调函数中初始化他
  input: HTMLInputElement | null = null;
  
  render() {
    return (
      <>
        <h3>refs</h3>
        <input
          ref={el => this.input = el}
          value={this.props.value}
          onChange={e => this.props.onChange(e.target.value)}
        />
      </>
    );
  }
  componentDidMount(){
    this.input != null && this.input.focus() //获取焦点
  }
}
```

##### 方式2

```tsx
import React,{createRef} from 'react';

export default class Comp3 extends React.Component<{ //内联类型注解
  value: string; 
  onChange: (value: string ) => void 
}, {}> {

  // 使用createRef函数，返回ref对象，并指定类型,作为实例
  input = createRef<HTMLInputElement>()
  
	render() {
    return (
      <>
        <h3>refs</h3>
        <input
          ref={this.input}
          value={this.props.value}
          onChange={e => this.props.onChange(e.target.value)}
        />
      </>
    );
  }
  componentDidMount(){
    this.input.current!.focus()
  }
}
```



#### 数据交互 axios

##### 反向代理

在src目录下创建setupProxy.js

```js
const proxy = require('http-proxy-middleware'); //需要安装中间件

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: 'http://localhost:3001',
      changeOrigin: true
    })
  );
  app.use(
    proxy("/mock", {
      target: 'http://localhost:3333',
      changeOrigin: true
    })
  )

};
```

##### axios 二次封装

在plugins目录创建axios.ts

```ts
import axios from 'axios';

export interface IUser {//通用，可在外部定义，或外部使用
  err:number,
  data:any,
  token:string
}
type TUser = Partial<IUser> & string | null //映射 交叉 联合

// 添加一个请求的拦截
axios.interceptors.request.use((config) => {

  //1抓取本地token，携带在请求头里
  let user:TUser = window.localStorage.getItem('user');
  user = user ? JSON.parse(user) : '';
  config.headers={'token': user!.token}

  //显示loading...

  return config;//返回请求

}, function(error) {
  // 请求错误时做点事
  return Promise.reject(error);
});

//添加一个响应拦截
axios.interceptors.response.use(function(response) {

  // res.data ~~ {err:1,msg:xx,data:{}} ~~ response.data

  //token过期: 返回值2,当前路由不是login时跳转，并传递当前路径，登录后可以有参考原路跳回
  if (response.data.err === 2 && !window.location.href.includes('/login')) {
    window.location.href='http://localhost:3000/login?path='+window.location.pathname
  }

  return response;

}, function(error) {
  return Promise.reject(error);
});

declare global { //定义到全局  也可以定义到src/global.d.ts
  interface Window {//给window接口添加axios方法函数
    axios(config: AxiosRequestConfig): AxiosPromise<any>
  }
}

window.axios = axios;  //希望全局使用axios ，

export default axios;

```

##### 数据交互

```tsx
import React from 'react';
// import axios from '../plugins/axios';

export interface IListItem {//推荐定义到src/types目录下
  _id: string, title: string, des: string, time: number
}


//数据交互
export default class Comp4 extends React.Component<{},{}> {
  readonly state:{
    list:Array<IListItem>
  }={
    list:[]
  }
  render() {
    let {list}=this.state
    return (
      <>
        <h3>comp4-数据交互</h3>
        {
          list.map((item:IListItem)=>(
            <li key={item._id}>
              {item.title}/{item.time}
            </li>
          ))
        }
      </>
    );
  }
  componentDidMount(){
    //window.axios({
    axios({//需要引入plugins/axios
      url:'/api/home'
    }).then(
      ({data:{data:list}})=>this.setState({list})
    )
  }
}

```



#### 路由

主入口.tsx

```tsx
import {BrowserRouter as Router,Route} from 'react-router-dom'

ReactDOM.render(
    <Router>
      <Route component={App} />
    </Router>
  , 
  // document.getElementById('root') as HTMLElement
  document.getElementById('root')! //移除null和undefined
);
```

根组件.tsx

```tsx
<Header />
<Switch >
  <Route path="/home" component={Home} />
  <Route path="/goods" component={Goods} />
  <Route path="/login" component={Login} />
  <Route path="/reg" component={Reg} />
  <Route path="/detail/:_id" component={Detail} />
  <Redirect exact from="/" to="/home" />
</Switch>

<Footer />
```

列表页.tsx

```tsx
 <li key={item._id}>
    <Link to={`/detail/${item._id}?dataName=home`}>
      {item.title}/{item.time}
    </Link>
  </li>
```

详情页.tsx，解决params._id 不存在的问题

```tsx
import React from 'react'
import {RouteComponentProps,match} from 'react-router-dom';
import qs from 'qs';//类似query-string

export interface IDetail {
  title: string;
  des: string;
  time: number;
  detail: {
    auth: string;
    content: string;
    auth_icon: string;
  }
}

type TDetail = {
  err: number;
  msg: string;
  data: Partial<IDetail>;//可选映射
};

//params._id 不存在

//解决方案1
type TProps={
  match: match<{_id?: string}>//交叉一个属性到RouteComponentProps类型
} & RouteComponentProps

//解决方案2
type ParamsInfo = {//作为 RouteComponentProps的泛型传入，定义params的内容
  _id:string
}
type TProps2=RouteComponentProps<ParamsInfo>;

export default class Detail extends React.Component<TProps, TDetail>{
  readonly state: TDetail = {
    err: 1,
    msg: '失败',
    data: {}
  }
  componentDidMount() {
    let dataName=qs.parse(this.props.location.search,{ignoreQueryPrefix:true}).dataName;
    let _id=this.props.match.params._id||null;
    window.axios({
      url:`/api/${dataName}/${_id}`
    }).then(
      ({data:{err,msg,data}})=>this.setState({err,msg,data})
    )
  }
  render() {
    let { err, data } = this.state;

    return (
      <>
        {
          err === 0 ? (
            <div>
              <h3>detail</h3>
              {data.title}/{data.detail?.auth}
            </div>
          ) : (
            <div>骨架屏</div>
          )
        }
      </>
    )
  }
}
```

函数式组件，接受路由上下文的类型约束

```tsx
const Login: React.FC<RouteChildrenProps> = ({ history, match, location }) => {}
```

> 需要规定FC别名的泛型约束RouteChildrenProps, 来自react-router-dom包



#### 状态管理

安装：

```
yarn add redux react-redux @types/react-redux -S
```

定义类型：src/types

```ts
//public type
export interface IListItem {
  _id: string, title: string, des: string, time: number
}

//store type
export interface IStoreState {
  bNav: boolean;
  bFoot: boolean;
  bLoading: false;
  home: IListItem[];
  follow: Array<IListItem>;
  user: {
    err: number;
    msg: string;
  },

  count:number;
  test:number;
}

export type StoreState = Partial<Readonly<IStoreState>>


//action type
export type TActionCount = {
  type: string;
  payload?: number
}
```

定义提交类型：src/store/const.ts

```
// 定义增加 state 类型常量
export const INCREMENT = "INCREMENT";
// 定义减少 state 类型常量
export const DECREMENT = "DECREMENT";

```

定义action：	src/store/actions

```ts
import { DECREMENT, INCREMENT } from '../const'
import { TActionCount } from '../../types'
import { Dispatch } from 'redux';

// 增加 state 次数的方法  同步
export const increment = (): TActionCount => ({
  type: INCREMENT,
})

// 减少 state 次数的方法 异步
export const decrement = (arg: any): any => (dispatch: Dispatch): Promise<any> => new Promise((resolve, reject) => {
  setTimeout(() => {//axios走起
    dispatch({ type: DECREMENT })
    resolve('异步actions发回来的回执')
  }, 1000)
})
```

定义reducers： src/store/reducers

```ts
import { combineReducers } from 'redux'

import {count} from './count'
import {other} from './other'

// combineReducers 可以吧store变成一个对象来组合reducer
//combineReducers(对象)  对象{key:value} key=state.key value=reducer函数
const rootReducer = combineReducers({
 count,//state.count: count的reducer函数
 other
})

export default rootReducer;
```

定义count：	src/store/reducers/count

```ts
import { DECREMENT, INCREMENT } from '../const';
import { TActionCount } from '../../types';

//参数state 只代表state.count的值 , 一定要有初始值
export function count(state:number = 0, {type,payload}: TActionCount): number {
  switch (type) {
    case INCREMENT:
      return payload ? state + payload : state + 1;
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
```

定义store实例： src/plugins/redux

```ts
import { createStore,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'//开启调试工具
import thunk from 'redux-thunk'//改装dispatch接受函数
import reducer from '../store/reducers'; 

// 1、创建 store  initState是可选参数
const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;
```

主入口引入store：

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './layouts/App';

import {BrowserRouter as Router,Route} from 'react-router-dom'


import { Provider } from 'react-redux';
import store from './plugins/redux'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
  , 
  // document.getElementById('root') as HTMLElement
  document.getElementById('root')! //移除null和undefined
);
```

组件接入redux使用：

```tsx
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreState } from '../types';
import { INCREMENT } from '../store/const';
import { decrement } from '../store/actions';


// 创建类型接口
export interface IProps {
  count?: number;
  test?: number;
  onIncrement: () => void,
  onDecrement: () => void
}

// 使用接口代替 PropTypes 进行类型校验
class Counter extends React.PureComponent<IProps> {
  public render() {
    const { count, onIncrement, onDecrement } = this.props;
    return (
      <>
        <h3>redux+react-redux+react-thunk</h3>
        <p>
          {count}
        <br />
        <button onClick={onIncrement}> +  </button>
        <button onClick={onDecrement}> - </button>
      </p>
      </>
      
    )
  }
}

// 将 reducer 中的状态插入到组件的 props 中
// 下面是单个reducer的时候，多个的时候需要选传入哪个reducer
// const { test, count } = state
// const mapStateToProps = (state: StoreState): StoreState => ({
const mapStateToProps = ({count,other}: StoreState): StoreState => ({
  // count:state.count
  count
})

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDecrement: () => dispatch(decrement('组件发出的参数')).then((res:string)=>console.log(res)),
  onIncrement: () => dispatch({type:INCREMENT,payload:2})
})

// 使用 connect 高阶组件对 Counter 进行包裹
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```



#### hooks

```tsx
import React, { useState, useEffect, useRef } from 'react'

interface Item{
  id?:number;
  title?:string;
}
const Reg: React.FC = () => {
  //只有在没有初始值的情况下才需要加入类型限制，因为有初始值时可以推断出实际状态的类型。
  const [msg, setMsg] = useState('数据1');//有初始值，会类型推断 √
  const [msg2, setMsg2] = useState();//没有初始值，推断为any
  const [msg3, setMsg3] = useState<number>(0);//手动指定类型和初始值
  const [msg4, setMsg4] = useState<Item|null>({id:1});//手动指定类型
  const [msg5, setMsg5] = useState<any[]>([]);//手动指定类型

  // const box = useRef(null)//有时设置引用可能会在稍后的时间点发生
  const box = useRef<HTMLDivElement>(null)//使用 useRef 时需要更加明确 被引用的类型

  useEffect(() => {
    console.log('didMount');
    box.current!.style.background='red';
    return () => {
      console.log('unmount');
    };
  }, []);

  return (
    <>
      <h3>hooks</h3>
      <div>msg:{msg}</div>
      <div>msg2:{msg2}</div>
      <div>msg3:{msg3+1}</div>
      {/* ? 代表对象存在，才去访问子key */}
      <div>msg4:{msg4?.id}/{msg4?.title}</div>
      <div>
        msg5:
          {
            msg5?.map((val,index)=>(
              <li key={index}>{val}</li>
            ))
          }
      </div>
      <div ref={box}>box</div>
      <button onClick={
       ()=>{
        setMsg('更新后的msg1')
        setMsg2('更新后的msg2')//简单类型直接修改
        setMsg3(msg3+1)
        // setMsg4({id:2})//符合类型，这样做会丢掉一些东东
        setMsg4(msg4=>({...msg4,id:22}))//可以这样
        // setMsg5(msg5=>([...msg5,'bmw']))
        setMsg5([...msg5,'bmw'])//或者这样
       } 
      }>更新状态</button>
    </>
  )

}

export default Reg;
```







## umi2

[官网](https://umijs.org/zh/guide/) [项目](C:\Users\Admin\Desktop\umitest)

### 创建项目

```dos
mkdir project
cd project
yarn create umi
```

### 项目结构

```jsx
|-public 本地数据资源
|-mock umi支持mock数据，无需代理
|-src
  |-assets 开发资源
  |-compoennts 通用组件
  |-layouts 为根布局,根据不同的路由选择return不同的布局,可以嵌套有一些和布局相关的组件
  |-pages 页面 约定式路由的页面
  |-plugins 子有的插件配置 如axios
  |-routes 授权路由
  |-app.js 运行时的配置文件  对等 react的index.js
  |- global.css 全局样式
|-umirc 编译时配置
```

### 资源指向

- 支持@指向src别名
- 相对指向 src
- 绝对指向 public
- img标签 指向public或者服务器
- 静态图片： import | require | 
- 数据图片： 绝对指向public | 服务器

### 路由

路由使用约定式，对齐nuxt，也可配置umirc后使用配置型路由，路由组件同react-router解构来自umi`import {NavLink} from 'umi'`

#### 约定式路由

```jsx
|-pages
  |-index.js   "/" 路由 页面
  |-index/index.js "/" 路由 页面
  
  |-goods.js  // /goods路由
  |-goods/index.js  // /goods路由页
    //goods 路由的默认页 return null 代表没有默认页
  |-goods/$id.js  // /goods/1 路由页 
  |-goods/$id$.js  // /goods 路由 goods下没有index 时 展示了 /goods 或 /goods/id，代表id可选
  |-goods/_layout.js  // /goods 路由页 有自己的展示区 {props.children} 不然会在父的展示区展示

  |-goods/category.js   // /goods/category 路由
  |-goods/category/index.js // /goods/category 路由

  |-404.js 生产模式下的404页，开发模式默认umi的
  //document.ejs 浏览器模板页 没有umi自动生成，有取当前模板结构
```

#### 路由跳转

##### 声明式

```jsx
<Link to={{pathname:'/goods/2',query:{a:11,b:22}}}>商品 002</Link>
```

##### 编程式

```jsx
import router from 'umi/router';
					
router.push('/login')

router.push({
  pathname:'/goods/1',
  query:{a:11,b:22}
})
// search:'a=111&b=222' 如果传递了search 会覆盖query,query只是对search的封装引用了search的值

props.history.xx() //可用
```

#### 传接参

```jsx
props.match.params
props.location.query 返回对象

```

#### 授权路由

##### 前置

```jsx
//组件内部守卫, 在组件文件最上方

/*
* title: reg Page
* Routes:
*   - ./src/routes/Auth.js
* */
```

##### 后置

```jsx
//同react
<Prompt
  when={true}
  message={(location) => {
    return window.confirm(`确认要去向 ${location.pathname}?`);
  }}
/>
```

### 数据交互

自带mock，无需代理，其他数据需要代理，本地数据放在public

### app.js 配置

在出错时显示个 message 提示用户，在加载和路由切换时显示个 loading，页面载入完成时请求后端，根据响应动态修改路由，引入一些插件配置模块，在运行时带入这些配置

**配置思想**

对外导出一堆umi内部可识别的函数 来完成配置

```jsx
export function render(oldRender) {
    渲染应用之前做权限校验，不通过则跳转到登录页
    oldRender() 渲染应用的函数
}

export function onRouteChange({ location, routes, action }) {
  初始加载和路由切换时的逻辑,用于路由监听, action 是路由切换方式如：push
}

export function rootContainer(container) {
  封装 root container  外层有个 Provider 要包裹 的场景 必须要有返回值,无需是可以不写这个函数
  // const DvaContainer = require('@tmp/DvaContainer').default;
  return React.createElement(DvaContainer, null, container);
}

export function modifyRouteProps(props, { route }) {
  修改传给路由组件的 props ， 所有组件都中
    props，Object，原始 props
    route，Object，当前路由配置
    return { ...props, 混入后的key: 值 };
}
```

### umirc 配置

配置编译环境 umirc 无需重启

```jsx
export default {

  history:'hash' 路由模式 默认历史记录

  publicPath: "/public/" 数据资源在非根目录或cdn时使用， 必须 绝对路径 + /结尾 影响打包后的位置会指向public

  disableCSSModules: false 	关闭css模块化 默认开启，推荐开启

  cssModulesExcludes:['index.css','login.css'] 指定项目目录下的文件不走 css modules 不支持scss

  sass: {}	支持scss 需要安装 sass-loader node-sass

  mountElementId:'app' 	指定 react app 渲染到的 HTML 元素 id。

  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      "changeOrigin": true,
      // pathRewrite: {'^/api' : ''}
    },
    '/douban': {
      target: 'https://douban.uieee.com',
      "changeOrigin": true,
      pathRewrite: {'^/douban' : ''},
      secure: false //接受https的代理
    }
  },

  routes: [ //使用手动配置路由，约定式路由失效
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index.js' },
        { path: '/users/', component: '../pages/users/index.js' },
        { path: '/users/list', component: '../pages/users/list.js' },
        { path: '/users/:id', component: '../pages/users/$id.js' },
      ]
    }
  ],

  plugins: [ 插件配置
    ['umi-plugin-react', {
      antd: false, 是否开启antd 需要安装依赖
      dva: false, 是否器dva支持 需要安装依赖

      dynamicImport: {//按需加载 生产环境下有效果
        webpackChunkName: true,//实现有意义的异步文件名
        loadingComponent: './components/Loading.js',//指定加载时的loading组件路径
      },

      title: 'umitest', 开启 title 插件

      routes: {
        exclude: [	用于忽略某些路由，比如使用 dva 后，通常需要忽略 models、components、services 等目录
          /components\//,
        ],
      },
    }],
  ],
}
```

## umi3<img src="https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png" style="zoom: 25%;" />

[官网](https://umijs.org/zh-CN)

使用react开发，可扩展的企业级前端应用框架，让react开发高度可配置(合并式，无需触碰webpack底层)，支持各种功能扩展和业务需求，可替换next完成服务端渲染

### Umi 如何工作

把大家常用的技术栈进行整理，收敛到一起，让大家只用 Umi 就可以完整 80% 的日常工作。CRA不支持配置（合并式），不是框架，但umi是，且支持配置，并内置插件的方式整合开发者遇到的一些常规业务问题（如 antd、dva 的深度整合，比如国际化、权限、数据流、配置式路由、补丁方案、自动化 external 方面）

#### 技术收敛

![img](https://img.alicdn.com/tfs/TB1hE8ywrr1gK0jSZFDXXb9yVXa-1227-620.png)



### 创建项目

```js
//首先得有 node，并确保 node 版本是 10.13 或以上
mkdir project
cd project
yarn create @umijs/umi-app
yarn 安装依赖
yarn start 启动开发
yarn build 打包构建
```

### 项目结构

```js
.
├── package.json //插件和插件集 @umijs/ 开头的依赖会被自动注册为插件或插件集。
├── .umirc.ts //配置文件，包含 umi 内置功能和插件的配置
├── .env //环境变量
├── dist //打包后
├── mock //mock 文件，此目录下所有 js 和 ts 文件会被解析为 mock 
├── public //静态资源
└── src
    ├── .umi //临时文件目录 忽视
    ├── layouts/index.tsx //布局组件
    ├── pages // 页面级别路由组件
        ├── index.less
        └── index.tsx
    └── app.ts //运行时配置文件 扩展运行时的能力
		├── global.css // 全局样式，如果存在此文件，会被自动引入到入口文件最前面 无效
```

**不希望类型检查**，可以更名为jsx或者js

### 样式和资源指向 

- 支持`@`别名指向src 
- css 里面`~@`执向src
- 相对 根在 src
- 绝对根在 public
- 静态图片引入： import | require | 指向src
- 数据图片引入： 指向public | 服务器
- `src/global.css` 为全局样式
- 当做 CSS Modules 用时，Umi 会自动识别 如： `import styles from './foo.css'`

### 路由

路由使用约定式，对齐`nuxt`，也可配置`umirc`后使用配置型路由，路由组件同react-router解构来自umi	`import {NavLink} from 'umi'`

#### 约定式路由

也叫文件路由，不需要手写配置，**没有 routes 配置，Umi 会进入约定式路由模式**，然后分析 `src/pages` 目录

```jsx
|-pages
  |-index.tsx   "/" 路由 页面
  |-index/index.tsx "/" 路由 页面
  
  |-goods.tsx  // /goods路由
  |-goods/index.tsx  // /goods路由页
    //goods 路由的默认页 return null 代表没有默认页
  |-goods/[id].tsx  // /goods/1 路由页 
  |-goods/_layout.tsx  // /goods 路由页 有自己的展示区 {props.children} 不然会在全局路由展示

  |-goods/category.tsx   // /goods/category 路由
  |-goods/[uid]/comment.tsx // /goods/23/comment 路由


  |-404.js 生产模式下的404页，//目前有问题 https://github.com/umijs/umi/issues/4437
  //document.ejs 浏览器模板页 没有umi自动生成，有取当前模板结构 ***
|- layouts
	|-index.tsx //全局路由。返回一个 React 组件，并通过 props.children 渲染子组件
```

#### 不同的全局 layout

你可能需要针对不同路由输出不同的全局 layout，但你仍可以在 `src/layouts/index.tsx` 中对 `location.path` 做区分，渲染不同的 layout 。

比如想要针对 `/user输出简单布局，

```js
//layouts/user.jsx
import React from 'react';

export default (props) => {
  return (
    <div>
      <h1>user layouts</h1>
      {props.children}
    </div>
  );
}

//layouts/index.jsx

import user from './user'
export default function(props) {
  if (props.location.pathname === '/user') {
    return <User>{ props.children }</User>
  }

  return (
    <>
    	...默认全局路由
      { props.children }
    </>
  );
}
```

#### 扩展路由属性

支持在代码层通过导出静态属性的方式扩展路由。

```js
import React from 'react';
import './user.css';

function User(){
  return (
    <div>
      <h1 className={'box'}>Page user</h1>
    </div>
  );
}

User.title = 'user Page';//修改路由页面标题

export default User;

```

其中的 `title` 会附加到路由配置中。

#### 路由跳转

##### 声明式

```jsx
import {NavLink} from 'umi'
<NavLink activeStyle={{激活样式}} to="/goods/2?a=1&b=2">商品 002</NavLink>
<NavLink activeStyle={{激活样式}} to={{pathname:'/goods/2',query:{a:11,b:22}}}>商品 002</NavLink>
```

##### 编程式

```jsx
import {history} from 'umi';
					
history.push('/login')

history.push('/goods/1?a=1&b=2');

history.push({
  pathname:'/goods/1',
  query:{a:11,b:22},
  search:'a=111&b=222' //如果传递了search 会覆盖query,query只是对search的封装引用了search的值
})

props.history.push({
  pathname:'/goods/1',
  query:{a:111,b:222},
})
```

#### 传接参

```jsx
props.match.params
props.location.query 返回对象


import {useLocation,useParams} from 'umi'
let locationHooks = useLocation();
let params = useParams();

{locationHooks.pathname}|{params.uid}
```

#### 授权路由

##### 前置

```jsx
//app.ts  全局
import { history } from 'umi';

export function render(oldRender) {
  fetch('/api/auth').then(auth => {
    if (auth.isLogin) { oldRender() }
    else { history.push('/login'); }
  });
}

//路由级别  路由独享
//umirc
routes: [
  { path: '/user', component: 'user',
    wrappers: [
      '@/wrappers/auth',
    ],
  },
  { path: '/login', component: 'login' },
]

//auth
export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    redirectTo('/login');
  }
}
```

##### 后置

```jsx
//同react
<Prompt
  when={true}
  message={(location) => {
    return window.confirm(`确认要去向 ${location.pathname}?`);
  }}
/>
```

#### 异步路由

组件体积太大，不适合直接计入 bundle 中，以免影响首屏加载速度

```js
//启用按需加载  p__index__index.chunk.css	p__index__index.js
// umirc
export default {
  dynamicImport: {},
}
```



#### 配置型路由

umirc 中通过 `routes` 进行配置，格式为路由信息的数组

```jsx
routes: [
  { path: '/login', component: 'login' },// 不写路径从 src/pages找组件
  { path: '/reg', component: 'reg' },
	
  //不使用全局layout的配置可以写在 / 的上面
  
  {
    path: '/',
    component: '@/layouts/index',
    routes: [//通常在需要为多个路径增加 layout 组件时使用
      { path: '/index', component: 'index' },
      // { exact: true, path: '/goods', component: '@/pages/goods' },
      { path: '/goods', component: '@/pages/goods/index' },
      {
        path: '/goods/:uid',
        component: '@/layouts/goods-detail',//为uid层级页面指定layout
        routes: [
          { path: '/goods/:uid', component: '@/pages/goods/[uid]' },
          { path: '/goods/:uid/comment', component: '@/pages/goods/[uid]/comment' },
          { component: '@/pages/404' }//子集的404,每一级都可以设定404
        ],
      },
      {
        path: '/user',
        component: '@/layouts/user',
        routes: [
          { path: '/user', component: '@/pages/user/index' },
          { path: '/user/:id', component: '@/pages/user/[id]' },
          { component: '@/pages/404' },
        ],
      },
      { path:'/', redirect: '/index' }, //跳转
      { component: '@/pages/404' },
    ],
  }

]
```



***

### 数据交互

#### mock

Umi 约定 `/mock` 文件夹下所有文件为 mock 文件无需代理，其他服务器数据需要代理

```js
import mockjs from 'mockjs'
export default {
  // 支持值为 Object 和 Array
  
  'GET /umi/goods': [{id:1,name:'韭菜'},{id:2,name:'西红柿'}],

  // 支持自定义函数，API 参考 express@4
  'POST /umi/login': (req, res) => {
    // 添加跨域请求头
    // res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('req',req.body);//完成业务
    res.send({
      err: 404,
      msg:'登录失败1'
    });
  },

  //引入mockjs

  'GET /umi/goods/home': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),

}

//模拟延时
import { delay } from 'roadhog-api-doc'
export default delay({同上},1000)
```

貌似不支持resFulApi 风格请求，jsonserver支持，值得考虑

#### 代理

```js
//umirc 
proxy: {
  '/api': {
    target: 'http://localhost:9001', //node服务
    "changeOrigin": true,
    // pathRewrite: {'^/api' : ''}
  },
  '/mock': {
    target: 'http://localhost:3333', //自建的jsonserver服务
    "changeOrigin": true,
    // pathRewrite: {'^/mock' : ''},
    // secure: false //接受https的代理
  }
}
```

#### axios

```js
//  plugins/axios.js 
import axios from 'axios';

//添加一个请求的拦截
axios.interceptors.request.use(function (config) {

  config.headers={
    'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXgiLCJfaWQiOiI1ZThhMGQ2MzczNDg2MDIzYTRmZDY4ZGYiLCJpYXQiOjE1ODkwMDIzMDUsImV4cCI6MTU4OTA4ODcwNX0.sStWoKBk2mYwa_1-AJOQobL7LBR82DnOseCeTds5ECs'
  };

  console.log('axios拦截器');

  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应的拦截
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


// React.axios = axios;//实例属性 无效
// window.axios = axios; //全局API 无效

export default axios;//需要引入plugins下的axios 才有拦截

```

### 插件

umi3提供的插件（内置），基本上无需安装，无需配置，直接使用即可

#### scss

umi 默认支持 less，要使用scss需要添加插件`@umijs/plugin-sass`，默认已安装，支持 Dart Sass  切换到 Node Sass，需安装 node-sass 依赖

```js
yarn add @umijs/plugin-sass -D //无需配置就可以支持dart scss
yarn add node-sass -D // 使用node-sass时 需要的依赖

//使用node-sass时的配置 umirc
sass: {
  implementation: require('node-sass'),
}
```

#### antd

内置插件，默认开启，直接使用，对齐antd使用

```js
import { Button,message } from 'antd';
<Button 
	type="primary" 
	onClick={()=>message.info('message')}
>Primary</Button>
```

#### request  

##### 介绍

网络请求库，基于 fetch 封装, 兼具 fetch 与 axios 的特点, 旨在为开发者提供一个统一的api调用方式, 简化使用

| 特性       | request        | fetch          | axios          |
| ---------- | -------------- | -------------- | -------------- |
| 实现       | 浏览器原生支持 | 浏览器原生支持 | XMLHttpRequest |
| 大小       | 9k             | 4k (polyfill)  | 14k            |
| query 简化 | ✅              | ❌              | ✅              |
| post 简化  | ✅              | ❌              | ❌              |
| 超时       | ✅              | ❌              | ✅              |
| 缓存       | ✅              | ❌              | ❌              |
| 错误检查   | ✅              | ❌              | ❌              |
| 错误处理   | ✅              | ❌              | ✅              |
| 拦截器     | ✅              | ❌              | ✅              |
| 前缀       | ✅              | ❌              | ❌              |
| 后缀       | ✅              | ❌              | ❌              |
| 处理 gbk   | ✅              | ❌              | ❌              |
| 中间件     | ✅              | ❌              | ❌              |
| 取消请求   | ✅              | ❌              | ✅              |

##### 基本用法

[request](https://umijs.org/zh-CN/plugins/plugin-request)内置插件，默认开启，直接使用，使用对齐 [umi-request](https://github.com/umijs/umi-request) 和 [@umijs/hooks](https://github.com/umijs/hooks) 的 `useRequest`

```jsx
import {request} from 'umi'
// useRequest 接收了一个异步函数 getUsername ，在组件初次加载时， 自动触发该函数执行。同时 useRequest 会自动管理异步请求的 loading , data , error 等状态
//request 对齐 axios

export default (props) => {
  //data ~~ axios的res.data.data
  //如果数据里面没有data 返回undefined
  //通过配置 umirc request.dataField 可以指定
  console.log('data',data)

  useEffect(()=>{
		//request ~~ axios
    request('/api/goods/home',{params:{_limit:1}}).then(
    	//res ~~ axios的res.data
    ).catch()

  },[]);

  return (
    <div>

    </div>
  );
}
```

##### 拦截器

```js
//app.ts
export const request = {
  // timeout: 1000,
  // errorConfig: {},
  // middlewares: [],
  requestInterceptors: [
    (url, options)=>{// 请求地址 配置项
      options.headers={token:''}
      return {url,options}
    }
  ],
  responseInterceptors: [
    (response, options) => {//响应体 请求时的配置项
      console.log(response,options)
      return response;
    }
  ],
};
```

##### useRequest钩子

###### 介绍

[文档](https://hooks.umijs.org/zh-CN/hooks/async)

一个强大的管理异步数据请求的 Hook.

**核心特性**

- 自动请求/手动请求
- SWR(stale-while-revalidate)
- 缓存/预加载
- 屏幕聚焦重新请求
- 轮询
- 防抖
- 节流
- 并行请求
- loading delay
- 分页
- 加载更多，数据恢复 + 滚动位置恢复
-  错误重试
-  请求超时管理
-  suspense
- ......

###### 用法

在组件初次加载时， 自动触发该函数执行。同时 useRequest 会自动管理异步请求的 `loading` , `data` , `error` 等状态。

```tsx
import {useRequest} from 'umi'

export default function  RequestHooks(){

  // 用法 1
  const { data, error, loading } = useRequest('/mock/home');

	// 用法 2
  const { data, error, loading } = useRequest({
    url: '/mock/home',
    params:{_limit:1}
  });

	// 用法 3
	const { data, error, loading } = useRequest((id)=> `/api/home/${id}`); //?

	// 用法 4
  const { data, loading, run } = useRequest((_limit) => ({
    url: '/mock/home',
    params: { _limit }
  }), {
    manual: true,//手动通过运行run触发
  });
  
  // 轮询
  const { data, loading, run } = useRequest((_limit) => ({
    url: '/mock/home',
    params: { _limit }
  }), {
    manual: true,//手动通过运行run触发
    pollingInterval:1000,//轮询 一秒读一次
    pollingWhenHidden:false,//屏幕不可见时，暂停轮询
  });
  
  if (error) {
    return <div>failed to load</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>{JSON.stringify(data)}</div>
    <button onClick={()=>run(1)}>手动</button>
  );
}
```

###### 并行请求

通过 `options.fetchKey` ，可以将请求进行分类，每一类的请求都有独立的状态

```jsx
import { useRequest } from 'umi';
import { Button } from 'antd';

export default () => {
  const { run, fetches } = useRequest((userId)=>({
    url: '/mock/home',
    params:{_limit:1,_page:userId-0}
  }), {
    manual: true,
    fetchKey: id => id,
    onSuccess:(res,params)=>{
      console.log(res, params)
    }
  });

  const users = [{ id: '1', username: 'A' }, { id: '2', username: 'B' }, { id: '3', username: 'C' }];

  return (
    <div>
      <h3>并行请求：单击所有按钮，每个请求都有自己的状态</h3>
      <ul>
        {users.map((user => (
          <li key={user.id} style={{ marginTop: 8 }}>
            <Button loading={fetches[user.id].loading} onClick={() => { run(user.id) }}>读取</Button>
          </li>
        )))}
      </ul>
    </div>
  );
};
```

###### 防抖-解流-缓存

```jsx
import { useRequest, request } from 'umi';
import { Input  } from 'antd';
import React from 'react';

let {Search}=Input;

function getHome(search) {
  console.log(1,search)
  return request('/mock/home',{params:{_page:search-0, _limit:1}})
}

export default () => {
  const { data, loading, run, cancel } = useRequest(getHome, {
    // debounceInterval: 500, //频繁调用 run 以防抖策略进行请求
    // throttleInterval: 500,//频繁触发 run ，则会以节流策略进行请求
    // cacheKey:'homepage', //缓存 回退路由，在进入数据data还在
    manual: true
  });

  return (
    <div>
      <h3>防抖</h3>
      <Search
        placeholder="输入页数"
        onChange={e=>run(e.target.value)}
        onBlur={cancel}
        style={{ width: 300 }}
        loading={loading}
      />
      <br/>
      {data && JSON.stringify(data)}
    </div>
  );
};
```

###### 激活聚焦重求-loading防闪烁

```jsx
import { useRequest } from 'umi';
import { Spin } from 'antd';
import React from 'react';

export default () => {
  const { data, loading } = useRequest({
    url:'/mock/home',
    params:{_limit:1,_page:1}
  }, {
    refreshOnWindowFocus: true,//浏览器窗口 refocus 和 revisible 时，会重新发起请求
    focusTimespan: 1000,//请求间隔，默认为 5000ms 。
    // loadingDelay:1500 // loading防闪烁 可以延迟 loading 变成 true 的时间，有效防止闪烁
  })

  return (
    <div>
      <p>屏幕聚焦重新请求</p>
      <Spin spinning={loading}>
        <div>{data && JSON.stringify(data)}</div>
      </Spin>
    </div>
  )
}
```

###### 状态变化重请求

```jsx
import { useRequest } from '@umijs/hooks';
import { Spin, Select } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [pageNum, setPageNum] = useState('1');

  const { data, loading } = useRequest(() => ({
    url:'/mock/home',
    params:{_limit:1,_page:pageNum}
  }), {
    refreshDeps: [pageNum]//pageNum变化时，会使用之前的 params 重新执行
  });

  return (
    <div>
      <Select onChange={setPageNum} value={pageNum} style={{ marginBottom: 16, width: 120 }}>
        <Select.Option value="1">page 1</Select.Option>
        <Select.Option value="2">page 2</Select.Option>
        <Select.Option value="3">page 3</Select.Option>
      </Select>
      <Spin spinning={loading}>
        home: {data && JSON.stringify(data)}
      </Spin>
    </div>
  );
};
```

***

### app.ts 配置

运行时配置，跑在浏览器端， 如：在出错时显示个 message 提示用户，在加载和路由切换时显示个 loading，页面载入完成时请求后端，根据响应动态修改路由，引入一些插件配置模块，在运行时带入这些配置

**配置思想**

对外导出一堆umi内部可识别的函数 来完成配置

```jsx
//修改路由
export function patchRoutes({ routes }) {
  //比如在最前面添加一个 /foo 路由
  routes.unshift({
    path: '/foo',
    exact: true,
    component: require('@/extraRoutes/foo').default,
  });
}

//权限校验
import { history } from 'umi';

export function render(oldRender) {
  fetch('/api/auth').then(auth => {
    if (auth.isLogin) { oldRender() }
    else { history.push('/login'); }
  });
}

//动态更新路由
let extraRoutes;
export function patchRoutes({ routes }) {
  merge(routes, extraRoutes);
}
export function render() {
  //请求服务端根据响应
  fetch('/api/routes').then((res) => { extraRoutes = res.routes })
}

export function onRouteChange({matchedRoutes, location, routes, action }) {
  //初始加载和路由切换时的逻辑,用于路由监听, action 是路由切换方式如：push
  //用于做埋点统计
  //动态设置标题
  document.title = matchedRoutes[matchedRoutes.length - 1].route.title || ''
}

export function rootContainer(container,args) {
  //封装 root container  外层有个 Provider 要包裹 的场景 必须要有返回值,无需是可以不写这个函数
  // const DvaContainer = require('@tmp/DvaContainer').default;
  return React.createElement(DvaContainer, null, container);
  
  //args 包含：

    //routes，全量路由配置
    //plugin，运行时插件机制
    //history，history 实例
}

export function modifyRouteProps(props, { route }) { // ***
  	//修改传给路由组件的 props ， 所有组件都中
    //props，Object，原始 props
    //route，Object，当前路由配置
    return { ...props, 混入后的key: 值 };
}
```

### umirc 配置

配置编译环境 umirc 无需重启, 推荐在 `.umirc.ts` 中写配置。如果配置比较复杂需要拆分，可以放到 `config/config.ts` 中，并把配置的一部分拆出去，比如路由。

两者二选一，`.umirc.ts` 优先级更高。 [文档](https://umijs.org/zh-CN/config)

```jsx
import { defineConfig } from 'umi';

export default defineConfig({
	
  //设置 node_modules 目录下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none',
  },


  // 配置型路由 权重高于约定式 且不可合并
  // routes: [
  //   { component: '@/pages/404' },
  // ],

  history: { type: 'hash' }, //哈希路由模式，解决强刷,或者通过后端解决

  //关闭mock
  // mock: false,

  //多个代理 mock数据无需代理
  proxy: {
    '/api': {
      target: 'http://localhost:9001',
      "changeOrigin": true,
      // pathRewrite: {'^/api' : ''}
    },
    '/mock': {
      target: 'http://localhost:333',
      "changeOrigin": true,
      // pathRewrite: {'^/mock' : ''},
      // secure: false //接受https的代理
    }
  },

  //按需加载功能默认是关闭的
  dynamicImport: {
    loading: '@/loading', //定义按需加载时的loading组件
  },

  title: 'hi',//配置应用统一标题

  mountElementId:'app',//指定 react app 渲染到的 HTML 元素 id。

  devServer:{
    port:8082
  },

  favicon: '/favicon.ico',//使用本地的图片，图片请放到 public 目录

  //配置 <head> 里的额外脚本，数组项为字符串或对象
  headScripts: [
    `alert(1);`,
    `http://code.jquery.com/jquery-2.1.1.min.js`,
  ],

  //配置 <head> 额外 link 和style
  styles: [
    `body { color: red; }`,
    `https://a.com/b.css`,
  ],

  
});

```

### SSR

***

[参考](https://github.com/SilentFlute/umi3.x-ssr)

## dva

dva = React-Router + Redux + Redux-saga [项目](C:\Users\Admin\Desktop\dvatest)

### 核心

- View：React 组件构成的视图层
- Action：一个对象，描述事件
- connect 方法：一个函数，绑定 State 到 View
- dispatch 方法：一个函数，发送 Action 到 State
- model 数据管理模块
  - State：一个对象，保存整个应用状态
  - reducers： 一个对象 同步业务
  - effects： 一个对象 处理异步
  - subscriptions： 订阅数据源
  
  ![img](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)

### umi2下使用

#### umirc配置

```jsx
antd: true, 开启antd
dva: true,  开启dva数据流
routes: {//路由
  exclude: [//排除
    /models\//,
    /services\//,
    /model\.(t|j)sx?$/,
    /service\.(t|j)sx?$/,
    /components\//,
  ],
},
```

#### app配置

```jsx
export const dva = {
  config: { 
    onError(err) {//监听错误
      err.preventDefault();
      console.error('dva config',err.message);
    },

    //初始数据 不给就取根models的state，给了就不取
    initialState: {
      namespace: {
        key:value
      },
    },
  },
  plugins: [
    // require('dva-logger')(),
  ],
}
```

#### model

```jsx
// src/models 全局
// src/pages/models 页面

export default {
  namespace: 'global',//所有models里面的namespace不能重名
  state: { //存放数据
    stateName: stateValue,
  },
  reducers: { //处理同步 左key 等于dispatch({type:key
    reducersKey(state,{type,payload}) {
      return {
        ...state,
        stateName: newValue,
      };
    }
  },
  effects: {	//处理异步 左key 等于dispatch({type:key
    *login(action, { call, put, select }) {

      //	call：执行异步函数  如: const result = yield call(fetch, '/todos');
      //	put：发出一个 Action，类似于 dispatch
      //	select: 从state里获取数据 如: const todos = yield select(state => state.todos);

      const res = yield call(fetch,'/mock/home')
      const data = yield res.json();

      yield put({
        type: 'reducerKey'|'effectsKey',
      });

    },
  },

  subscriptions: {
    //场景： 时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化
    //订阅一个数据源 根据条件 dispatch 需要的 action
    //subsription中的方法名是随意定的，每次变化都会一次去调用里面的所有方法

    随意的key({ dispatch, history }) {

      //路由监听
      history.listen(({ pathname, query }) => {});

      //需要导入import key from 'keymaster' 监听键盘
      key('⌘+i, ctrl+i', () => { dispatch({type:reducersKey|effectsKey}) });

      //窗口变化
      window.onresize|onscroll = function(){
        console.log('onresize')
      }

    }
  }
  
}
```

#### 页面

layouts、组件接入 dva

```jsx
import {connect} from 'dva'
function 组件(props){
  props.propname
  props.dispatch({type,payload})
    //type:'namespace/reducersKey|effectsKey'
    //type:'namespace/effectsKey'
}
function mapStateToProps(state) {
  return {
    propname: state.namespace.stateKey,
    propname: state.namespace
  };
}
export default connect(mapStateToProps)(组件);

//layouts
import withRouter from 'umi/withRouter';
import {connect} from 'dva'
export default withRouter(connect(mapStateToProps)(组件));
```

### umi3下使用

umi3以插件的形式整合 dva 数据流，配置默认开启

[文档](https://umijs.org/zh-CN/plugins/plugin-dva)

#### model

```jsx
// src/models/modelname.js 全局


import { history } from 'umi';
import key from 'keymaster';

export default {
  namespace: 'global',//所有models里面的namespace不能重名
  state: {
    title:'UMI+DVA',
    text: '我是全局text',
    login: false,
    a:'全局models aaaa',
  },
  reducers: {//处理同步 左key 等于dispatch({type:key
    setText(state) {
      return {
        ...state,
        text: '全局设置 后的text'+Math.random().toFixed(2),
      };
    },
    setTitle(state,action) {
      return {
        ...state,
        text: `全局设置 后的title${action.payload.a}/${action.payload.b}`,
      };
    },
    signin:(state)=>({
      ...state,
      login: true,
    }),
  },
  effects: {
    //处理异步 左key 等于dispatch({type:key
    //call：执行异步函数
      // const result = yield call(fetch, '/todos');
    //put：发出一个 Action，类似于 dispatch
    //select: 从state里获取数据
      //const todos = yield select(state => state.todos);
    *login(action, { call, put, select }) {
      const res = yield call(fetch,'/umi/goods/home')
      const data = yield res.json();
      console.log('*login',data);

      yield put({
        type: 'signin',
      });

      yield put(history.push('/'));
      // yield put(routerRedux.push('/'));
    },


    *throwError(action, effects) {
      console.log(effects);
      throw new Error('全局effects 抛出的 error');
    },
  },
  subscriptions: {
    //场景： 时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化
    //订阅一个数据源 根据条件 dispatch 需要的 action
    //subsription中的方法名是随意定的，每次变化都会一次去调用里面的所有方法
    listenRoute({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        console.log('global subscriptions',pathname,query);//根据不同pathname加载不同数据发actions给reducers组件绑定state就好
      });
    },
    listenKeyboard({dispatch}) {//监听键盘
      key('⌘+i, ctrl+i', () => { dispatch({type:'setText'}) });
    },
    listenResize({dispatch}) {//监听窗口变化
      window.onresize = function(){
        console.log('onresize')
      }
    },
    listenScroll({dispatch,history,done}){
      window.onscroll=function () {
        console.log('onscroll')
      }


    }
  },
};


// src/pages/pagename/model.js 页面
//model下面如果 没有多个state key 可以不用出现models目录
export default {
  namespace: 'count',
  state: 0,//count:0
  reducers: {
    increase(state) {
      return state + 1;
    },
    decrease(state) {
      return state - 1;
    },
  }
};

// src/pages/pagename/models/modelname.js 页面
export default {
  namespace: 'a',  //组件 通过state.a 得到 'goods page data a'
  state: 'goods page data a',
  reducers: {},
};
```

#### 组件

layouts、组件接入 dva

```jsx
import {connect} from 'umi'
function 组件(props){
  props.propname
  props.dispatch({type,payload})
    //type:'namespace/reducersKey|effectsKey'
    //type:'namespace/effectsKey'
}
function mapStateToProps(state) {
  return {
    propname: state.namespace.stateKey,
    propname: state.namespace
  };
}
export default connect(mapStateToProps)(组件);

//layouts
import {withRouter, connect} from 'umi'
export default withRouter(connect(mapStateToProps)(组件));
```



## @umijs/hooks

[文档](https://hooks.umijs.org/zh-CN/hooks/async)

### useDrop & useDrag

一对帮助你处理在拖拽中进行数据转移的 hooks

> useDrop 可以单独使用来接收文件、文字和网址的拖拽。
>
> useDrag 允许一个 dom 节点被拖拽，需要配合 useDrop 使用。
>
> 向节点内触发粘贴时也会被视为拖拽的内容

#### 使用

```jsx
import React from 'react';
import { useDrop, useDrag } from '@umijs/hooks';

export default () => {
  const getDragProps = useDrag();
  //props  需要透传给接受拖拽区域 dom 节点的 props
  //isHovering 是否是拖拽中，且光标处于释放区域内
  const [props, { isHovering }] = useDrop({
    onText: (text, e) => {
      console.log(text, e);
    },
    onFiles: (files, e) => {
      console.log(e, files);
    },
    onUri: (uri, e) => {
      console.log(uri, e);
    },
    onDom: (content, e) => {
      console.log(content, e);
    },
  });

  return (
    <div>
      <div>useDrop 可以单独使用来接收文件、文字和网址的释放</div>
      <div>useDrag 允许一个 dom 节点被拖拽，需要配合 useDrop 使用</div>
      <div>向节点内触发粘贴时也会被视为拖拽的内容</div>

      <div style={{ border: '1px dashed #e8e8e8', padding: 16, textAlign: 'center' }} {...props}>
        {isHovering ? '撒手' : '拖到这'}
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        <div
          {...getDragProps('box')}
          style={{ border: '1px solid #e8e8e8', padding: 16, width: 80, textAlign: 'center', marginRight: 16 }}
        >
          box
        </div>
      </div>
    </div>
  );
};
```

#### useDrag Result

| 参数         | 说明                                                      | 类型                    |
| ------------ | --------------------------------------------------------- | ----------------------- |
| getDragProps | 一个接收拖拽的值，并返回需要透传给被拖拽节点 props 的方法 | (content: any) => props |

#### useDrop Result

| 参数       | 说明                                    | 类型    |
| ---------- | --------------------------------------- | ------- |
| props      | 需要透传给接受拖拽区域 dom 节点的 props | -       |
| isHovering | 是否是拖拽中，且光标处于释放区域内      | boolean |

#### useDrop Params

| 参数    | 说明                      | 类型                              | 默认值 |
| ------- | ------------------------- | --------------------------------- | ------ |
| onText  | 拖拽文字的回调            | (text: string, e: Event) => void  | -      |
| onFiles | 拖拽文件的回调            | (files: File[], e: Event) => void | -      |
| onUri   | 拖拽链接的回调            | (text: string, e: Event) => void  | -      |
| onDom   | 拖拽自定义 dom 节点的回调 | (content: any, e: Event) => void  | -      |

### useVirtualList

解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题

#### 使用

```jsx
import React from 'react';
import { useVirtualList } from '@umijs/hooks';

export default () => {
  //list 当前需要展示的列表内容  {data: T, index: number}[]
  // containerProps  滚动容器的 props  {}
  // wrapperProps  children 外层包裹器 props {}
  const { list, containerProps, wrapperProps } = useVirtualList(Array.from(Array(99999).keys()), {
    overscan: 30,//视区上、下额外展示的 dom 节点数量
    itemHeight: 60,//行高度，静态高度可以直接写入像素值，动态高度可传入函数
  });
  return (
    <>
      <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
        <div {...wrapperProps}>
          {list.map((ele, index) => (
            <div
              style={{
                height: 52,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
```

#### API

```typescript
const result:Result = useVirtualList(originalList: any[], Options);
```

#### Result

| 参数           | 说明                      | 类型                       |
| -------------- | ------------------------- | -------------------------- |
| list           | 当前需要展示的列表内容    | {data: T, index: number}[] |
| containerProps | 滚动容器的 props          | {}                         |
| wrapperProps   | children 外层包裹器 props | {}                         |
| scrollTo       | 快速滚动到指定 index      | (index: number) => void    |

#### Params

| 参数         | 说明                   | 类型 | 默认值 |
| ------------ | ---------------------- | ---- | ------ |
| originalList | 包含大量数据的列表     | T[]  | []     |
| options      | 可选配置项，见 Options | -    | -      |

#### Options

| 参数       | 说明                                                   | 类型                                  | 默认值 |
| ---------- | ------------------------------------------------------ | ------------------------------------- | ------ |
| itemHeight | 行高度，静态高度可以直接写入像素值，动态高度可传入函数 | number \| ((index: number) => number) | -      |
| overscan   | 视区上、下额外展示的 dom 节点数量                      | number                                | 10     |

### useEventTarget

常见表单控件(通过 e.target.value获取表单值) 的 onChange 跟 value 逻辑封装，支持 自定义值转换 跟 重置 功能

#### 使用

```jsx
import React  from 'react';
import { Input, Button } from 'antd';
import { useEventTarget } from '@umijs/hooks'

export default () => {
  //value  表单控件的值 T
  // onChange  表单控件值发生变化时候的回调 (e: { target: { value: T }}) => void
  // reset 重置函数 () => void
  const [valueProps, reset] = useEventTarget('初始值');

  return (<>
      <Input {...valueProps} style={{ width: 200, marginRight: 20 }}/>
      <Button type="primary" onClick={reset}>重置</Button>
    </>
  );
};
```

#### API

```javascript
const [ { value, onChange }, reset ] = useEventTarget<T, U>(initialValue?: T, transformer?: (value: U) => T );
```

#### Result

| 参数     | 说明                         | 类型                                 |
| -------- | ---------------------------- | ------------------------------------ |
| value    | 表单控件的值                 | T                                    |
| onChange | 表单控件值发生变化时候的回调 | (e: { target: { value: T }}) => void |
| reset    | 重置函数                     | () => void                           |

#### Params

| 参数          | 说明                         | 类型            | 默认值 |
| ------------- | ---------------------------- | --------------- | ------ |
| initialValue? | 可选项, 初始值               | T               | -      |
| transformer?  | 可选项，可自定义回调值的转化 | (value: U) => T | -      |

## umi+dva项目

开发

部署

[项目1](https://github.com/crownclownwl/umi2-level-up-to-umi3-demo.git)

[项目2](https://github.com/haoyinag/Chy-Umi-Pro)

## umi+dva+ts

[项目3](https://github.com/BluesVN/antd4_tmp)

[项目4](https://github.com/wangyueweb/musical-umi3)





## 																							React-Native

### React-Native介绍

  React Native (简称RN)是Facebook于2015年4月开源的跨平台移动应用开发框架，是Facebook早先开源的UI框架 React 在原生移动应用平台的衍生产物，目前支持iOS和安卓两大平台。RN使用Javascript语言，类似于HTML的JSX，以及CSS来开发移动应用，因此熟悉Web前端开发的技术人员只需很少的学习就可以进入移动应用开发领域。
   React Native使你能够在Javascript和React的基础上获得完全一致的开发体验，构建世界一流的原生APP。React Native着力于提高多平台开发的开发效率 —— 仅需学习一次，编写任何平台。(Learn once, write anywhere)，[官网](https://reactnative.cn/)

### Native App

​		即原生开发模式,开发出来的是原生程序,不同平台上,Android和iOS的开发方法不同,开发出来的是一个独立的APP,能发布应用商店,有如下优点和缺点。
优点：

- 直接依托于操作系统,交互性最强,性能最好
- 功能最为强大,特别是在与系统交互中,几乎所有功能都能实现

缺点：

- 开发成本高，无法跨平台
- 升级困难
- 维护成本高

### Web App

​		即移动端的网站,将页面部署在服务器上,然后用户使用各大浏览器访问,不是独立APP,无法安装和发布Web网站一般分两种,MPA(Multi-page Application)和SPA(Single-page Application)。而Web App一般泛指后面的SPA形式开发出的网站(因为可以模仿一些APP的特性),有如下优点和缺点。
 优点：

- 开发成本低,可以跨平台,调试方便
- 版本升级容易
- 维护成本低
- 无需安装 App，不占用手机内存(通过浏览器即可访问)

缺点：

- 性能低,用户体验差
- 依赖于网络,页面访问速度慢,耗费流量
- 功能受限,大量功能无法实现(无法调用原生 API)
- 临时性入口,用户留存率低

### Hybrid App

即混合开发,也就是半原生半Web的开发模式,有跨平台效果,实质最终发布的仍然是独立的原生APP(各种的平台有各种的SDK)，这是一种 Native App 和 Web App 折中的方案，保留了 Native App 和 Web App 的优点。
 优点：

- 开发成本较低,可以跨平台,调试方便
- 维护成本低,功能可复用
- 更新较为自由（只下载资源不更新 apk ）
- 学习成本较低(前端开发人员不用学习底层 api)
- 功能更加完善,性能和体验要比起web app 好

缺点：

- 相比原生,性能仍然有较大损耗
- 不适用于交互性较强的app（主要适用于新闻阅读类与信息展示类的 APP）

### React Native App

​		Facebook发起的开源的一套新的APP开发方案,Facebook在当初深入研究Hybrid开发后,觉得这种模式有先天的缺陷,所以果断放弃,转而自行研究,后来推出了自己的“React Native”方案,不同于H5,也不同于原生,更像是用JS写出原生应用,有如下优点和缺点
 优点：

- 开发成本在 Hybrid 和 Native 开发之间 ，大部分代码还是可复用的，
- 性能体验高于Hybrid，性能相比原生差别不大
- 技术日益成熟，发展迅猛

缺点：

- 门槛相对 Web App 与 Hybrid App 来说相对高一点（也需要了解 Native 层）

### 开发模式的对比

![img](https://upload-images.jianshu.io/upload_images/5146067-fcdfe27d6921bf93.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/841/format/webp)

### 环境搭建

使用[expo-cli](https://expo.io/)开发react应用程序需要两种工具：本地开发工具和用于打开应用程序的移动客户端，需要在计算机上安装Node.js（版本10或更新版本）

##### 安装Expo CLI 到pc开发机器

```
npm install -g expo-cli
```

##### 手机上安装 expo client

[	从Play商店下载Android版](https://play.google.com/store/apps/details?id=host.exp.exponent)或[从App Store ](https://itunes.com/apps/exponent)[下载](https://play.google.com/store/apps/details?id=host.exp.exponent)[iOS版](https://itunes.com/apps/exponent)

- 真机测试  更真实
- 打开手机expo client->profile->options->sigin in 注册一个账号 并 登陆 
- 安卓真机需要 打开usb调试

#### pc上装模拟器

- pc机模拟手机来测试 速度快
- for windows： 夜游，逍遥...   推荐: mumu 网易模拟器，百度一下
  - 在mumu模拟器上安装 apk -> expo client安装到模拟器 -> 允许expo在其他应用上层显示->登陆expo账号
- for ios：  Xcode,  目前只有安卓模拟器，没有好用的苹果模拟器

### 创建react-native项目

```
expo init 目录
```

```
选择模板: (Use arrow keys)
  ----- Managed workflow -----
> blank         空模板 
  tabs          带路由
```

```
cd 目录
npm start | yarn start  看你init时用的是什么工具安装，这里就用什么工具
```

```
? 回车   查看expo帮助
s 回车   登录expo账号   输入在手机expo注册的账号, 登录只需要做一次
shift + r 重启
npm start | yarn start 
```

> `注意`

- 保持 手机上expo的账号 和项目创建时 s 的账号一致

- 保持pc和手机在同一网段，后期热刷新
- 卡顿时，摇手机 refresh -> pc 机 npm | yarn start + 手机expo client重开

### 打包apk

```
npm install -g expo-cli  已安装侧跳过
```

配置app.json

```
{
  "expo": {
    "name": "应用名称",
    "slug": "expo-test-win10", //上传到expo时的目录名
    "icon": "./assets/icon.png", //桌面图标
    "splash": {
      "image": "./assets/splash.png",//欢迎图片
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "top.uncle9.expo"  //添加安卓的package属性，域名倒放，有无域名无所谓	
    }
  }
}
```

```
expo build:android  打包到安装apk,ios需要开发id
```

```
1) Let Expo handle the process!		√  让Expo为您生成密钥库
2) I want to upload my own keystore! 上传自己的
```

Published完成后有个在线地址，或者登陆expo账号去下载apk，之后安卓到模拟器，或真机[官网参考](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)

### 样式

​		所有的核心组件都接受名为`style`的属性，使用了驼峰命名法，例如将`background-color`改为`backgroundColor`,可以传入一个数组——在数组中位置居后的样式对象比居前的优先级更高，这样你可以间接实现样式的继承,尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点

用法1:	`<Text style={{key:value,key:value}}>xx</Text>`

用法2:	`<Text style={[{key:value}],[{key:value}]}>xx</Text>`

用法3:	`<Text style={styles.red}>xx</Text>`

```
const styles = StyleSheet.create({
  red: {
    color: 'red',
  },
});
```

### [布局](https://reactnative.cn/docs/flexbox/) 

React Native 中使用 flexbox 规则来指定某个组件的子元素的布局,`flexDirection`的默认值是`column`而不是`row`，而`flex`也只能指定一个数字值。[布局图解](http://weibo.com/1712131295/CoRnElNkZ?ref=collection&type=comment)

#### 相对定位

React Native 中，position 默认值为 `relative`，即相对布局。

- 如果父组件没有设置 flex 值，则子组件不论是否设置 flex ，子组件都不会显示在界面上

如下示例代码中，子组件会等比例的占满屏幕

```
return (
      <View style={{}}>
        <View style={{ flex: 1, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View>
      </View >
    );
```

- 如果父组件设置了 flex 值，子组件设置了 flex 值的同时，也设置了高度值，则高度无效

如下示例代码中，子组件会等比例的占满屏幕，设置高度并不影响所占的比例

```
return (
      <View style={{
              flex: 1,
      }}>
        <View style={{ flex: 1, height: 90, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View>
      </View >
    );
```

- 如果父组件设置了 flex 值，子组件没有设置 flex 值，只设置了高度值，则高度有效

如下示例代码中，子组件在界面所占的比例受高度控制，最后一个子组件则自动占满剩余空间

```
return (
      <View style={{
              flex: 1,
              backgroundColor: 'yellow',
      }}>
        <View style={{ height: 90, backgroundColor: 'yellow' }}></View>
        <View style={{ height: 90, backgroundColor: 'skyblue' }}></View>
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View>
      </View >
    );
```

#### 绝对布局

样式设置 position: 'absolute'

- 绝对布局情况下，设置 flex 不能达到页面整屏占满的效果，需要同时设置组件的宽高，否则父组件与子组件都将无法显示

正确设置父组件的样式方式

```
return (
      <View style={{
              position: 'absolute',
              backgroundColor: 'yellow',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
      }}>
        <View style={{ flex: 1, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View>
      </View >
    );
```

- 只设置父组件的宽，设置子组件的高度有效，子组件的flex无效

如下示例代码中，只有第一个设置了高度的view会显示在界面上，而设置了flex的view不会显示

```
return (
      <View style={{
              position: 'absolute',
              backgroundColor: 'yellow',
              width: Dimensions.get('window').width,
      }}>
        <View style={{ height: 90, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
        <View style={{ flex: 1,  backgroundColor: 'lightgray' }}></View>
      </View >
    );
```

- 只设置父组件的高，则设置子组件的高度和flex均无效，父组件与子组件都无法显示

如下示例代码中，父组件与子组件都不会显示

```
return (
      <View style={{
              position: 'absolute',
              backgroundColor: 'yellow',
              height: Dimensions.get('window').height
      }}>
        <View style={{ height: 90, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
        <View style={{ flex: 1,  backgroundColor: 'lightgray' }}></View>
      </View >
    );
```

- 同时设置了父组件的宽和高的前提下，再设置子组件的高度和flex均有效

如下示例代码中，分别设置了高度和flex的view均会显示在界面上

```
return (
      <View style={{
              position: 'absolute',
              backgroundColor: 'yellow',
              width: Dimensions.get('window').width,
      }}>
        <View style={{ height: 90, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View>
      </View >
    );
```

- 父组件与子组件同时绝对布局的情况下，且设置绝对布局的子组件写在最后一个时，保持原则一样，则父组件与子组件可正常显示

如下示例代码中，子组件均能正常显示，且设置了flex的view会将剩余的屏幕占满显示，不会被绝对布局的同级子view阻挡

```
return (
      <View style={{
              position: 'absolute',
              backgroundColor: 'yellow',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
      }}>
        <View style={{ height: 90, backgroundColor: 'yellow' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
        <View style={{ position: 'absolute', width: Dimensions.get('window').width, height: 90, bottom: 90, backgroundColor: 'lightgray' }}></View>
      </View >
```

- 父组件与子组件同时绝对布局的情况下，且设置绝对布局的子组件没有写在最后一个时，保持原则一样，则绝对布局的子组件不会显示在父组件中，它会被前一个子组件覆盖

如下示例代码中，除相对布局的子组件能正常显示外，绝对布局的子组件会被同级的子view覆盖

```
return (
      <View style={{
              position: 'absolute',
              backgroundColor: 'yellow',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
      }}>
        <View style={{ height: 90, backgroundColor: 'yellow' }}></View>
        <View style={{ position: 'absolute', width: Dimensions.get('window').width, height: 90, bottom: 90, backgroundColor: 'lightgray' }}></View>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}></View>
      </View >
    );
```

> 另外，可以给子组件设置不同的flex值，如flex：2， flex： 0.5，则子组件在界面上所占的比例会随之变化。

### [文本输入](https://reactnative.cn/docs/handling-text-input/)

> 注意 react 中的 onChange 对应的是 rn 中的 onChangeText

### [触摸事件](https://reactnative.cn/docs/handling-touches/)

[**TouchableHighlight**](https://reactnative.cn/docs/touchablehighlight)按下时变暗

> [**TouchableOpacity**](https://reactnative.cn/docs/touchableopacity)降低按钮的透明度 可选

### [滚动视图](https://reactnative.cn/docs/using-a-scrollview/)

- 放置在ScrollView中的所有组件都会被渲染

### [长列表](https://reactnative.cn/docs/using-a-listview/)

- FlatList优先渲染屏幕上可见的元素
- SectionList 带有分组标签

### [网络请求](https://reactnative.cn/docs/network/)

- 不存在跨域，安全机制与网页环境有所不同
- 为了安全默认只能访问https，对http做了限制
- 建议你增加HTTPS支持，而不是关闭http限制，会把 苹果提供的安全保障也被关闭了
- 可以使用所有数据交互库，不含jq

### [平台判断](https://reactnative.cn/docs/platform-specific-code/)

针对不同平台编写不同代码的需求

- 使用[`Platform`模块](https://reactnative.cn/docs/platform-specific-code#platform模块).
- 使用[特定平台扩展名](https://reactnative.cn/docs/platform-specific-code#特定平台扩展名).
- 某些属性可能只在特定平台上有效
- ActionSheetIOS 与 DatePickerAndroid

### [组件与API](https://reactnative.cn/docs/components-and-apis/)

组件规定视图表现，api实现编程式组件操作

#### react native 组件

##### [Picker](https://reactnative.cn/docs/picker/#docsNav)

##### [图片](https://reactnative.cn/docs/images/)

- 本地图片，可获取实际宽高,require里面必须是字符
- 网络图片，获取不到宽高，要给设定尺寸
- 背景图片必须指定宽高样式

#### expo组件

##### **音频 [Audio](https://docs.expo.io/versions/latest/sdk/audio/#__next)**

##### 视频 [Video](https://docs.expo.io/versions/latest/sdk/video/#__next)

##### 相机 [Camera](https://docs.expo.io/versions/v32.0.0/sdk/camera/#__next)

### [路由](https://reactnavigation.org/zh-Hans/)

​		推荐React Navigation 提供了简单易用的跨平台导航方案，在 iOS 和 Android 上都可以进行翻页式、tab 选项卡式和抽屉式的导航布局

安装: 

```
yarn add react-navigation --save  其他都不用做
```

- navigation prop传递给每个在stack navigator中定义的路由
- this.props.navigation.navigate('Details') 无栈，添加栈
- this.props.navigation.goBack() 回退
- this.props.navigation.push() 强制添加栈
- this.props.navigation.popToTop() 后退到 第一个栈
- 跳转到新路由，老路由组件不会卸载，返回时前组件会卸载

