![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1660620438564-6bb30ef0-6904-4a54-849e-57aec215827e.png)

webpack本质上是模块打包器，本身只能解析**js（原生写法，不支持ES6等高版本语法）**和**json**，打包其他资源需要借助**loader**和**plugin**

1、找到要打包的模块，使用对应的**loader**进行解析（babel-loader,less-loader,img-loader）
1、梳理不同模块之间的依赖关系



## 五大核心概念

### 1、Entry（入口）

**entry**是webpack的入口文件，所有的模块依赖，都是在入口进行拆分的。

- 单入口

适合单页面应用和组件库

```javascript
module.exports = {
  entry:'./'
}
```

- 多入口

```javascript
module.exports = {
  entry : {
    app : './A',
    minApp : './B'
  }
}
```



### 2、Output

打包出口，用来定义webpack如何将编译后的文件以什么样

```javascript
const path = require('path')

module.exports = {
  output:{
    filename:'.js',   // 多入口采用占位符的方式进行文件名输出 [name].js
    path:path.join(__dirname,'dist)
  }
}
```



### 3、loader

loader本质是一个函数方法，接收的参数是源文件，最后返回转换的一个结果。
**常用的一些loader**

| loader名称    | 作用描述                     |
| ------------- | ---------------------------- |
| babel-loader  | 转换ES6，ES7……等js新特性语法 |
| css-loader    | 支持.css文件加载和解析       |
| less-loader   | 将.less文件转换成.css文件    |
| style-loader  | 把.css文件转成style标签      |
| ts-loader     | 将ts转换为js                 |
| file-loader   | 将图片，字体等资源进行打包   |
| raw-loader    | 将文件已字符串的形式导入     |
| thread-loader | 多进程打包js和css            |

**loader**在**webpack**中是写在**module**中进行使用的

```javascript
module.exports = {
  entry:'',
  output:{},
  module:{
   // …… loader
    rules: [
      {
        test:/\*.ts/,   // 指定匹配规则的文件
        use:'ts-loader'	// 指定用于解析的loader
      }
    ]
  }
}
```



### 4、plugins

plugin一般用于优化bundle.js输出文件，进行资源管理，环境变量注入等一些loader没法完成的操作。作用于整个构建过程。

**常用到的插件列表**

| 插件名称                 | 作用描述                                 |
| ------------------------ | ---------------------------------------- |
| CommonsChunkPlugin       | 将chunks相同的模块代码提取成公共的js文件 |
| CleanWebpackPlugin       | 构建的时候清除dist目录                   |
| ExtractTextWebpackPlugin | 将css从bunlde文件中抽取成单独的css文件   |
| CopyWebpackPlugin        | 将文件或者文件夹拷贝到构建的输出目录     |
| HtmlWebpackPlugin        | 每次构建的时候自动创建html模板           |
| UglifyjsWebpackPlugin    | 压缩js代码                               |
| ZipWebpackPlugin         | 将打包出的资源生成一个zip包              |

使用方法：

```javascript
module.exports = {
  entry:'',
  output:'',
  module:{},
  plugins:[
    // …… 使用的插件
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}
```



### 5、mode

用来指定当前的打包环境 **development** || **production** || **none**  
默认值是 **production**

每个值都会执行对应的**webpack**内置的默认函数，如果是**none**的话，默认不执行任何内置函数。



## 解析JS和React JSX语法

webpack本身解析EMACScript，但无法识别ES6及以上的高级语法，需要使用**Babel**进行转换。

**转换js语法**

**核心插件：(@babel/core、@babel/preset-env、babel-loader)**

```javascript
`use strict`;

const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
};
```

**转换react-jsx语法**

**核心插件:（@babel/preset-react）**

```javascript
// .babelrc

{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/proposal-class-properties"
  ]
}


// webpack.config.js

`use strict`;

const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
    search: "./src/react.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
};


// react.js

`use strict`;

import React from "react";
import ReactDom from "react-dom";

class App extends React.Component {
  render() {
    return <h3>组件渲染</h3>;
  }
}

ReactDom.render(
  <App></App>,
  document.getElementById("root")
)
```



