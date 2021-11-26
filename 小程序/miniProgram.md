## 小程序

### 微信小程序

#### 注册小程序帐号

公众平台->注册->小程序(留一个微信号，作为管理员，留一个邮箱作为登录用)

#### 安装开发测试工具

#### 开发文档

[框架](https://developers.weixin.qq.com/miniprogram/dev/reference/) [组件](https://developers.weixin.qq.com/miniprogram/dev/component/) [API](https://developers.weixin.qq.com/miniprogram/dev/api/)

#### 获取开发秘钥

公众平台登录小程序->开发->开发设置->AppID(小程序ID)	wxf34e69dfcc966870

#### 开发工具使用

创建项目，开发，调试，打包，部署

#### 框架

微信客户端给小程序所提供的环境为宿主环境，小程序的运行环境分成渲染层(webview)和逻辑层(jscore)，WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层,小程序的渲染层和逻辑层分别由2个线程管理，这两个线程的通信会经由微信客户端

<img src="https://res.wx.qq.com/wxdoc/dist/assets/img/4-1.ad156d1c.png" style="zoom:80%;" />

##### 配置

为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名

###### 全局配置

app.json，对微信小程序进行全局配置(页面管理，窗口设置，网络请求)

###### 页面配置

pagename.json，对本页面的窗口表现进行配置，覆盖全局

###### 项目环境配置

`sitemap.json`，`project.config.json` ,`sitemap.json` 文件用于配置小程序及其页面是否允许被微信索引(SEO)，需要全局禁用索引，配置`project.config.json`， seting内部添加`checkSiteMap:false`, `project.config.json`是项目开发环境配置

##### 注册小程序页面

App() 注册小程序， Page() 注册页面的，都接受一个 `Object` 参数，**App() 必须在 `app.js` 中调用，Page()必须出现在页面.js中，必须调用且只能调用一次**，都会给当前注册生命周期钩子，和实例成员(方法、属性)

 `Object` 参数

- data:{}  数据
- 钩子函数(参数){this  指向当前页面，当前小程序}
- 自定义函数(){  this  指向当前页面，当前小程序 }
- 自定义属性:值

##### 页面与主程通讯

pages里面 `let app=getApp()`, app.实例属性|方法

##### 数据绑定

响应式数据定义在 data:{}  ，wxml数据绑定，格式`{{ 数据 }}` | `属性="{{值}}"`

##### 数据修改

data:{}  数据，在修改实例属性，数据的修改结果是异步

this.data.属性 = 值 修改， view层不实时响应

this.setData({key:value}) 修改，催生view层响应

app.setData({key:value}) 修改的是主程app

setData({key:value},callback)，callback可以抓取实时修改后的数据

##### 事件

`<组件 bindxxx="实例方法"></组件>` 	冒泡

xxx==原生移动端事件名(touchstart/touchend/touchcancel/touchmove/tap/....)

`<组件 catchxxx="实例方法"></组件>` 	不冒泡

**传参**

`<组件 bindxxx="实例方法" data-参数名称="值"></组件>` 

>  值： 字符

`<组件 bindxxx="实例方法" data-参数名称="{{any}}"></组件>` 

> any 任意类型

`实例方法:function(e){e.currentTarget.dataset.参数名称;}`

> e.detail 返回事件对象

##### 列表渲染

`<组件 wx:for="{{数据}}">{{item}}/{{index}}</组件>`

`wx:key="id"`  定key   id = item.id

`wx:key="key" ` 定key   key = item.key

`wx:key="*this"`  定key   *this =  item 本身

`wx:for-item="xx" `   定义item的名字->xx

`wx:for-index="xx"`   定义index的名字->xx

##### 条件渲染

`<组件 wx:if="{{布尔数据}}">`   惰性渲染  ~~ v-if

`wx:elif="{{}}"`

`wx:else="{{}}"`

`<组件 hidden="{{布尔数据}}"`   适合频繁渲染  ~~ v-show

##### 不渲染

分组`<block wx:if="">被包裹的元素</block>`，或声明业务逻辑，自身不渲染

##### 双向绑定

`<input value="{{ipt}}" bindinput="checkIpt"></input>`

```js
 checkIpt(e){
    this.setData({ipt:e.detail.value});//双向绑定
  },
```

简易双向绑定机制。此时，可以在对应项目之前加入 `model:` 前缀：

```html
<input model:value="{{value}}" />
```

##### 钩子函数

![](https://res.wx.qq.com/wxdoc/dist/assets/img/page-lifecycle.2e646c86.png)

**app**

小程序初始化onLaunch(程序A传递给当前小程序的参数)

切到前台onShow|后台onHide

**pages**

初始化onLoad(路由传递过来的参数和数据)

切前后台/第一次渲染完毕onReady

卸载前onUnload

转发/下拉/触底/滚动

##### 模块化

支持commonJs / es Modules

##### es6+

默认支持es6语法，可以开起`增强编译`会支持的更好

##### wxss

WXML就是组件，非DOM标签，WXSS就是简版的css，提供rpx响应式布局，IPHONE6为基准，采用双倍布局（1px~~2rpx)，目前支持的选择器有

| 选择器            | 样例             | 样例描述                                       |
| :---------------- | :--------------- | :--------------------------------------------- |
| .class            | `.intro`         | 选择所有拥有 class="intro" 的组件              |
| #id               | `#firstname`     | 选择拥有 id="firstname" 的组件                 |
| element           | `view`           | 选择所有 view 组件                             |
| element, element  | `view, checkbox` | 选择所有文档的 view 组件和所有的 checkbox 组件 |
| ::after           | `view::after`    | 在 view 组件后边插入内容                       |
| ::before          | `view::before`   | 在 view 组件前边插入内容                       |
| element1 element2 |                  |                                                |

**需要跨端**（h5,app,miniprogam): flex布局 + 类选择|id选择器 打头定义，对齐短板

