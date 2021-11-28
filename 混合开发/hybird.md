## 混合开发

### 什么是混合开发

前端开发(html+css+js)也可以访问设备信息(麦克风，摄像头，通讯录)，也可以开发手机app

### 目标

把web打包成app

### 开发方式

#### web app

网页开发

- 技术： html5 + css + js(库，框架) 编写移动端
- 优点：开发周期短，跨平台
- 缺点：性能一般，默认无法调取设备信息(麦克风，摄像头，通讯录)
- 场景：手机淘宝，京东，网易

#### native app

原生手机应用开发、客户端开发

- 技术：java -> android			object-c	-> ios
- 优点：性能高，默认就可以调取设备信息
- 缺点：开发周期长（迭代慢），团队规模大

#### hybird app

混合开发，用H5搭建webapp，通过第三方提供的原生（native）库，访问设备信息，之后打包成app

| native库    | 从属     | 组合方式                      | 输出 |
| ----------- | -------- | ----------------------------- | ---- |
| cordova     | adobe    | H5+cordova+phonegap           | app  |
| wx_jssdk    | 腾讯     | H5+wx_jssdk，开发出来的是网页 | web  |
| H5+         | Dcloud   | hbuilder + mui                | app  |
| reactNative | 脸书     | react + reactNative           | app  |
| ionic       | 谷歌民间 | angular + ionic               | app  |
| weex        | 阿里     | vue + weex                    | app  |

#### 跨端开发

前端希望一次开发，到处使用，浏览器里面使用、手机系统里面使用、微信里面使用、支付宝里面使用、扫码使用（快应用)

| 框架   | 从属   | 组合方式                    | 输出                |
| ------ | ------ | --------------------------- | ------------------- |
| uniapp | Dcloud | vue+uniapp+hbuilderX        | app/web/小程序(all) |
| taro   | 京东   | react+taro                  | app/web/小程序(all) |
| mpvue  | 不详   | vue + mpvue + weex          | web/小程序(all)     |
| kbone  | 腾讯   | vue\|react\|angular + kbone | web/小程序（微信)   |

### PhoneGap