## 样式资源解析

**主要插件作用**

**style-loader ：将样式通过style标签插入到网页的heade中**

**css-loader ：用于加载.css文件，转换成commonjs对象**

**less-loader ：将.less转换成.css类型的文件**

**file-loader ：解析图片，字体等资源**

**url-loader ：解析图片，基于file-loader 可以限制资源大小，把图片进行base64打包**

### 1、解析样式资源【css | less | scss ……】

**核心插件：(style-loader、css-loader)**

```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
       {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
```

样式loader，需要遵循优先级顺序，**style-loader** > **css-loader** > **[less,scss,……]-loader**



### 2、解析图片 | 字体资源

**核心插件：(file-loader、url-loader)**

```javascript
 module: {
    rules: [
     {
       test: /\.(png|svg|jpg|gif)$/,
       use: "file-loader",
     },
     {
       test: /\.(woff|woff2|eot|ttf)$/,
       use: "file-loader"
     } 
    ],
},

// react.js
import iconImg from "./assets/find2.png";

class App extends React.Component {
  render() {
    return (
      <>
        <h3 className="title">组件渲染</h3>
        <img src={iconImg} width="50px"></img>
      </>
    );
  }
}
```



## 工程化配置

### webpack文件变化监听⭐️⭐️⭐️⭐️

（HMR）Hot  Module Replacement 。文件监听是当开发者修改了工作区的代码，webpack自动重新进行打包输出，避免了每次修改后进行手动打包的操作。

开启监听的两种模式：

1、在webpack命令行后面加上 --watch  (推荐使用)

2、在webpack.config.js 中设置属性 watch:true

**缺陷：webpack重新打包编译之后，需要刷新浏览器才能看到最新的效果**

**解决方案：**

**1、配合live-server 插件进行使用。（vscode live-server）**

```javascript
// package.json
 "scripts": {
    "dev": "webpack",
    "watch": "wabpack --watch"
 },
   
// wabpack.config.js
   

module.exports = {
  watch:true,
}
```

**2、通过webpack-dev-server + HotModuleReplacementPlugin插件来实现热更新**

**webpack-dev-server 生成的文件存储在内存中，不在磁盘里**

```javascript
  module.exports = {
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
      static:path.join(__dirname, 'dist'),
      port:5000,
      open:true,
      hot:true,
      liveReload:true,
    }
}
```

**3、通过webpack-dev-middleware，将webpack输出文件传输给服务器，适用于灵活的定制化开发环境**

```javascript
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler,{
  publicPath:config.output.publicPath
})
        
app.listen(3000,()=>{})
       
```



**webpack文件监听原理：**

通过轮询来判断文件最后的编辑时间是否发生了变化。

存在缓存策略，监听到文件的变化，并不是立即就开始重新打包，而是把变化进行缓存，在一定的时间后，统一进行打包处理。

```javascript
module.exports = {	
  
  watch:true, // 默认是false
  watchOptions:{
    ignored: /node_modules/, // 忽略node_modules的变化监听
    aggregateTimeout:300, // 监听到变化300ms后去执行打包
    poll:1000, // 轮询系统文件是否发生变化 默认每秒1000次
  }
}
```



**webpack-dev-server热更新原理**

**为什么需要热更新，刷新浏览器的方式有什么缺点？**

如果你正在调试一个表单组件，需要切换switch后才会触发，如果修改完代码刷新浏览器，表单状态重置，想要调试需要再次进行交互操作，hmr就可以在不刷新浏览器的情况下，进行模块代码的替换，避免重复手动的操作。



疑问：

1、webpack如何监听代码发生改变进行自动打包的呢？

2、为什么没有build之后生成的dist文件? (MemoryFileSystem) 

#### 设置文件系统为内存文件系统