#### 组件

##### 声明式路由

组件：navigator

属性: open-type

值：

- navigate,redirect 只能打开非 tabBar 页面

- switchTab 只能打开 tabBar 页面。

- reLaunch 可以打开任意页面
- navigate 新+页面栈
- redirect 会替换当前栈
- navigateBack 当前页面出栈
- switchTab 目标tabBar页面入栈  关闭其他所有非 tabBar 页面
- reLaunch 全部出栈，目标页面栈入栈
- exit 全部出栈，无进栈   target="miniProgram"时生效

**路由传参**

​	`url="/pages/xx/xx?a=1&b=2"`  switchTab 不能传参数

**接参**

app.js  onLaunch(**options**)  options={a:1,b:2}

pages.js onLoad(**options**) options={a:1,b:2}

**跳转其他小程序**

条件：需要设置对方小程序的appId，在我方小程序的app.json,不可以跳转自己的appId

```json
// 对方的appId
{
  "navigateToMiniProgramAppIdList":[
    "wxcb2ef166e0715ba9"
  ]
}
```

```js
<navigator 
  target="miniProgram" 
  open-type="navigate" //不替换当前小程序
  app-id="wxcb2ef166e0715ba9" //对方的appId
  extra-data="{a:1,b:2}" //传给对方小程序的目标页面的数据
  path="/pages/dongbula/dongbula" //要打开的对方的小程序页面
>跳转到其他小程序</navigator>
```

#### API

##### 编程式路由

##### 数据交互

读取本地数据? 可以, 需要打开本地设置-》不校验合法域名

软件、app、小程序 数据交互不存在跨域的，因为宿主不是浏览器

##### 数据缓存

#### 自定义组件

**定义**

不是创建page，而是创建component，一个小程序组件（wxml,wxss,js,json)