[官网](https://phonegap.com/) 是个桌面软件，第三方的打包工具，可以搭建开发环境，内部提供 cordova库（访问设备信息)，其他第三方的打包工具: wap2app、 uni-app， 

#### **安装**

pc端：[phonegap desktop](https://github.com/phonegap/phonegap-app-desktop/releases/download/0.4.5/PhoneGapSetup-win32.exe)，

​	搭建开发环境， 测试

手端：安卓商城搜索 phonegap developer，ios用户安装包老师copy给你们

​	用来测试

> 保证手机和电脑要在同一个网段（保证手机和电脑要在同一个网段(连了同一个wifi，同一路由)

#### **搭建项目环境**

- 打开pc phonegap 
- +
- newproject  新建项目
- helloworld  选择模板
- localpath： 选择项目位置
- name：项目名称|项目目录
- ID：添写域名
- create project 创建项目
- 打开手机端的phonegap，链接 pc端phonegap提供ip

> 问题： phonegap pc端软件打开卡死,创建项目卡死
>
> 解决：phonegap命令行创建项目
>
> ```jsx
> npm install -g phonegap@latest
> phonegap
> ```

#### **开发**

使用喜欢的开发工具，打开创建好的项目目录（react|vue)，调用cordova的api

打包到phonegap环境下的www目录,手机端会热刷新

> 打包到www下面的vue或者react，没有引入cordova的，需要手动引入
>
> 白屏问题：vue-cli4打包后index.html引入资源时`<script src="js/xx.."` ,不可以访问根"/",不然js加载失败，#app的控制失效

#### **打包**

##### 命令行打包

```js
npm i cordova -g
cordova build ios | cordova build android     (ipa/apk)

//需要安装个平台jdk环境
```

##### 在线打包

利用第三方在线生成app办法，完成打包，打包后内容就在线上

- 代码传到git仓库
  - new repository
  - git clone 仓库
  - 把phonegap项目目录 拷贝到 仓库
  - git add .
  - git commit -m '描述信息'
  - git push/wan9alex/14.lo..
- phonegap [在线打包](https://build.phonegap.com/)
- 登录 adobe id
- new App
- 复制git地址
- pull from git..
- ready to build

> 大文件限定
>
> 命令行:    配置一次
>
> ```js
> git config --global http.postBuffer 1048576000
> ```
>
> 本地仓库目录：.git/config  添加 	
>
> ```js
> [http]
> 	postBuffer = 524288000
> ```
>
> 然后把缓存清除
>
> ```js
> git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch <file/dir>' HEAD
> ```

#### cordova

[官方文档](http://cordova.axuer.com/) [第三方文档](http://docs.phonegap.com/references/plugin-apis/)  [中文文档](http://www.phonegapcn.com/docs/zh/cn/index.html)

- Battery Status  电池信息
- Camera	照相机
- Contacts 通讯录
- Device Info 设备信息
- Device Motion (accelerometer) 重力感应
- Device Orientation (compass) 罗盘(指南针)
- Dialogs (notification) 模态框
- File 文件操作(增删改查)
- File Transfer 上传
- Geolocation  地理定位
- Globalization 全球化
- InAppBrowser 在app内部开启新窗口
- Media Capture 采集
- Network Information  网络状态
- Splash Screen 欢迎屏幕
- Status Bar 状态栏
- Whitelist 白名单
- Vibration 震动

#### vue+cordova

指定vue打包位置到phonegap的www

```html
//修改 vue-cli4 下面  public/index.html 

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    
    <div id="app"></div>

    <script src="cordova.js" type="text/javascript"></script>
    <!-- built files will be auto injected -->
  </body>
</html>
```

```js
//配置webpack cli4
//vue.config.js
module.exports = {
	outputDir: '../仓库/www',
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}

//package.json 打包时 --no-clean 不清除dist [可选]
{
  "scripts": {
    "build": "vue-cli-service build --no-clean"
  },
}

  
  //cli2 可配置保存自动打包
//package.json nodemon监听src完成修改-e指定文件后，自动打包
"scripts": {
    "cordova":"nodemon --watch src -e html,vue,js,less build/build.js",
  },

//build/build.js  不清除dist
注释 //rm(..
  		// if (err) throw err
  
 //config/index.js 
{
  build: {
    // 参考模板 输出到目标
    index: path.resolve(__dirname, '../仓库/www'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../仓库'),
}
```

### 微信公众号

**特点**

- 可以实时推送一些信息
- 利用微信推广个人(订阅号)，企业(企业号)
- 微信一些基本功能(摇一摇周边,投票，微信小店,微信支付)
- 调取设备信息
- 默认无需编码(商务，业务人员)，除非要定制（公众号开发）

**开通**

公众平台->注册->留邮箱1->留个微信

**管理**

### wx_jssdk

微信网页开发，利用jssdk提供的api访问手机设备信息，另外还提供一些微信的业务功能，UI是中文习惯，使用微信jssdk是条件的

**条件**

- 真实的域名，端口`443`
- 开发出来的是网页
- 通过腾讯的产品进入
- jssdk是在线包，需要认证才可以链接使用所有功能

**配置**

1. 搞个服务器支持443端口
2. 双端适配(百度云服务端,微信端)
3. 使用jssdk的API

#### 部署百度云

##### 申请账号

去 [百度云](https://cloud.baidu.com/campaign/PromotionApr/index.html?track=cp:npinzhuan|pf:pc|pp:npinzhuan-logo|pu:wenzineirong|ci:2020syj|kw:2203653) 申请账号，登录（百度账号可以直接登录）-> 控制台 ->余额充值100

##### 购买空间

计算->**应用引擎BAE**->创建应用（仓库) ->创建环境(服务和域名)

##### 配置环境

让版本管理器每次有上传切换到最新版本：环境-》设置-》自动发布打开

##### 代码上传

SVN：右键SVN-checkout 拉取仓库到本地 -> 开发 -> svn-commit -> 开发  -> svn-commit 

> 需要**清空保存SVN密码**
>
> 找到： C:\Users\你的用户名\AppData\Roaming\Subversion\auth
>
> 清空当前目录所有

GIT： git clone  拉取仓库作为项目目录-> 开发 -> git add . -> git commit -m xxx -> git push

##### 数据库

**购买**： 数据库-》RDS|mongodb->创建实例->选择库-》支付

**配置**：

1. 数据库->rds->**允许公网**访问
2. 数据库->账号管理->创建账号|创建库

**关联到应用**：为了让百度的应用可以访问数据库

- ​	计算->BAE->环境-》设置->创建关联->选择你创建的rds|monodb

**访问**

php:

```php
$db=@mysqli_connect('mysql公网地址', 'root', 'root123') or @mysqli_connect('localhost', 'root', '');
```

node:

```js
let mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '网络连接 域名',//主机名
  user     : 'rds配置>账号管理>你创建的账号',//用户
  password : 'rds配置>账号管理>你创建的密码',//密码
  database : 'rds配置>数据库管理>你创建的库'//库名
  port: 网络连接 端口
});
```

#### 微信公众平台

为了做双端适配，需要在微信公众平台加入一些配置，允许百度服务器可以抓取jsssdk

**申请平台账号**

进入[微信公众平台](https://mp.weixin.qq.com/)，注册->订阅号(个人)

##### 双端适配

**百度服务端**

```js
//提供配置好的文件 上传到服务器

//wx_sample.php    后台验证   define("TOKEN", "bulala");  
//hello world 示例代码    给代码加入开发秘钥

//获取到文件
//wx_sample.php 百度下载到 的校验文件

//hello world 示例代码
//公众平台账号-》开发->开发者工具->开发者文档(API)->微信网页开发->微信js-sdk说明文档->拉到最后 
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
```

**微信端**

先登录微信公众管理平台，配置token和开发秘钥，指向百度服务里面的token和开发秘钥

**方案1**：

 正式号，实际开发会用到，需要平台账号要经过认证，没有认证， 部分API可用

1. 拿到开发秘钥: 开发->基本配置
2. 设置校验文件位置: 开发->基本配置->服务器配置->url: `http://uncle9-1847239832.bceapp.com/php/wx_sample.php`->token: `自定义与wx_sample对应`->随机生成key(一旦生成，请快速提交)
3. 设置安全域名:  公众号设置->功能设置->JS接口安全域名->填入  百度域名(不含http)-》下载MP_verify_IrzmAOk81zl6E0V3.txt上传至域名下与wx_sample同位置

**方案2**： 测试号

所有的API可用，但是限于开发和学习，只有管理员和部分信任的微信账号可访问

1. 生成临时的**测试号**，通过测试号生成**开发秘钥**
2. 公众平台->开发者工具->公众平台测试账号->获取测试秘钥-》填写到hello示例代码>sample.php里面(yourAppID,yourAppSecret)
3. 设置校验文件位置

```jsx
http://xx.baidu域名 .com/你指定的目录/wx_sample.php
token: wx_sample.php里面的token
```

4. 设置安全域名

```jsx
xx.baidu域名 .com     //不要加http
```

##### 调试

线上测试百度域名，生成二维码，手机扫码测试

```jsx
//失败了
{errMsg:'config,fail'}

//成功
{errMsg:'config,ok'}

//解决 检查 sample.php
jsApiList 数组:	没有使用api，ready里面为空  时

改：jsApiList['']  //ios ok   安卓fail
改2：ready里面加了调用api的代码   //ios ok   安卓ok

```

#### 使用jssdk的API

 [文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

#### vue + jssdk

开发: jssdk的api调用方式，vue事件触发，或者钩子函数触发

测试: 

​	`npm run build`打包，拷贝到 仓库，commit，刷手机

​	拷贝到 仓库时要 手动合并vue入口`index.html`到仓库入口`index.php`

**自动合并**

```php
//修改 vue 下面  public/index.html 

<?php
require_once "../php/jssdk.php";
// $jssdk = new JSSDK("xx", "xx");//正式号
$jssdk = new JSSDK("wxcfc056111e4f47c2", "660175f98e2f06105ed18b5cfc1b1cc1");//测试号 无限制

$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    
    <div id="app"></div>

    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
      wx.config({
        debug: true,//调试模式，在手机看到信息（正确，错误)
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          'chooseImage','scanQRCode','onMenuShareTimeline','onMenuShareAppMessage'
        ]
      });

    </script>
    <!-- built files will be auto injected -->
  </body>
</html>

  
  
//配置webpack
//vue.config.js  cli3/cli4
module.exports = {
  indexPath: 'index.php',  //打包vue/public/html->php
	outputDir: '../svn|git仓库地址',//指定打包到jssdk仓库目录
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}

//package.json 打包时 --no-clean 不清除dist
{
  "scripts": {
    "build": "vue-cli-service build --no-clean"
  },
}


//cli1/2 可配置保存自动打包
//package.json nodemon监听src完成修改-e指定文件后，自动打包
"scripts": {
    "jssdk":"nodemon --watch src -e html,vue,js,less build/build.js",
  },

//build/build.js  不清除dist
注释 //rm(..
  		// if (err) throw err
  
 //config/index.js 
{
  build: {
    // 参考模板 输出到目标
    index: path.resolve(__dirname, '../仓库/index.php'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../仓库'),
}
  
```

