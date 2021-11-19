# 学习方法

- 掌握思想
- 查资料的方式
- 问问题的方式































# NODEJS

## 介绍

### 干嘛的

写后台管理程序，与之类似php  .net   java 

### 目标

数据服务，文件服务，web服务

### 优势

性能高，方便、入门难度低、大公司都在用（BAT）

###	劣势

- 服务器提供的相对较少
- 相对其他语言，能用的上的学习资料少
- 对程序员的要求高了



















### 环境安装

官网：[英文](https://nodejs.org/en/) [中文](http://nodejs.cn/) [镜像](http://npm.taobao.org/)

测试环境： `win+r->命令行(运行->cmd)->node -v`

###	版本

Vx(主).x(子).x（修正）

> 主版本:	变化了，1/3的API发生巨变 , 使用方式变化了
>
> 子版本：	API没有删减，使用方式没变化,内部实现发生了变化
>
> 修正版：什么都没变，处理一下bug
>
> V6.8.0  稳定
>
> V6.9.1 非稳定版
>
> beta 测试
>
> rc  、alpha测试稳定



















###	开发工具

IDE偏重，对机器要求高，功能齐全，

编辑器，轻便，速度快，功能后期补装插件

####	IDE

[Hbuild](https://www.dcloud.io/index.html)	[WebStorm](https://www.jetbrains.com/webstorm/)	[HbuildX](https://download.dcloud.net.cn/HBuilderX.2.5.1.20200103.full.zip) 	[Eclipse](https://github.com/palantir/eclipse-typescript)

####	编辑器

[Atom](https://atom.io/packages/atom-typescript)	[Visual Studio Code](https://code.visualstudio.com/) 	[Sublime Text](https://github.com/Microsoft/TypeScript-Sublime-Plugin) 

####	node命令行

`node 回车`































###	运行

#####	window

```javascript
a. 找到目标目录-》地址栏输入cmd-》node 文件名.js | node 文件名

b. 当前目录->右键->git bash-> node 文件名
```

#####	苹果

```
终端->cd 目录-> node 文件名.js | node 文件名
```

#####	vscode

```
新建终端->cd 目录->node 文件名.js | node 文件名 
调试->运行
```

#####	webstrom

```
terminal| run
```













##	开发注意

`nodejs` 使用的是`ECMA`语法，不可使用`DOM`，`BOM`









































##	web服务器

###	构成

- 机器：	电脑
- 数据库：mysql | sqlserver | mongoDB | oracle
  - 数据库存的是: 数字|字符
  - 磁盘（硬盘) 文件本身(图，视频,PDF)   文件服务器
- 管理程序：nodejs（管理前后端工程文件）



###	前后端交互流程

**大后端**

​	用户 - > 地址栏(http[s]请求) -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->node渲染页面->浏览器（接收页面，完成最终渲染)

**大前端**

​	用户 - > http[s]请求 -> web服务器（收到) - > nodejs处理请求(返回静态、动态)->请求数据库服务(返回结果)->nodejs(接收)->返回给前端(渲染)->浏览器（接收页面，完成最终渲染)











###	实现

引入http模块	

```
let http = require('http')
```

创建web服务   返回http对象

```
let app = http.createServer((req,res)=>{
	req 请求体  浏览器->服务器
	req.url  地址   提取地址栏数据
	req.on('data') 提取非地址栏数据 所有的http[s]都会触发end事件
	req.on('end') 
	
	res 响应  服务器->浏览器
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});响应头设置
	res.write(字符/数据<string><buffer>) 返回数据
	res.end() 结束响应 必须
})
```

监听服务器

```
app.listen(端口，[地址]，[回调])
```

> 监听成功，回调一次
>
> 端口: 1-65535	1024以下系统占用 
>
> 虚拟地址localhost  真实域名xx.duapp.com

> 更新后,需要每次服务器自动重启
>
> 推荐命令行工具：`supervisor` `nodemon`	
>
> 安装方式: `npm install supervisor -g`	





















##	fs模块

磁盘操作，文件操作

####	读取

```
fs.readFile('文件路径',[编码方式],(err,data)=>{})
```

[^err ]: err 错误 ,null没有错误
[^data]: 数据,buffer流

```
变量 = fs.readFileSync('文件路径') 
```

> 处理错误
>
> try{要排错的代码}catch(e){}

#### 更名

```
fs.renameSync('改前','改后');
```

####	删除

```
fs.unlinkSync('文件路径')
```

























##	静态资源托管

###	什么是静态资源

`xx.css`	`xx.html`	`xx.js`	`xx.图片`	`xx.json`	`xx.字体`	...

### 前端资源请求

```html
<a href=".."></a>
<img src="..."/>
```

```javascript
location.href="..."
```

```css
body{
    background:url(....)
}
```

### 后端资源读取

```
fs.readFile(文件名,[编码方式],回调(err,data));
```











##	接口实现

###	前端

表单：get/post/put/delete/...

js： ajax/jsonp

###	后端

处理方式：`http[s]`

​	address:	`req.url`  抓取 get请求的数据  切字符 	| url模块

​	!address:   `req.on('data',(chunk)=>{CHUNK==每次收到的数据buffer})`

​						`req.on('end',()=>{	接收完毕 切字符 querystring })`

> postman 一个不用写前端，就可以发出各种请求的软件 [下载](https://www.getpostman.com/downloads/)



















##	url模块

###	作用

处理 url型的字符串

###	用法

```
url.parse(str,true)  返回 对象	true处理query为对象
```

> str -> obj  返回 对象  true 
> 		protocol: 'http:',	协议
> 		slashes: true,	双斜杠
> 		auth: null,   作者
> 		host: 'localhost:8002',  主机
> 		port: '8002',	端口
> 		hostname: 'localhost',  baidu
> 		hash: '#title',	哈希（锚)
> 		search: '?username=sdfsdf&content=234234',	查询字符串
> 		query: 'username=sdfsdf&content=234234',	数据
> 		pathname: '/aaa',	文件路径
> 		path: '/aaa?username=sdfsdf&content=234234',	文件路径
> 		href: 'http://localhost:8002/aaa?username=sdfsdf&content=234234#title'

```
url.format(obj) 返回字符
```

> obj -> str   返回str







































##	querystring 模块

###	作用

处理查询字符串 如：`?key=value&key2=value2`

###	用法

```
querystring.parse(str) 返回对象
```

```
querystring.stringify(obj) 返回字符串
```



**作业**

把jquery项目的node服务器搭建起来，保证静态资源可以读取，实现部分接口

















## 模块化	commonJS

### 介绍

是主要为了JS在后端的表现制定，commonJS 是个规范 nodejs / webpack 是一个实现

> ECMA 是个规范  js / as 实现了他
>
> 其他模块化规范：seajs.js / require.js   CMD/AMD/UMD   es5

### 作用

是变量具有文件作用域，不污染全局变量

### 系统模块

`http`	`fs`	`querystring`	`url`	





















### 输入

```javascript
require('模块名')
require('模块名').xx  按需引用
```