```js
//组件名.js
Component({ //构造一个组件
  
  properties:{ //组件的属性列表
    title:{ //属性名
      type:String,//类型
      value: '默认值'
    }
  }
  
  data:{ //组件数据
  	msg:'..'
	}
          
  methods:{ //组件方法
    show(){
  		this.data.msg/this.properties.title
  		this.setData({msg:...}) // properties 不可修改
		}
  }
})
```

**注册**

全局注册 app.json , 到处可用(page,component)

```json
"usingComponents":{
  "使用时的组件名":"components/comp1/comp1"
}
```

局部注册 pagename.json ，当前页面可以

```json
"usingComponents":{....}
```

组件内注册组件,  当前组件可用

```json
"usingComponents":{....}
```

**使用**

```html
<comp1 title="{{值}}"></comp1>
```

> 组件样式，推荐只使用class，组件样式是局部的，与外界隔离(scoped)

**接受外部传入样式**

```js
Component({
  options: {
    addGlobalClass: true,
  }
})
```

> 内部class名权重高于外部



#### 第三方组件

##### npm**下载单一组件**

```js
npm init -y  执行一次
npm i miniprogram-组件名 --production    安装到node_modules里面，不可以引入
npm i miniprogram-组件名2 --production    安装到node_modules里面，不可以引入

小程序开发工具-构建npm -> miniprograme_npm   
	小程序会指向这个miniprograme_npm目录，二不是node_modules  
  
  可以引入无需路径
  {
    "usingComponents": {
    	"miniprogram-picker": "miniprogram-picker"
    }
	}
	
一定要是miniprograme_npm名称么，可否自定义？
	miniprograme_npm是自动产生，可以定义
  定义xxx目录： 无需执行小程序开发工具-构建npm， 手动从node_modules里面copy到xxx目录
  
  可以引入需要路径
  {
    "usingComponents": {
    	"miniprogram-picker": "components/miniprogram-picker"
    }
	}
```

##### 使用**weui**库

pc端: elementUi / iview / antd

移动端: vant / mintUi / ameizi / antd-m

小程序端 weui: wevant / weiview / [官方扩展](https://developers.weixin.qq.com/miniprogram/dev/extended/)      特点：不操作dom

[**weVant**](https://youzan.github.io/vant-weapp/#/intro)、[**weIview**](https://weapp.iviewui.com/)

> 将 app.json 中的 `"style": "v2"` 去除，小程序的新版基础组件强行加上了许多样式，难以去除，不关闭将造成部分组件样式混乱。

> 添加**新**样式:  vant custom-class="类名"    iview   i-class="类名"
>
> 修改样式:  定义主题->传递组件属性->custom-class="类名"->直接修改第三方组件本身(dist/对应组件.wxss)

UI库选择: WEUI库->NPM->小程序组件->自定义

#### 原生项目

wxml 目前不支持反单引

#### 云开发

##### 初始云环境

- 开发工具->创建云开发项目（选择云开发)
- 必须填入appID
- 开发工具->云开发->设置->创建环境->输入环境名称
- 开发工具->右键点击cloudfunctions目录，切换你创建的环境
- 右键点击cloudfunctions/login云函数->上传并部署 （为了将来的小程序可以访问你的云环境)

##### 多云环境

初始云环境的动作，做多次，注意：目前免费环境支持两个，多了没有，一般做一个测试和一个正式环境

> 多环境情况下需要指定env

```js
// app.js
onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-vpu1v', // 环境id
        traceUser: true,
      })
    }
  }
```

##### 数据库环境

**创建集合**

开发工具->云开发->数据库->创建集合->权限设置（最大）

> 创建者(后端)，所有用户(客户端)

**添加记录**

手动添加： 开发工具->云开发->数据库->添加记录

导入：本地mongodb数据、导入第三方的数据，要求数据是json（出库)

```js
本地mongodb出库:  mongoexport -h 127.0.0.1 -d 库名 -c 集合名 -o 输出路径/xx.json

//xxx.json  格式 {}{}{}{}

//导入的数据，如果需要客户端，可以写入的权限，需要给每一条数据添加_openid
```