2、浏览器如何拿到最新编译打包后的代码呢？

3、浏览器是如何识别是哪些代码发生改变进行替换的呢？

4、如果替换的过程中，发生了错误，是否有回退机制或其他处理手段呢？



实现思路：

1、首先要监听工作区代码的变化，如果发生了变化，就要进行hmr（不是立即触发）

2、需要在本地启动一个静态服务器进行打包资源的托管

3、浏览器需要和服务器建立长链接（*WebSocket*）来获取最新的资源

4、有一个机制，来分析处理依赖，把对应更新的模块代码进行替换



















### 文件指纹⭐️⭐

文件指纹指打包输出的文件名，会自带一个后缀

example：【 index_24214.js、lib.js?version=2.0 】

作用：用于区分不同的版本，可以进行缓存优化（后缀没有改变，默认文件没有发生变化，使用缓存，无需重新请求服务器获取资源）

**❗️chunkname 无法在webpack-dev-server下使用，一般用于生产环境**

**生成方法：**

**1、**





| **webpack占位符名称** | **含义**         |
| --------------------- | ---------------- |
| [ext]                 | 资源后缀名称     |
| [name]                | 文件名称         |
| [path]                | 文件的相对路径   |
| [folder]              | 文件所在的文件夹 |
| [contenthash]         | 文件的内容hash   |
| [hash]                | 文件内容hash     |
| [emoji]               | 随机表情         |

### css文件单独打包



### 

### 代码压缩

代码压缩主要包含3个方面

#### 1、js文件代码压缩

在**webpack4**之后打包默认进行js的压缩，也可以使用插件**uglifyjs-webpack-plugin**进行额外的扩展

#### 2、html代码压缩

通过**html-webpack-plugin**插件进行配置

```javascript
plugins:[
 new HtmlWebpackPlugin({
   template:path.join(__dirname,'src/index.html'),
   filename:'index.html',
   chunks:[],
   inject:true,
   minify:[ // 压缩配置
     html5:true,
     collapseWhitespace:true,
     preserveLineBreaks:false,
     minifyCSS:true,
     minfyJS:true,
     removeComments:false
   ]
 })

]
```

#### 3、css样式文件代码压缩

前提：需要把css样式文件单独打包 使用**mini-css-extract-plugin**

通过两个插件**cssnano**、**optimize-css-assets-webpack-plugin**进行配合

```javascript
plugins:[
  new MiniCssExtractPlugin({
    filename:'[name]_[contenthash:8].css'
  }),
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano')
  })
]
```



### 自动清理构建目录

**核心插件：(clean-webpack-plugin)**

```javascript
module.exports = {
  plugins:[
    new CleanWebpackPlugin() // 清理构建输出目录
  ]
}
```



### css3样式前缀兼容代码补齐

**核心插件：(postcss-loader，autoprefixer)**



**为什么需要添加前缀？**

因为目前还存在众多浏览器，一些css的语法还是会存在一些浏览器的兼容性问题

| 浏览器名称    | 浏览器内核 | 前缀名称 |
| ------------- | ---------- | -------- |
| IE浏览器      | Trident    | -ms      |
| Firefox浏览器 | Geko       | -moz     |
| Chrome浏览器  | Webkit     | -webkit  |
| Opera浏览器   | Presto     | -o       |

**可以上**[**https://caniuse.com/**](https://caniuse.com/) **网站进行兼容性的查询**

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1661166954403-7460d0f2-ecab-4466-b8c9-273f3e8c3df4.png)

```css
.box{
  display:flex;
  -moz-display:flex;
  -o-display:flex;
  -webkit-display:flex;
}
```

手动补齐兼容代码的话，费时费力。



### 移动端px自动转换rem

移动端尺寸的适配

1、媒体查询

缺点：需要写大量的css代码来做响应式样式处理

2、rem （font-size of the root element）

**核心插件：(px2rem-loader，lib-flexible)**