> 不指定路径：先找系统模块-> 再从项目环境找node_modules|bower_components (依赖模块)->not found
>
> 指定路径 : 找指定路径 -> not found
>
> 支持任何类型

### 输出

```js
exports.自定义属性 = 值 | any
```

> 批量输出 都是属性
>
> 可输出多次

```javascript
module.exports = 值 | any		
```

> 只能输出一次

### 注意

commonJS 是 nodejs 默认模块管理方式,不支持es6的模块化管理方式，但支持所有es6+语法































## NPM

### 作用

帮助你安装模块（包），自动安装依赖，管理包（增，删，更新，项目所有包)

> 类似：	[bower](http://bower.io)		[yarn](https://yarn.bootcss.com/)

### 安装到全局环境

- 安装到电脑系统环境下
- 使用时在任何位置都可以使用
- 被全局安装的通常是：命令行工具，脚手架

```
npm i 包名 -g								安装
npm uninstall 包名 -g	 			卸载
```

[^g]: global

















### 安装到项目环境

只能在当前目录使用，需要使用npm代运行

#### 初始化项目环境

```
npm init
```

> 初始化npm管理文件package.json
>
> package-lock.json 文件用来固化依赖

```j
{
  "name": "npm",	//项目名称
  "version": "0.0.1",	//版本
  "description": "test and play",	//描述
  "main": "index.js", //入口文件
  "dependencies": {  //项目依赖  上线也要用
    "jquery": "^3.2.1"
  },
  "devDependencies": { //开发依赖 上线就不用
    "animate.css": "^3.5.2"
  },
  "scripts": {	//命令行
    "test": "命令行",
  },
  "repository": {	//仓库信息
    "type": "git",
    "url": "git+https://github.com/alexwa9.github.io/2017-8-28.git"
  },
  "keywords": [  //关键词
    "test",'xx','oo'
  ],
  "author": "wan9",
  "license": "ISC",	//认证
  "bugs": {
    "url": "https://github.com/alexwa9.github.io/2017-8-28/issues"//问题提交
  },
  "homepage": "https://github.com/alexwa9.github.io/2017-8-28#readme"//首页
}
```













#### 项目依赖

只能在当前项目下使用，上线了，也需要这个依赖  `--save`

```
//安装
npm i 包名 --save
npm install 包名 -S
npm install 包名@x.x.x -S

//卸载
npm uninstall 包名 --save
npm uninstall 包名 -S
```























#### 开发依赖

只能在当前项目下使用	，上线了，依赖不需要了 `--save-dev`

```
npm install 包名 --save-dev
npm install 包名 -D
```































### 查看包

```
npm list  列出所有已装包
npm outdated 版本对比(安装过得包)
npm info 包名 查看当前包概要信息 
npm view 包名 versions 查看包历史版本列表
```

### 安装所有依赖

```	
npm install 
```

> 安装package.json里面指定的所有包

### 版本约束

```
^x.x.x   约束主版本，后续找最新
~x.x.x   保持前两位不变，后续找最新
*		 装最新
x.x.x 	 定死了一个版本
```















### 选择源

```
npm install nrm -g     安装选择源的工具包
nrm ls 查看所有源
nrm test 测试所有源
nrm use 切换源名
```

### 安装卡顿时

```
ctrl + c -> npm uninstall 包名  -> npm cache 清除缓存 -> 换4g网络 -> npm install 包名
```























### 发布包

- 官网 [注册]()	
- 登录
  - `npm login` 登录
  - 输入 user/password/email
- 创建包
  - `npm init -y`
  - 创建入口index.js
  - 编写，输出
- 发布
  -  `npm publish`
- 迭代
  - 修改版本号
  - `npm publish`
- 删除
  - `npm unpublish`

> 包的发布、迭代、删除，需要在包目录下进行
>
> 删除包，有时需要发送邮件



















### 扩展

```
peerDependencies 发布依赖
optionalDependencies 可选依赖
bundledDependencies 捆绑依赖
contributors 为你的包装做出贡献的人。贡献者是一群人。
files 项目中包含的文件。您可以指定单个文件，整个目录或使用通配符来包含符合特定条件的文件
```



























## YARN

[官网](https://classic.yarnpkg.com/)

### 安装

[去官网安装](https://classic.yarnpkg.com/zh-Hans/)

> 注意：为省事，不要用npm i yarn -g，去安装yarn，而是去下载压缩包，保证注册表和环境变量的硬写入，后期通过yarn安装全局包时方便

### 使用

**初始化一个新项目**

```
yarn init
```

**添加依赖包**

```
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

**将依赖项添加到不同依赖项类别中**

分别添加到 ``dependencies``,`devDependencies`、`peerDependencies` 和 `optionalDependencies` 类别中：

```
yarn add [package] --save   | -S 
yarn add [package] --dev    | -D 
yarn add [package] --peer
yarn add [package] --optional
```

**升级依赖包**

```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

**移除依赖包**

```
yarn remove [package]
```

**安装项目的全部依赖**

```
yarn
```

或者

```
yarn install
```

**安装到全局**

```js
yarn global add [package]				//global的位置测试不能变
yarn global remove [package]
```















## BOWER

[官网](https://bower.io/)

### 安装bower

```bash
npm install -g bower
```

### 安装包到全局环境

```
bower i 包名 -g		安装
bower uninstall 包名 -g	 卸载
```

### 安装包到项目环境

#### 初始化项目环境

```
bower init
```

> bower.json  第三方包管理配置文件

#### 项目依赖

只能在当前项目下使用，上线了，也需要这个依赖  `--save`

```
//安装
同npm
bower install 包名#x.x.x -S 指定版本使用#

//卸载
同npm
```

#### 开发依赖

只能在当前项目下使用	，上线了，依赖不需要了 `--save-dev`

```
同npm
```

































## EXPRESS

nodejs库，不用基础做起，工作简单化，点击进入[官网](http://www.expressjs.com.cn/)，类似的还有 [koa](https://koa.bootcss.com/)

### 特点

二次封装，非侵入式，增强形

### 搭建web服务

```js
let express=require('express')
let server=express()
let server.listen(端口,地址,回调)
```

### 静态资源托管

```js
server.use(express.static('./www'));
```



































### 接口响应

支持各种请求姿势：get、post、put、delete...

```js
server.请求姿势API(接口名称,处理函数)
server.get(url,(req,res,next)=>{})
server.post(url,(req,res,next)=>{})
...
```

#### req	请求体

request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性

```js
req.query //获取地址栏的数据
req.body //获取非地址栏的数据  依赖中间件 

req.params //获取动态接口名
req.method //获取前端提交方式
```

> req.body依赖中间件
>
> 中间件使用:body-parser  
>
> 1. npm install body-parser 
> 2.  let bodyParser = require('body-parser') 
> 3.  app.use(bodyParser ())

#### res	响应体

response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据

```js
res.send(any) //对等 res.write + end
res.end(string|buffer)
res.json(json) //返回json
res.status(404).send({error:1,msg:"Sorry can't find that!"}) //返回一个404

res.jsonp(响应数据) //调用请求时的回调函数并传递响应数据
res.sendFile(path.resolve('public/error.html'))//渲染纯 HTML 文件
```



































#### jsonp响应

```js
server.set('jsonp callback name','cb')//默认callback
server.get('/jsonp接口',(req,res,next)=>res.jsonp(数据))		
```

#### 处理一部分接口

共有业务逻辑,在一起给处理了

```js
server.all('/admin/*',(req,res,next)=>{}))
```

> all匹配全路径 处理所有HTTP 
>
> 需要next 延续后续



































### use

安装中间件、路由、接受一个函数，

```
server.use([地址],中间件|路由|函数体)
```

### 中间件

middleware， 处理自定义业务，只处理请求到结束响应的中间部分

**举例**

```js
npm i body-parser -S //安装包
let bodyParser=require('body-parser')//引入中间件
server.use(bodyParser())//安装中间件
```

> body-parser 使用方式，实时查询 [npm](http://npmjs.com)，可获得最新

### 后端跳转

```js
res.redirect(url)      指向一个接口
```

































### 扩展

#### req

- req.app：当callback为外部文件时，用req.app访问express的实例
- req.baseUrl：获取路由当前安装的URL路径
- req.cookies：Cookies
- req.fresh / req.stale：判断请求是否还「新鲜」
- req.hostname / req.ip：获取主机名和IP地址
- req.originalUrl：获取原始请求URL
- req.path：获取请求路径
- req.protocol：获取协议类型
- req.route：获取当前匹配的路由
- req.subdomains：获取子域名
- req.accepts()：检查可接受的请求的文档类型
- req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
- req.get()：获取指定的HTTP请求头
- req.is()：判断请求头Content-Type的MIME类型

#### res

- res.app：同req.app一样
- res.append()：追加指定HTTP头
- res.set()在res.append()后将重置之前设置的头
- res.cookie(name，value [，option])：设置Cookie
- opition: domain / expires / httpOnly / maxAge / path / secure / signed
- res.clearCookie()：清除Cookie
- res.download()：传送指定路径的文件
- res.get()：返回指定的HTTP头
- res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
- res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
- res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
- res.set()：设置HTTP头，传入object可以一次设置多个头
- res.status()：设置HTTP状态码
- res.type()：设置Content-Type的MIME类型

**作业**

把jquery项目利用express搭建的node服务器来管理，保证资源托管到位，部分接口实现



































## 身份验证

HTTP 是一种没有状态的协议，也就是它并不知道是谁访问。客户端用户名密码通过了身份验证，不过下回这个客户端再发送请求时候，还得再验证

### session

#### 思想

1、客户端用户名跟密码请求登录
		2、服务端收到请求，去库验证用户名与密码
		3、验证成功后，服务端种一个cookie或发一个字符到客户端，同时服务器保留一份session
		4、客户端收到 响应 以后可以把收到的字符存到cookie
		5、客户端每次向服务端请求资源的cookie会自动携带
		6、服务端收到请求，然后去验证cookie和session，如果验证成功，就向客户端返回请求的库数据

> Session存储位置: 服务器内存，磁盘，或者数据库里
>
> Session存储内容: id,存储时间，用户名等说明一下登录的用户是谁
>
> 客户端携带 ： cookie自动带，localStorage手动带































#### 如何保存信息给浏览器

**前端种：** 

cookie/localstorage

**后端种:**   

服务器给浏览器种cookie:  	cookie-parser

服务器给浏览器种cookie的同时在服务器上生成seesion:  cookie-session































#### cookie-session

**安装引入**

```js
let cookieSession = require('cookie-session')
```

**配置中间件**

```js
app.use(cookieSession({
	name:'保存到服务器的session的名字',
  keys:[必传参数，代表加密层级],
  maxAge:1000 //保留cookie的时间
}))
```

**种cookie,备份session**

```js
req.session.key=value
```

**读cookie对比session**

```js
req.session.key  返回true
```

**删除cokkie、session**

```js
delete req.session.key 
req.session.key = undefined
```



































### token

#### 思想

在服务端不需要存储用户的登录记录，全部发给客户端有客户端自己存(cookie,local)

1、客户端使用用户名跟密码请求登录
		2、服务端收到请求，去验证用户名与密码
		3、验证成功后，服务端会签发一个 Token（加了密的字符串），再把这个 Token 发送给客户端
		4、客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
		5、客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
		6、服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据





































#### 实现

**jsonwebtoken**的安装引入

```js
let jwt = require('jsonwebtoken')
```

**生成签名**

```js
let token = jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

[^payload]: json 还有username,userid
[^secretOrPrivateKey]: 加密规则，字符串，或者私钥path模块
[^options]: 可选配置项
[^callback]: 成功回调, 可选 返回制作后的token,也可同步返回

**校验token**

```js
jwt.verify(token, secretOrPublicKey, [options, callback])
```

[^token]: 制作后的token
[^secretOrPublicKey]: 解密规则，字符串，或者公钥
[^callback：]: 回调 err 错误信息 decode 成功后的信息

[^options]: expiresIn 过期时间

**token删除**

有客户端，负责删除







































### session vs token

|                    | session | token  |
| ------------------ | ------- | ------ |
| 服务端保存用户信息 | √       | ×      |
| 避免CSRF攻击       | ×       | √      |
| 安装性             | 一般    | 高     |
| 多服务器粘性问题   | 存在    | 不存在 |

> 多服务器粘性问题
>
> 当在应用中进行 session的读，写或者删除操作时，会有一个文件操作发生在操作系统的temp 文件夹下，至少在第一次时。假设有多台服务器并且 session 在第一台服务上创建。当你再次发送请求并且这个请求落在另一台服务器上，session 信息并不存在并且会获得一个“未认证”的响应。我知道，你可以通过一个粘性 session 解决这个问题。然而，在基于 token 的认证中，这个问题很自然就被解决了。没有粘性 session 的问题，因为在每个发送到服务器的请求中这个请求的 token 都会被拦截















































## 文件上传

**思想**

前端表单->后端接收到文件本身->保存到服务器上->给数据库记录文件一些信息->库返回给nodejs相关信息->nodejs返回给前端

> 前端: <input type=file enctype="multipart/form-data" name="fieldname"

**实现**

multer->文件名会随机->fs模块改名->path系统模块解析磁盘路径

> 后端：multer 接受 form-data编码数据 













































### path系统模块

操作系统磁盘路径

**编码**

windows： `c:\\user\\admin\\a.jpg`

mac:	 `~/desktop/1901`

**UI呈现**

windows: 	`c:\user\admin`
		mac: 	`~/desktop/1901`

**API**

磁盘路径解析 **parse**

```js
path.parse('c:\\wamp\\xx.png') // string -> object

//返回
{
   root: 'c:\\', 盘符
   dir: 'c:\\wamp', 目录
   base: 'xx.png',  文件名
   ext: '.png', 扩展名
   name: 'xx' 	文件，不含扩展名
}
```

片段合并**join**

```js
path.join('磁盘路径1','磁盘路径2'，'磁盘路径n')
```

> __dirname 魔术变量  返回当前文件所在的磁盘路径

片段合并 **resolve**

```js
path.resolve('磁盘路径1','磁盘路径n')
```

> 合并磁盘片段,右到左找根，左到右拼接，没有找到根，以当前文件路径为根















































### multer中间件

multer 接受 form-data编码数据,所有要求前端携带时注意一下，如：`<input type=file enctype="multipart/form-data" name="fieldname"`,

**使用**

```js
//1 引入
let multer  = require('multer');
//2 实例化  
let objMulter = multer({ dest: './upload' }); //dest: 指定 保存位置（存到服务器)
//安装中间件， 
app.use(objMulter.any());  //允许上传什么类型文件,any 代表任何类型 
```

中间件扩展了req请求体 `req.files`

```js
app.get('/reg',(req,res)=>{
  req.files
})
```

> fieldname: 表单name名
> 		originalname: 上传的文件名
> 		encoding： 编码方式
> 		mimetype: 文件类型
> 		buffer: 文件本身
> 		size：尺寸
> 		destination: 保存路径
> 		filename： 保存后的文件名  不含后缀
> 		path：	保存磁盘路径+保存后的文件名 不含后缀





































## 后端渲染

通常根据后端返回的json数据，然后来生成html被称为前端渲染，而后端渲染是后端把json与html结合渲染好后返回到浏览器，没前端什么事了

### 模板引擎

无论前后谁来渲染页面，都会用到模板引擎，前端渲染页面实际上是**操作dom**，后端渲染页面是**把数据和html字符拼接**后丢给浏览器

| 引擎                  | 前端 | 后端 |
| --------------------- | ---- | ---- |
| angularJs             | √    | ×    |
| vue/mustach           | √    | √    |
| react                 | √    | √    |
| angularTs/mustach     | √    | √    |
| jade/pug              | ×    | √    |
| ejs                   | ×    | √    |
| jquery + art-template | √    | ×    |
| handlerbars           | √    | ×    |



































### jade

**原理**：fs抓取前端静态页面 + jade + 数据  	->	返回send(data)	 -> 	浏览器

**特点**：侵入式，强依赖

**使用**

```js
let jade = require('jade')
let html = jade.renderFile('jade模板文件'，{数据}，{pretty:true});	//返回字符
```

**jade模板文件语法**

父子要缩进
		属性：  标签(key=value,key2=value)
		内容:	标签 内容

[其他扩展](http://www.nooong.com/docs/jade_chinese.htm)













































### ejs

**原理**：fs抓取前端静态页面 + ejs + 数据  	->	返回send(data)	 -> 	浏览器

**特点**：非侵入式，温和，弱依赖

**使用**

```js
let ejs = require('ejs')
ejs.renderFile('ejs模板文件',{要合并到html数据},回调(err,data))
```

> err：错误，null代表没有错误
>
> data:	渲染后的字符|流		
>
> ejs模板 ：	后缀名为ejs的html文件

**ejs模板文件语法**

- ejs 结构就是html
- 输出:	<%= 数据名|属性名|变量名 + 表达式 %>
- 语句：	<% 语句 %>  需要被<%  %>  包裹
- 非转义输出:	<%- 数据名|变量名  + 表达式 %>
- 载入公共：<%- include('./hd.ejs',{数据}) %>

[其他扩展](https://www.npmjs.com/package/ejs)





































### 多引擎管理

把多个模板引擎用在一个后端应用中，统一他们的用法，绑定到res、req身上

**安装+配置** 

```js
npm i consolidate ejs jade -S
```

> 注意: ejs jade 等多个引擎需要安装，但无需引入

app.js

```js
//中间件配置
app.set('view.engine','html');	//模板最终	输出类型设置
app.set('views','./views');		//引擎模板目录设置

app.engine('html',consolidate.ejs);	//输出与引擎匹配
app.engine('css',consolidate.jade);	//输出与引擎匹配

//渲染
app.get('xxx',(req,res)=>{
  res.render('模板文件名',{数据}) //整合页面和数据，完成渲染，发往浏览器,并结束响应
})
```







































## 路由

告诉你去哪，对于前端，主要是导向告诉浏览器应该去哪，对于后端，可以理解为一个**子服务**，一个路由就是一个小的服务(server/app)，处理一个接口

**配置和使用**

/routes/xx.js

```js
// 1. 创建路由
let router = express.Router(); 

//2 路由处理响应
router.响应API(地址, 处理函数)

//3. 导出路由
module.exports = router;
```

/app.js主服务

```js
//安装路由
app.use('地址',router); 
```

/routes/xx.js

```js
//字路由里安装路由 嵌套
router.use('地址',子router) 

//截获当前路由下的部分公共业务
router.all('*',当前router路由下的验证工作) //需要next 延续
```

> 主路由的地址对应子路由的根 
>
> 如：app.js :`/api/user`  ~~ user.js: `/`    
>
> 如:   app.js: ` /api/user/add` ~~ user.js: `/add`

**作业**

实现jquery项目当中，自动登录，注册时头像的上传，接口逻辑利用路由实现





































## 数据库

### mysql

关系数据库，二维表，不存在子表

**sql语句**

**建库**

```mysql
CREATE DATABASE  `2017-12-6` DEFAULT CHARACTER SET armscii8 COLLATE armscii8_general_ci;
```

**建表**

```mysql
CREATE TABLE  `2020-12-6`.`user` (
					`name` VARCHAR( 32 ) NOT NULL ,
					`age` INT( 3 ) NOT NULL ,
					`address` VARCHAR( 128 ) NOT NULL
					) ENGINE = INNODB
```

**增**

```mysql
INSERT INTO 表 (字段列表) VALUES(值列表)
INSERT INTO user (name,age,address) VALUES('苏菲',38,'外滩18号')
```

**删**

```mysql
DELETE FROM 表 WHERE 字段名=值
DELETE FROM user WHERE name='alex'
```

**改**

```mysql
UPDATE 表 SET 字段名=值 WHERE 字段名=值
UPDATE user set name='sufei' WHERE name='苏菲'
```

**查**

```mysql
SELECT ? FROM 表
SELECT * FROM user  查所有
```



















































### node + mysql客户端

安装+引入

```js
npm install mysql -S
var mysql = require('mysql');
```

创建库链接

```js
var connection = mysql.createConnection({
  host     : 'localhost',//主机名
  user     : 'me',
  password : 'secret',
  database : 'my_db'//库名
});
 
connection.connect();
```

表操作

```js
connection.query('SQL语句', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results==  查询array||  增删改object);
});
```

关闭库

```js
connection.end();
```

































### mongodb

非关系型数据库，又叫nosql，缓存型，使用场景多是解决大规模数据集合多重数据种类

1. [下载](https://www.mongodb.com/download-center)	[安装帮助](https://www.cnblogs.com/keyi/p/10984514.html)

2. 配置数据文件存储位置：

找到安装目录C:\Program Files\MongoDB\Server\4.0\bin  -> cmd回车-> mongod --dbpath c:\data\db

> data和db目录要手动创建

3. 服务端启动: **可选**

找到安装目录C:\Program Files\MongoDB\Server\4.0\bin  -> cmd回车-> mongod 回车

> 一般开启会默认启动

4. 客户端启动:

找到安装目录C:\Program Files\MongoDB\Server\4.0\bin  -> cmd回车-> mongo 回车

5. 环境变量 **可选**

为了在任意盘符下去都可以启动  mongod服务端|mongo客户端，把安装目录添加到环境变量

**mysql vs mongodb**

| mysql                | mongoDb                        |              |
| -------------------- | ------------------------------ | ------------ |
| database(库)         | database(库)                   |              |
| table(表)            | collection(集合)               |              |
| row(一条数据)        | document(文档)                 |              |
| column(字段)         | field(区域)                    |              |
| 二维表，每次存到磁盘 | json，存在缓存，关闭时存到磁盘 | **存储方式** |

mongodb**命令行操作**	 声明式 | obj.api()

**库操作**

```js
查: show dbs
  	db 查看当前库
建:	use 库名	   没有建，有就切换
```

**集合(表)操作**

```js
建：db.createCollection('表名',{配置})
  //配置：{size:文件大小,capped:true,max:条数|文档数} capped定量
  //db.表(集合).isCapped() 返回 true/false 是否是定量
查：show collections / db.getCollectionNames()
删：db.表|集合.drop()
```

**文档(row)操作**

**增**

```js
db.集合.save({}) //添加一条
db.集合.insert({})  //添加一条
db.集合.insertOne({}) //添加一条

db.集合.save([{},{}]) //多条
db.集合.insert([{},{}]) //多条
//insert  不会替换相同ID	save会
```

**删**

```js
db.集合.deleteOne({要删数据条件描述}) //一条
db.集合.remove({},true)  //一条

db.集合.remove({要删数据条件描述}) //多条
db.集合.remove({}) //清空表
```

**改**

```js
db.集合.update({查询条件},{替换条件},[插入false],[全替换false])
```

> 查询条件
>
> {age:22}		age == 22
> 		{age:{$gt:22}}	age > 22
> 		{age:{$lt:22}}    age < 22
> 		{age:{$gte:22}}	age>=22
> 		{age:{$lte:22}}	age<=22
> 		{age:{$lte:122,$gte:22}}	age<=122 && age>=22
> 		{$or:[{age:22},{age:122}]}	22 or 122
> 		{key:value,key2,value2}  value && value2
> 		{name:/正则/}
>
> 替换条件
>
> {$set:{数据},$inc:{age:-1}}

**查**

```js
所有：db.集合.find(条件)
条数: db.集合.find().count()

db.集合.find({条件},{指定要显示列区域})
```

> 指定要显示列区域
>
> username:1 显示这个区域，其他不显示
>
> username:0 不显示这个区域，其他显示
>
> _id 是默认显示

**排**

```js
db.集合.find().sort({key:1,key2:-1}) //升
db.集合.find().sort({key:-1})	//降
```

**限定**

```js
db.集合.find().limit(number)  //限定
db.集合.find().skip(number)	//跳过
db.集合.findOne(条件)//找第一个
db.集合.find().limit(1)  //查询第一条
```























































### node + mongodb客户端

安装+引入

```js
npm install mongodb -S
var mysql = require('mongodb');
```

实例化并连接

```js
let mongoCt = mongodb.MongoClient;
mongoCt.connect('协议://地址:端口',回调(err,client)) //err 错误 client链接后的客户端
```

链接库和集合

```js
let db = client.db('库名')
let user = db.collection('集合名');
```

集合操作

```js
//user.API()  集合操作 	返回 对象

//增
	insertOne(对象数据,(err,res)=>{})  //res = 对象  
	insertMany(arr数据,(err,res)=>{}) //res = 对象  
    //res.result.n 结果  ok 状态
    //res.ops内容  数组
    //result.insertedId 插入后的id

//删:
  deleteOne({条件},(err,result)=>{})

//改:
  updateOne({条件},{更新后},(err,res)=>{})
  updateMany({条件},{更新后},(err,res)=>{})
  updateMany({条件},{更新后},{配置},(err,res)=>{})
    //配置: upsert:true 插入	projection:true 全局替换
//查:
  user.find({条件},{skip:1,limit:1,projection:{key:1}},(err,result)=>{result=对象})
  user.find({条件},{projection:{key:0}}).toArray((err,result)=>{reulst==arr})
  user.countDocuments((err,num)=>{num返回数量})

//排
  user.find(..).sort({key:-1}).toArray..
  user.find({},{projection:{},sort:{key:-1}}).toArray..
```

关闭库

```js
client.close()
```























































### node  +  mongoose

一款mongodb客户端 [官网](https://mongoosejs.com/) 	[中文](http://www.mongoosejs.net/)

### 可视化客户端

> * [Robo 3T](https://robomongo.org/)
> * [Studio3t](https://studio3t.com/download-thank-you/?OS=win64)





































































## Express生成器

应用程序生成器、脚手架 、命令行工具、自动搭建项目环境的，无需手动

**安装**

```js
npm install express-generator -g   
```

**验证**

```js
express -h
```

**生成环境**

```js
express -e 目录 | . 
	// . 当前目录创建 
	//-e 需要ejs模板引擎
	//express -f  强制在非空目录下创建
cd 目录
npm install 		//安装依赖包
npm start    
node ./bin/www
```

[扩展](http://www.expressjs.com.cn/starter/generator.html)











































## 项目

### 定义数据字典

也就是数据库设计，有了数据结构，后端才知道如何存储，前端才知道如何渲染，不成文的规定，数据结构有前端说了算，请求姿势（api分格）后端说了算，最终老大说了算

**数据结构**

```json
banner：	[
    { 
      "_id" : xx, 
      "title" : "1", 
      "sub_title" : "1", 
      "banner" : "xxxx", 
      "time":234234,
      "detail" : { 
        "auth" : "", 
        "content" : "<p>xxx<p>", 
        "icon" : "/upload/banner/9d4083b4f1d28a6c0fb4c463526790eb.jpg" 
      },
    }
  ]
product详情: 
  { 
    "_id" : xx, 
    "title" : "1_", 
    "des" : "2", 
    "time":234234,
    "detail" : { 
      "auth" : "4", 
      "content" :"<p>3</p>", 
      "icon" : "/upload/user/xxx.jpg" 
    } 
  }
user:	
  { 
    "_id" : xx, 
    "username" : "alex", 
    "password" : "alex123", 
    "follow" : 100, 
    "fans" : 200, 
    "nikename" : "九叔_", 
    "icon" : "/upload/968a3b7218ee744931276a64c9b7ea01.png", 
    "time" : 1551620448550 
  }
super:
  { 
    "_id" : xx, 
    "username" : "admin", 
    "password" : "admin123", 
    "icon" : "/img/avatar-5.jpg" 
  }
```

**请求方式  RESTful API**

```js
增 POST /user  ！address中包含数据
删 DELETE /user/:id | user?id=1 根据ID删除用户信息
改 PUT|PATCH /user ！address中包含数据 PUT覆盖修改 PATCH局部修改
查 GET /user /user/1 | user?id=1 
	 GET  根据用户id查询用户数据 没有id查询所有 /1 返对象 id=1 返回数组>对象
```

```js
分页	_page 第几页， _limit一页多少条
  GET /user?_page=7  不传递默认0
  GET /user?_page=7&_limit=20 不传递默认10条
排序 _sort设定排序的字段 _order设定排序的方式（默认升序）
  GET /user?_sort=views&_order=asc
  GET /user/1/comments?_sort=votes&_order=asc
  GET /user?_sort=title,views&_order=desc,asc 	多个字段排序
任意切片数据 _start 开始不包含  _end 结束包含
  GET /users?_start=20&_end=30
  GET /user/1/comments?_start=20&_end=30
  GET /user/1/comments?_start=20&_limit=10
全文检索	GET /user?q=九哥
```









































































### 素材准备

用户端，管理端相关的html模板



























































### 搭建开发环境

引入各种包、各种中间件、做好目录规划

```w
bin  |-
     www 启动文件
utils|- 全局公共
  |- douban|mgd|mysql
config 全局配置
  |- global (_page,_limit,q,_sort...)
  |- server (local,http,https)
public 资源托管
  |-admin 管理端
  |-template 用户端
  |-upload
    |- banner|product|user
    |- product
      |- home|follow|column
routes 子服务，路由
  admin 管理端
    |- feedback
      |- success|error
    |- product
      |- add|del|check
    |- banner
      |- add|del|check
    |- user
      |- add|del|check
    |- home| product|banner|user
    |- islogin | login | reg | logout
  api 用户端
    |- product (home/follow/column)
    |- banner
    |- user 
    |- login
    |- reg
    |- logout
  proxy 代理
  	|- douban
  	|- ....
views 管理端模板 ejs 
  |- feedback
      |- success|error|app_error
  |- ... 结构同 admin 管理端
  |- common
    |- header|footer|slider|crumb|toolbar|paging
```





















































### 用户端API

**用户密码入库时加密**

```js
let bcrypt = require('bcrypt')

加密： var hash = bcrypt.hashSync(用户传过来的明文密码, 加盐数); 

校验:  bcrypt.compareSync(用户传过来的明文密码, hash); // true|false
```

**短信验证**

1. 开通短信服务

   1. 登录阿里云账号->[进入](https://www.aliyun.com/?utm_content=se_1003106097)
      1. 木有账号，购买阿里云服务器 [学生特惠](https://promotion.aliyun.com/ntms/act/campus2018.html?spm=5176.230344.1224685.2.3b84443e9LLgUu) 认准**服务器ECS**
      2. 木有账号，购买，[24+特惠](https://promotion.aliyun.com/ntms/act/qwbk.html?spm=5176.8112568.420890.1.67ae9ed5edEDHe) 
      3. 买服务器，服务器系统选择CentOs

2. 设置签名管理

   1. 添加 签名、模板 [进入](https://dysms.console.aliyun.com/dysms.htm?spm=a2c4g.11186623.2.11.65394c072r02VA#/domestic/text/template)
   2. 冲1块钱，签名是收费的

3. 申成短信服务器接口的node代码

   1. [进入](https://api.aliyun.com/?spm=a2c4g.11186623.2.14.21a15e3cN95oci#/?product=Dysmsapi&api=SendSms&params={%22RegionId%22:%22default%22,%22PhoneNumbers%22:%2218616902220%22,%22TemplateCode%22:%22SMS_180345610%22}&tab=DEMO&lang=NODEJS)

   2. 

      					PhoneNumbers： 电话
       				SignName： 签名
       	      TemplateCode： 模板id
       	      accessKeyId： 阿里云账号->accessKey管理
       	      accessKeySecret： 阿里云账号->accessKey管理
         					



















































### 管理端API

**登录注销**

```js
登录接口：/admin/login/submit

实现
var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.get('/', function(req, res, next) {
  res.render('login',{});
});
router.post('/submit', function(req, res, next) {
  let {username,password} = req.body;

  mgdb(
    {collection:'admin'},
    ({collection,client})=>{
      collection.find(
        {username,password},
        {
          projection:{_id:0}
        }
      ).toArray((err,result)=>{
        if(!err && result.length>0){
          //种cookie , 留session
          req.session['username']=result[0].username;
          req.session['icon']=result[0].icon;

          res.redirect('/admin/home');
        }else{
          // res.redirect(跳转地址==string)
          res.redirect('/admin/error?msg=登录失败,用户或者密码有误')
        }
      })
    }
  )


});
module.exports = router;

//======================================

注销接口：/admin/reg

实现
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // req.session=null;
  // req.session.username=undefined
  delete req.session.username;//删除session 混淆 cookie
  delete req.session.icon;

  res.redirect('/admin/login');
});

module.exports = router;

===============================
  
自动登录
app.all('/admin/*',require('./routes/admin/islogin'))

islogin

module.exports=(req,res,next)=>{
  if(!req.session['username']){
    res.redirect('/admin/login')
  }else{
    //处理公共参数
    let start = req.query.start ? req.query.start - 1 : require('../../config/global').page_start - 1;
    let count = req.query.count ? req.query.count - 0 : require('../../config/global').page_num - 0;
    let q = req.query.q ? req.query.q : require('../../config/global').q;
    let rule = req.query.rule ? req.query.rule : require('../../config/global').rule;
    let _id = req.query._id;
    let dataName = req.query.dataName;
    let page_header = dataName;
    let active = dataName;

    res.params = {start,count,q,rule,dataName,page_header,active,_id}
    res.user_session={username:req.session.username,icon:req.session.icon}
    next();//交给app.use后续响应处理
  }
};

```

**添加**

```js
接口: /admin/product/add?dataName=xx

实现

var express = require('express');
var router = express.Router();
var pathLib = require('path')
var uploadUrl = require('../../../config/global').upload.product
var fs = require('fs');
var mgdb = require('../../../common/mgdb')

router.get('/', function(req, res, next) {

  //1.必传参数
  let dataName = req.query.dataName;
  if(!dataName){
    res.redirect('/admin/error?msg=dataName为必传参数')
    return;
  }

  //公共数据 start=1|q=''|rule=''|page_header|dataName|user_session
  let common_data={
    ...res.user_session,
    ...res.params,
    page_header:dataName+'添加',
  }

  res.render('product/add',common_data);
});

router.post('/submit', function(req, res, next) {

  //1.必传参数
  let dataName = req.body.dataName;
  if(!dataName){
    console.log(1)
    res.send('/admin/error?msg=dataName为必传参数')
    return;
  }

  //2.整理公共数据|库数据
  let {title,content,des,auth} = req.body;
  let time = Date.now();//添加时间
  
  //multer拆出上传图片,需要解决没有上传头像
  let auth_icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  
  if(auth_icon){
    fs.renameSync(
      req.files[0].path,
      req.files[0].path+pathLib.parse(req.files[0].originalname).ext
    )
  }else{
    auth_icon = '/upload/noimage.png';
  }


  //3.写库 + 跳转

  mgdb({
    collection:dataName
  },({collection,client})=>{
    collection.insertOne({
      title,des,time,detail:{auth,content,auth_icon}
    },(err,result)=>{
      if(!err && result.result.n){
        let io=require('../../../bin/www');
        io.emit('update_product', {data:result.ops[0]})

        res.send('/admin/product?dataName='+dataName+'&start=1')
      }else{
        res.send('/admin/error?msg=集合操作错误')
      }
      client.close();
    })
  })

});

module.exports = router;

```

> **富文本框使用**
>
> 注意jq库冲突： 要使用富文本框提供的jquery-3.2.1.slim.min
> 		问题： slim.min没有$.ajax
> 		解决： 使用jquery,禁用slim.min
>
> **图片上传FormData混合提交 流文件与普通表单混合**
>
> form_data = new FormData() | new FormData(表单本身)
> 		form_data.append(key,value) 通过req.body获取
> 		value 可以是file： 
> 		<input type="file" name="file2" id="file2" />
> 		formData.append("file2", $('#file2')[0].files[0]);
> 		通过multer的req.files获取
>
> ```
> $.ajax({
>   contentType: false,//不设置编码类型,在进行文件流与普通字符串混合上传的时候，需要设置为false
>     processData: false,//不进行数据处理
> })
> ```
>
> **后端需要处理未传图**（req.files空)
>
> **js抓取ejs变量**
> 			form_data.append('dataName',"<%=dataName%>");
> 		**ajax提交后，nodejs需返回跳转地址，由前端跳转**
> 	    **子节点排序**
> 			.sort({'detail.time':-1,xx:oo})

**删除**

```js
接口: /admin/product/del?dataName=xx&_id=xx&start=2&count=2&q=b&rule=_id

实现

var express = require('express');
var router = express.Router();
var mgdb = require('../../../common/mgdb');

router.get('/', function(req, res, next) {
  //1.必传参数
  let {dataName,_id,start,count,q,rule} = res.params;
  if(!dataName || !_id){
    res.redirect('/admin/error?msg=dataName和_id为必传参数')
    return;
  }
  
  //3. 写库
  mgdb({
    collection:dataName
  },({collection,client,ObjectID})=>{
    collection.deleteOne({
      _id:ObjectID(_id)
    },(err,result)=>{
      //4. 渲染页面|跳转页面
      if(!err && result.result.n){
        res.redirect('/admin/product?dataName='+dataName+'&start='+(start+1)+'&count='+count+'&q='+q+'&rule='+rule)
      }else{
        res.redirect('/admin/error?msg='+dataName+'操作错误')
      }
      client.close();
    })
  })
  
});

module.exports = router;

```

> **ID操作注意**
> 				var ObjectId = require('mongodb').ObjectId;
> 				id = ObjectId(req.query.id);     此时的id才是ajax传过来的id,才能与数据库对照

**修改**

```js
接口： /admin/product/check?dataName=xx&_id=xx&start=2&count=2&q=b&rule=_id

实现

var express = require('express');
var router = express.Router();
var mgdb = require('../../../common/mgdb')
let pathLib = require('path');
let fs = require('fs');
let uploadUrl = require('../../../config/global').upload.product;

router.get('/', function (req, res, next) {
  //1.必传参数
  let {dataName,_id,start} = res.params;
  if (!dataName || !_id) {
    res.redirect('/admin/error?msg=dataName和_id为必传参数')
    return;
  }

  //公共数据 
  let common_data = {
    ...res.user_session,
    ...res.params,
    page_header: dataName + '修改',
    start:start+1
  }

  //找到这条数据
  mgdb({
    collection: dataName
  }, ({ collection, client, ObjectID }) => {
    collection.find({
      _id: ObjectID(_id)
    }).toArray((err, result) => {
      
      if (!err && result.length>0) {
        let data = {
          ...common_data,
          page_data: result[0]
        }
        console.log(data)
        res.render('product/check', data);
      } else {
        res.redirect('/admin/error?msg=' + dataName + '操作错误')
      }
      client.close();
    })
  })


});

router.post('/submit', function (req, res, next) {
  //1.必传参数
  let dataName = req.body.dataName;
  let _id = req.body._id;
  if (!dataName || !_id) {
    res.redirect('/admin/error?msg=dataName和_id为必传参数')
    return;
  }

  //可选参数
  let start = req.body.start ? req.body.start - 0 : require('../../../config/global').page_start
  let count = req.body.count ? req.body.count - 0 : require('../../../config/global').page_num
  let q = req.body.q ? req.body.q : require('../../../config/global').q;
  let rule = req.body.rule ? req.body.rule : require('../../../config/global').rule;

  //2.整理公共数据|库数据
  let {title,content,des,auth,old_auth_icon} = req.body;
  //old_auth_icon 添加是保存的图
  
  //multer拆出上传图片,需要解决没有上传头像
  let auth_icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  
  if(auth_icon){
    fs.renameSync(
      req.files[0].path,
      req.files[0].path+pathLib.parse(req.files[0].originalname).ext
    )
  }else{
    auth_icon = old_auth_icon;
  }


  //3.写库 + 跳转

  mgdb({
    collection:dataName
  },({collection,client,ObjectID})=>{
    collection.updateOne({
      _id:ObjectID(_id)
    },{
      $set:{title,des,detail:{auth,content,auth_icon}}
    },(err,result)=>{
      if(!err && result.result.n){
        res.send('/admin/product?dataName='+dataName+'&start='+start+'&count='+count+'&q='+q+'&rule='+rule)
      }else{
        res.send('/admin/error?msg=集合操作错误')
      }
      client.close();
    })
  })
});

module.exports = router;

```

> 后端需要处理未传图（req.files空)
> 		前端修改时抓取库图地址（渲染用），提交时传递接收到的库图和本地图，服务器优先抓取本地图
> 		修改时删除之前的图片fs.unlink
> 		ajax提交后，nodejs需返回跳转地址，由前端跳转

**检索|排序**

```js
接口: /admin/product?dataName=home&start=2&count=2&q=b&rule=detail.time

实现
var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.get('/', function (req, res, next) {

  let {dataName,q,rule,start,count} = res.params;
  if (!dataName) {
    res.redirect('/admin/error?msg=dataName为必传参数')
    return;
  }


  let common_data = {
    ...res.user_session, 
    ...res.params, 
    page_header: dataName + '列表',
    start: start + 1,
    api_name:'product'
  }

  mgdb({
    collection: dataName
  }, ({ collection, client }) => {
    collection.find(
      q ? { title: eval('/' + q + '/g') } : {},
      {
        projection: {
          _id: 1, title: 1
        },
        // sort: rule? {[rule]:-1} : {'detail.auth':-1}
        sort: rule ? { [rule]: -1 } : { 'time': -1 } //排序条件默认按时间排序
      }
    ).toArray((err, result) => {
      let checkResult = result.slice(start * count, start * count + count)//提取要分页的数据
      let data = {
        ...common_data,
        page_data: checkResult,
        page_count: Math.ceil(result.length / count)//计算总页数
      }
      res.render('product', data);
      client.close();
    })
  })

});

router.use('/add', require('./product/add'));
router.use('/del', require('./product/del'));
router.use('/check', require('./product/check'));

module.exports = router;

```



> 查询 eval('/'+ q +'/g')
> 		排序 sort:rule ? {[rule]:-1} : {'detail.time':-1}
> 		排序关键字: (标题title|时间:detail.title)
> 		分页: 取所有，挑出对应页数，返回给浏览器



























































### 接口文档编写

为了以后前端使用方便，把api的使用方式，或者说请求方式做成文档，文档可以是，word，pdf，也可以是[在线生成api文档](https://www.easyapi.com)



































































## 扩展

### 代理

前端通过ajax访问第三方接口时，会出现浏览器的跨域行为，可以通过后端代理绕过，前端只需要访问我方后端接口，我方后端去请求第三方接口，浏览器和我方后端同域，这样绕开浏览器的跨域限定

**第三方接口**

[聚合](http://v.juhe.cn/toutiao/index?type=&key=55f8053eba54dab5a301a00f45523164)	[豆瓣](https://www.cnblogs.com/e-cat/p/8656040.html)

豆瓣的请求姿势

```
hostname:'douban.uieee.com',//主机名
port: 443,//端口
path:'/v2/movie/top250?start=3&count=1',
method:'get'
```

聚合的请求参数

```
hostname:'v.juhe.cn',
// port:80,
path:'/toutiao/index?type=&key=55f8053eba54dab5a301a00f45523164',
method:'GET'
```

我方后端请求

```js
let http[s]=require('http[s]')

options={
  hostname:'api.douban.com',
  port:443,
  path:'/v2/movie/top250?count='+req.query.count,
  method:'GET'
};

//发送http[s]请求
let reqHttp = http[s].request(配置项,回调(响应对象resHttp)){	//返回请求对象reqHttp
  resHttp 响应对象
  resHttp.statusCode 状态码  200 OK
  resHttp.headers 获取响应头信息
  resHttp.setEncoding('utf-8') 设置编码方式
  resHttp.on('data/end',fn)  ->send给前端
});

reqHttp //请求对象
reqHttp.on('error',(err)=>{console.log(err)});	//监听请求失败信息
reqHttp.end();//请求结束
```

正向代理 VS 反向代理

有一台服务器出现在客户端和真实服务器之间，这台服务器叫代理服务器，他可能两端都有可能出现

|      | 正向代理（客户端代理)                                        | 反向代理(服务端代理)                  |
| ---- | ------------------------------------------------------------ | ------------------------------------- |
| 目标 | 帮客户端访问其无法访问的服务器                               | 帮服务器做负载均衡，安全防护等        |
| 位置 | 客户端架设                                                   | 服务器架设                            |
| 知晓 | 真实服务器不知道客户端是谁                                   | 客户端不知道真实服务器是谁            |
| 场景 | vue、react的开发环境中架设，浏览器端安装代理软件，翻墙软件等 | 机器集群中部署一个反向代理服务器ngnix |



























































### socket.io

#### 介绍

Web领域的实时推送技术，也被称作Realtime技术。这种技术要达到的目的是让用户不需要刷新浏览器就可以获得实时更新。它有着广泛的应用场景，比如在线聊天室、在线客服系统、评论系统、WebIM等。

#### 原理

双向通信,前端H5api （WebSocket） + 后端net模块

#### socket库

[英文](https://socket.io/)	[中文](https://www.w3cschool.cn/socket/socket-k49j2eia.html)





























#### 服务端配置

修改www

```js
const SOCKETIO = require('socket.io');//创建socket实例
const io = SOCKETIO.listen(server);//监听http实例，未来3000端口下的http请求，会触发socket
module.export = io;//写在最后
```

> 注意： www 不热重启，不检查

#### 客户端配置

html注入客户端库

```html
<script src="/socket.io/socket.io.js"></script>
<script>
	连接服务器：socket = io('http://localhost:3000');
</script>
```

























#### 服务端推送

```js
//完成一次添加工作后↓
let io = require('../../../bin/www'); //require要在需要时再引入
io.emit('mess_type',{data:'服务端的推送数据')//推送
```

#### 客户端接收

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  //连接服务器
	var socket = io('http://localhost:3000');
  socket.on('new_movie',(data)=>{
    console.log('首页_客户端收到',data)
  })
</script>
```









































#### 客户端推送到客户端

客户端(未指定消息|指定的消息)->服务器(广播|私信给指定)->客户端

#### 聊天室思想

客户端(未指定消息|指定的消息)->服务器(广播|私信给指定)->客户端

#### 服务端API

```js
检测客户端连接：io.on('connection', (socket) =>{}) 回调函数接收客户端socket
接受:socket.on('消息名称',(data)=>{}) data=接受到的消息
广播:	io.emit('消息名称', {数据});

检测客户端下线:	socket.on('disconnect',(data)=>{})

接受私信:
socket.on('消息名称',(toUserName,data,callback)=>{})
					toUserName==目标用户 callback==给发送端的回调
发私信:	接受消息的socket.emit('消息名称',{数据})
					发私信	->		socket   == onlineUsers[toUserName]
注意,data数据 里面不可以包含socket对象,发往客户端,量太大
```

#### 客户端API

```js
发送未指定消息:	socket.emit('消息名称',{到服务器的数据})
发送私息:	socket.emit('消息名称',toUserName,{到服务器的数据},(由服务器返回的数据)=>{})
接受消息:	socket.on('消息名称',(data)=>{})
```



































### 跨域

有时，前端和后端的工程文件不在同一个域，也会出现跨域，一下是解决方案

#### 后端解决

部分接口允许

```js
要允许的接口内部
res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
```

所有接口允许

```js
let core = require('core');

app.use(cors({
  //允许所有前端域名
  "origin": ["http://localhost:8001","http://localhost:5000","http://localhost:8080"],  
  "credentials":true,//允许携带凭证
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //被允许的提交方式
  "allowedHeaders":['Content-Type','Authorization']//被允许的post方式的请求头
}));
```

#### 前端解决

jsonp

浏览器装插件

环境做代理（webpack）



































### 异步流程控制

有时前端的请求在后端处理时，后端要多次请求库时，用的上

安装：``npm i async -S``

**串行无关联**

多个异步依次请求，请求之间不依赖

```js
async.series([fn1(callback),fn2(callback)],处理函数(err,result))
			//callback(err,数据)->callback(null,'one')
			//花费时间是：fn1+fn2

async.series({xx:fn(callback),xx:fn(callback)},处理函数(err,result))
			//花费时间是：fn1+fn2
```

**并行无关联**

多个异步同时请求，请求之间不依赖

```js
async.parallel(数组|对象,回调(err,result))  √

async.parallel([fn1(callback),fn2(callback)],处理函数(err,result))
				callback(err,数据)->callback(null,'one')
async.parallel({xx:fn(callback),xx:fn(callback)},处理函数(err,result))
			//花费时间是：用时最多的那个fn
```

**串行有关联**

多个异步依次请求，请求之间依赖

```js
async.waterfall(数组|对象,回调(err,result)) √
async.waterfall(
  [fn1(callback){callback(null,data)},fn2(data,callback)],
  处理函数(err,result)
)
		//result 接受最后一个函数传递过来的一个参数
```



## 