##### 获取openid

```js
//获取openId
let {result} = await  wx.cloud.callFunction({
  name: 'login'
})

console.log('openid', result.openid)
```

##### 数据库操作

**链接库**

```js
const db = wx.cloud.database()
```

**增**

```js
db.collection('bulala')
  .add({ //增
    data: { //一条
      name: 'apple',
      category: 'fruit',
      price: 10
    }
  })
  .then(
    res=>console.log('res111111',res)
  )
  .catch(
    err=>console.log('err111111',err)
  )
```

**删**

```js
db.collection('bulala')
  .doc('3f8c212f5ea1086f00008dc55c74c585') //冲着_id
  .remove()
	.then()
	.catch()
//_openid
```

**改**

```js
db.collection('test')
  .doc(_id)
  //.set({ // 替换更新
  .update({ // 局部更新
    data: {
      name: 'milk',
      category: 'dairy',
      price: 18,
    }
  })


```

**查**

```js
db.collection('bulala')
  .where({ //查询条件
    price: _.gt(10)
  })
  .field({//允许返回的字段
    name: true,
    price: true,
  })
  .orderBy('price', 'desc')//按关键词排序
  .skip(1)
  .limit(10)
  .get() //获取

```

> 批量操作，需要在云函数里面完成

**数据推送**

A页面修改了集合，B页面事先监听了这个集合，就会收到更新后的数据,这个数据是后端推送出来的（广播）

```js
//客户端监听（订阅）
watcherId = 集合.where({监听条件}).watch({onchange:fn,onError:fn})
//客户端关闭监听
watcherId.close()
//服务端推送（发布）  有微信的服务器完成
```

> 场景：聊天室，webqq，新消息推送

##### 上传图片

```js
wx.chooseImage({
  ...
  success: (res) => {
    const filePath = res.tempFilePaths[0]//手机缓存
    
    // 上传图片
    const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
    
    wx.cloud.uploadFile({
      cloudPath,//云端地址
      filePath,//手机缓存地址
      success: res => {
        // console.log(res.fileID)//传递完后的云地址
        //地址地段，和用户信息，入库(update)
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
      },
      complete: () => {
      }
    })

  },
  fail: e => {
    console.error(e)
  }
})
```

##### 云函数

**创建**

```js
右键cloudfunctions->新建node云函数->定义函数名->右键函数名->上传并部署
```

**编写**

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()//微信 上下文信息 
  
  //业务
  cloud.database().collection('bulala').批量操作
  
  //返回值
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
```

**测试调用**

服务端测： 控制台->云端测试

客户测试: 	`wx.cloud.callFunction({name: '函数名',data:{数据}}).then(结果)`

##### 项目改装

方案1： 创建云开发模板环境

方案2：非云开发环境改装成云开发环境

> 修改project.config.json 添加云函数目录`"cloudfunctionRoot": "cloudfunctions/",`
>
> 工作区创建cloudfunctions目录
>
> 环境切换到对应环境
>
> 生成login云函数(手写,或者同步已有云函数)
>
> app.js  指定环境env







### 跨端框架

![](http://www.bslxx.com/uploads/allimg/180312/1-1P3121A05GF.jpg)

![](https://img2018.cnblogs.com/blog/1055667/201810/1055667-20181017200144824-1272624771.png)

#### mpvue

[官网](http://mpvue.com/mpvue/)

##### 环境搭建

```bash
# 安装vue-cli脚手架
	vue -V  //查看版本
	
	# 已安装过 1 / 2 需要卸载
	npm uninstall vue-cli -g 或 yarn global remove vue-cl
	npm i @vue/cli  //装3/4
	npm install -g @vue/cli-init  ||  yarn global add @vue/cli-init 	//桥接2.x
	
	# 已安装 3 / 4 
	# 桥接2.x
	npm install -g @vue/cli-init  ||  yarn global add @vue/cli-init 
	