```javascript
module.exports = {
  // 处理css\less 的loader
 
  {
    loader:'px2rem-loader',
    options:{
      remUnit:75, // 1 rem = 10 px 适合750的尺寸
      remPrecision:8 // 保留px小数点位数
    }
  }
}
```



### 资源内联

意义：

1、初始化项目的前置脚本进行埋点，计算分辨率等操作

2、css内联，避免网页闪屏

3、把小尺寸的图片样式资源内联到html中，减少http请求

webpack打包，依赖于**ejs模板引擎**

#### html内联

```html
<html>
  <heade>
    ${require('raw-loader!./meta.html')}
    <title>Document</title>
  </heade>
</html>
```

#### js内联

```javascript
<script>
  ${require('raw-loader!babel-loader!./lib.js')}
</script>
```

#### css内联

1、借助**style-loader把样式提升到heade中**

```javascript
{
  loader:'style-loader',
  options:{
    insertAt:'top', // 样式插入到头部的heade中
    singleton: true, // 将所有style标签合成一个
  }
}
```

### 多页面打包配置

**核心插件：（golb，HtmlWebpackPlugin）**

```javascript
modules.export = {
  // 单页面入口
  entry:'./src/home/index.js',
  plugins:[
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'src/index.html'),
      filename:'index.html'
    })
  ]
}

// 不友好的方法
modules.export = {
  // 多页面入口
  entry:{
    page1: './src/page1/index.js',
    page2: './src/page2/index.js',
  },
  output:{
    filename:'[name].js',
    path:path.join(__dirname,'dist)
  },
  plugins:[
     new HtmlWebpackPlugin({
      template:path.join(__dirname,`src/page1/index.html`),
      filename:'page1.html'
    }),
      new HtmlWebpackPlugin({
      template:path.join(__dirname,`src/page2/index.html`),
      filename:'page2.html'
    })
  ]
}

// 更好的方法

// 封装一个函数方法 返回2个值  1、遍历后多页面 2、webpack
const fn = ()=>{
  let entry = {}
  let webpackPlugin = []
  const enrtyPage = glob.sync(path.join(__dirname,'./src/*/index.js'))
  Object.keys(enrtyPage).map(()=>{
    // 遍历获取对应多页面的pageinfo 文件夹名称和路径
    webpackPlugin.push(
     new HtmlWebpackPlugin({
          template:path.join(__dirname,`src/${pageName}/index.html`),
          filename:`${pageName}.html`
        }),
    )
  })
  return {
    entry, 
    /**
      {
        page1:'./src/page1/index.js',
        page2:'./src/page2/index.js',
        
      }
    */
    webpackPlugin
    /**
      [
        new HtmlWebpackPlugin({
        template:path.join(__dirname,`src/page1/index.html`),
        filename:'page1.html'
      }),
        new HtmlWebpackPlugin({
        template:path.join(__dirname,`src/page2/index.html`),
        filename:'page2.html'
      })
      ]
    */
  }
}

const {entry,webpackPlugin} = fn()

modules.export = {
  enrty : entry,
  plugins:[].catch(webpackPlugin)
  
}
```

### SourceMap

优点：在开发环境打开sourcemap可以方便进行代码的断点调试，定位到错误发生的行和列

缺点：增加打包时间，并且会暴露源代码，生产环境最好关闭sourcemap

| 关键词     | 含义                           |
| ---------- | ------------------------------ |
| eval       | 使用eval函数包裹代码           |
| source map | 产生独立的.map文件             |
| cheap      | source 不包含列信息            |
| inline     | 不单独生成.map，和js打包到一起 |
| module     | 包含loader                     |

常用的source map devtools类型 就是上面5种类型的排列组合

常见的几种模式：**eval**、**cheap-eval-source-map**、**liline-source-map**、**source-map**、**none**……

**使用方式：**

```javascript
modules.export = {
  devtool:'source-map'
}
```

### 公共资源，库抽离

**核心插件：（html-webpack-externals-plugin、SplitChunksPlugin(webpack4内置插件)）**