# 创建一个基于 mpvue-quickstart 模板的新项目
vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

##### 环境配置

- 关闭微信开发者工具的 ES6 转 ES5 ，就可以打 debug 啦
- 新增的页面需要重新 npm run dev 来进行编译
- 微信的调试工具指向 项目dist/wx目录

##### 编写思想

vue语法 + dom结构布局 + css/sass + 小程序表单组件 + 第三方的 weUI 库 + mpvue.api()  √

##### 差异

###### 钩子函数

vue + 小程序 混用，除特殊情况外，不建议使用小程序的生命周期钩子  推荐 mounted

###### 路由和路由参数

- 路由使用小程序的组件，vue-router不支持，使用navigator || a 
- 取参：onLaunch/onLoad时候传递的 options  -》 this.$root.$mp.appOptions/query

###### css

- vue的css没有隔离作用域|小程序有 	vue需要时scoped
- css里面 涉及到图片适合不推荐使用本地图片，使用base64 || 网络图片

###### api

小程序api使用桥接器： mpvue.api(...)

###### 事件

事件对象: e.mp.detail.value 抓取事件对象目标的输入值

###### 语法规则

- 小程序里所有的 BOM／DOM 操作不可用，也就是说 v-html 指令不能用
- 不支持过滤器(filter)，动态组件(component)，字符串模板(inline-template|X-Templates)，插槽(Slot),异步组件
- Class 与 Style 绑定 的值不支持object
- 键盘事件 不支持
- `v-for (item) of xx` 时 出现 loader解析错误，解决：去了括号
- 数据绑定时，不支持返单引

##### 环境目录

|                | mpvue                                   | 小程序                   |
| -------------- | --------------------------------------- | ------------------------ |
| 全局配置       | /src/app.json                           | /app.json                |
| 页面配置       | /src/pages/页面/main.json               | /pages/页面/页面.json    |
| 全局样式       | /src/app.vue里面的style标签             | /app.wxss                |
| 页面样式       | /src/pages/页面/页面.vue里面的style标签 | /pages/页面/页面.wxss    |
| app.json配置   | page:["pages/页面/main"]                | page:["pages/页面/页面"] |
| tabbar资源指向 | /static                                 | /images                  |
| 云函数         | /dist/wx/cloudfunctions                 | /cloudfunctions          |

##### UI库

使用weUI库： weVant，weIview

> 修改ui库样式，深度选择器   .class1 >>> .组件class     
>
> loading是保留字

##### 跨端

后端： H5可以访问到，小程序可以访问到

#### taro

react语法，跨端开发，支持打包app(reactNative)，如果你熟悉React，不懂Vue.js，推荐Taro

[官网](https://taro.aotu.io/)

##### 安装

```js
npm install -g @tarojs/cli@1.3.44 || yarn global add @tarojs/cli#1.3.44
```

##### 创建项目

```js
taro init 目录
```

##### 开发

```js
yarn dev:h5  //开发h5    浏览器测试
yarn dev:weapp //小程序   小程序开发工具测试
```

##### 打包

```js
yarn build:weapp 
yarn build:h5
```

##### 调用

- 微信工具引入项目，指向当前项目根
- 需要设置关闭 ES6 转 ES5 功能，开启可能报错
- 需要设置关闭上传代码时样式自动补全，开启可能报错
- 需要设置关闭代码压缩上传，开启可能报错

##### 开发规范

taro是个袖珍版的react

###### 全局配置

src / app.js | jsx  里面的config属性  ==  小程序app.json

###### 页面配置

src / pages/ 页面 / 页面.js|jsx 里面的config属性 ==  小程序page.json

###### 生命周期

支持小程序钩子和react钩子

| react              | miniprogram      |
| ------------------ | ---------------- |
| componentWillMount | onLoad\|onLaunch |
| componentDidMount  | onReady          |
| componentDidShow   | onShow           |
| componentDidHide   | onHide           |

###### 小程序api

小程序的api通过Taro.api()桥接

Taro.request().then().catch()

###### 原生api

reactNative的api

###### 样式

- 若要支持 React Native 端，必须采用 Flex 布局，并且样式选择器仅支持类选择器，思想：对齐短板
- 尺寸单位建议使用 px、 百分比 %，taro自动转换
- Taro 提供了直接在样式文件中引用本地资源的方式
- CSS Modules 默认关闭，[需要开启](https://nervjs.github.io/taro/docs/css-modules.html)
- 入口文件 app.js |jsx里面引入的样式就是全局样式

###### UI组件

- taro内置（封装小程序的原生组件) -> taro-ui -> 第三方weui组件
- 内置组件和taro-ui组件，支持H5转换
- 不支持jsx标签（div)
- taro内置组件 使用方式对等 小程序组件
  - 组件属性: `<组件 xx-xx="vlaue"></组件>`  ->  `<组件 xxXx={value} />`
  - 引入内置:  `import { Map } from '@tarojs/components'` 
  - 引入taroui: `import { Map } from 'taro-ui'` 
- 修改组件样式: 整体修改主题 -> props-> 查询元素，修改编译后的选择器名，同选择器重写

###### 路由

- 不可用react-router-dom，使用方式同小程序
- config属性配置tabbar跳转
- Taro.api() 编程式跳转
- Navigator 声明式跳转
- this.$router.params 访问到程序初始化参数|路由参数

###### 事件

bindtap -> onTap  事件对象同小程序

###### 语法差异

- 不支持 <> <Xxx.Fragement> 等方式
- 文字要包在 Text 组件里面
- 暂不支持在 render() 之外的方法定义 JSX
- 引用图片、音频、字体等文件 `import xx from '...'` `reuqire('../')`

###### 其他注意

- 在 App 类中的 render() 函数没有实际作用，不写逻辑，不会起作用
- 支持 PropTypes 检查类型，目前在小程序端还有些问题
- 不能使用 Array#map 之外的方法操作 JSX 数组
- 自定义组件样式默认是不能受外部样式影响的，需要定义在组件内部

##### taro-ui

[官网](https://taro-ui.aotu.io)

**安装**

```js
yarn add taro-ui --save
```

**配置**

由于引用 `node_modules` 的模块，默认不会编译，所以需要额外给 H5 配置 ,在 taro 项目的 `config/index.js` 中新增如下配置项

```js
 esnextModules: ['taro-ui']
```

**使用**

```js
// app.js | jsx
import 'taro-ui/dist/style/index.scss' //全局引入样式一次即可
import 'taro-ui/dist/style/components/button.scss' // 按需引入 全局使用

//pages.js | jsx
import { AtButton } from 'taro-ui'

<AtButton type='primary'>按钮文案</AtButton>
```

**自定义主题**

[在线生成主题](https://nervjs.github.io/taro-ui-theme-preview/)

> @tarojs/plugin-sass": "1.3.17

###### 转换平台

微信小程序转taro

```js
//微信小程序目录下
taro convert

//在taroConvert目录下
yarn install //安装依赖
yarn dev:xx  //开发
yarn build:xx //打包到其他平台
```

###### 

#### uniapp

vue语法，跨端开发（H5,小程序,app)，支持打包app(原生API)，如果你熟悉Vue.js，则推荐 uni-app

[官网](https://uniapp.dcloud.io) [开发工具安装](https://www.dcloud.io/hbuilderx.html)

##### 开发规范

vue语法规范 + uni内置组件 + uni.api() + uni-ui跨端UI库 + flex布局

##### 功能框架图

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/uni-app-frame-0310.png)

##### 创建项目

点击工具栏里的文件 -> 新建 -> 项目：

![img](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/create1.png)

选择`uni-app`类型，输入工程名，选择模板，点击创建，即可成功创建。

![img](https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/create.png)

##### 开发调试

**统一配置**：

打开manifest.json

- 基础配置：填入Dcloud appID（__UNI__9935C10），没有获取一下

- H5配置: 路由模式->history

- 运行基础路径:  /

- 微信小程序配置: 填入appID

打开微信工具

- 设置-》安全设置-》开启服务端口

- 打开HBX-》工具-》设置-》运行设置-》微信开发工具路径-》浏览找到

**浏览器运行**：进入hello-uniapp项目，点击工具栏的**运行** -> 运行**到浏览器** -> 选择浏览器

![img](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/run-chrome.png)

**真机运行**：usb连接手机和电脑，安卓手机手动开启USB调试，苹果选择信任，进入hello-uniapp项目，点击工具栏的**运行** -> **真机运行** -> 选择你的设备，会在你机器上装Hbuilder测试软件，打开软件（需要设置信任）。

![img](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/run-phone.png)

在**微信开发者工具里**运行：进入hello-uniapp项目，点击工具栏的**运行** -> 运行到**小程序模拟器** -> **微信开发者工具**，即可在微信开发者工具里面体验uni-app。

![img](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-1.png)

> 开发时会生成unpackage目录
>
> dist/dev/所有的开发时打的零时包
>
> mp-weixin|mp-xx  小程序开发工具依赖的目录
>
> app-plus 手机端 Hbuilder依赖的目录
>
> .sourcemap 是浏览器依赖的目录

##### 打包

发行**H5**: 选择网站-H5手机版

![img](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-10.png)

发行**小程序**: 小程序开发工具->上传->公众平台小程序账号->提交审核

发行**app**： 保证hbx是最新版，和云打包端的版本要一致

在HBuilderX工具栏，点击发行，选择原生app-云端打包，如下图：

![img](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-11.png)

出现如下界面，点击打包即可。

![img](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/push.png)

> 打包时会生成unpackage目录
>
> dist/build/所有的打包后资源
>
> H5： 打好后的h5资源
>
> app-plus 打好后的本地资源



##### 项目结构

| 文件                  | 属性         | 小程序文件                 |
| --------------------- | ------------ | -------------------------- |
| pages.json            | globalStyle  | app.json->window           |
| pages.json            | pages.style  | pages.json                 |
| manifest.json         | 开发配置     | project.config.json        |
| app.vue               |              | app.js/app.wxss            |
| pages/index/index.vue |              | pages/index/wxml\|wxss\|js |
| /static               | 静态本地资源 | /images                    |

##### 注意

- 支持template/block
- es6 支持 async await
- 支持css背景图片链接本地资源
- 路由推荐小程序，不支持vue-router，路由接参数同小程序
- 钩子函数 推荐用小程序，支持vue钩子
- 样式支持rpx，规范对齐小程序，类 flex布局
- npm 支持， 推荐先从 uni-app[插件市场](https://ext.dcloud.net.cn/)->npm
- 全局组件: 在 main.js 里进行全局注册Vue.component，注册后就可在所有页面里使用该组件
- 全局变量: 公用模块(douban)|挂载 Vue.prototype|globalData|vuex
- 不支持dom操作，关于dom规范，对齐mpvue（v-html不可用，物理键盘事件不存在)

##### 项目改装

imags -> static

cloudfunctions -> uppackage/dist/mp-weixin

修改uppackage/dist/mp-weixin/project.config/"cloudfunctionRoot": "cloudfunctions/"

uni.cloud 无法使用，Dcloud产品有自己云开发api，不会编译成小程序的云开发api

[骨架屏组件](https://ext.dcloud.net.cn/plugin?id=852)

##### 跨端开发

[注意](https://uniapp.dcloud.io/matter)

#### kbone

vue语法可以，react语法可以，跨H5，微信小程序端，如果你已经有H5代码，只想增加微信小程序平台，并且对性能要求不高，可以考虑kbone