```javascript
modules.export = {
  plugins:[
    new HtmlWebpackExternalsPlugin({
      externals:[
        {
          module:'react',
          entry:'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/cjs/react-jsx-dev-runtime.development.js' // cdn 地址
          global:'React'
        },
        {
          module:'react-dom',
          entry:'https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/cjs/react-dom-server-legacy.browser.development.js' // cdn 地址
          global:'ReactDom'
        }
      ]
    })
  ]
}

// index.html
<heade>
  <script	src='https://cdn.bootcdn.net/ajax/libs/react/18.2.0/cjs/react-jsx-dev-runtime.development.js'></script>
  <script	src='https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/cjs/react-dom-server-legacy.browser.development.js'></script>
</heade>
```

### Tree Shaking 

**tree shaking是啥：**一种打包机制，在编译阶段，知道哪些代码是无用代码，无用代码不会进行打包，在uglify阶段自动删除。

**无用代码定义：**

**1、代码永远不会被执行** 

**2、代码执行结果不会被使用**

**3、没有被使用的变量、方法、模块**

**使用条件：**必须使用ES6 import的导入导出方式，commonjs方式tree shaking会失效

**开启条件：**webpack中在.babelrc中设置modules:false 或者设置mode=production自动开启

**原因：**

**1、ES6 只能作用在模块的最顶层  （require 可以作用在任何地方）**

**2、导出的都是模块都是常量	（require 可以根据条件动态导入导出）**

**总结：使用tree shaking 代码必须在编译阶段就确定对应关系，不能到了运行阶段来判断**



### Scope Hoisting

**使用条件：**必须使用ES6 import的导入导出方式，commonjs方式失效

**开启条件：**webpack mode设置为production 自动开启

**核心插件：**（webpack.optimize.ModuleConcatenationPlugin）



### 代码分割

将所有模块打包到一个js文件里显然是不合理的行为，会导致单个js文件过大，加载较慢

可以把非立即执行的代码块，和多模块的公共代码块进行chunk分割，当代码运行需要的时候再进行加载。

优点：

1、抽离相同的代码到一个chunk中

2、实现脚本懒加载，初始加载速度提升

CommonJs：require.ensure

ES6：动态import

**核心插件：（@/babel/plugin-syntax-dynamic-import）**

```javascript
// .babelrc 

{
  "plugins":[
    "@/babel/plugin-syntax-dynamic-import"
  ]
}
```



### ESLint ⭐️⭐️



### 命令行输出内容优化

开发者对构建，并不在乎构建过程中的日志信息，更多是关心构建是否成功，是否有error或warning的情况和对应的原因

| 配置项      | 描述                         |
| ----------- | ---------------------------- |
| errors-only | 只有发生错误才输出           |
| minimal     | 只有发生错误或有新编译才输出 |
| none        | 没有任何输出                 |
| normal      | 标准输出（默认）             |
| verbose     | 全部输出                     |

```javascript
// 开发配置
modules.export = {
  devtool:{
    stats: 'errors-only'
  }
}

// 生产环境
export modules = {
  stats: 'errors-only'
}
```

也可以借助一些插件来进行显眼的提示

**核心插件：（friendly-errors-webpack-plugin）**

**stats 设置 errors-only**

```javascript
modules.export = {
  plugins:[
    new FriendlyErrorWebpackPlugin()
  ]
}
```

### 构建异常中断处理

在webpack早期版本中需要手动去捕获构建的一个结果进行后续处理，

webpack4之后已经帮我们自动完成了这一操作

```javascript
modules.export = {
  plugins:[
    function(){
      this.hooks.done.tap('done',(stats)=>{
        if(stats.compilation.errors 
           && stats.compilation.errors.length 
           && process.argv.indexOf('--watch')===-1){
          //  process.exit(1)  webpack4版本之前 要手动触发process.exit()抛出错误
          // todo something 错误上报等操作
        }
      })
    }
  ]
}
```
