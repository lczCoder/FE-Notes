### 1、Loader是什么？

**Webpack中的Loader，本质上就是一个导出函数方法的javascript模块，函数接收参数进行处理后返回新的参数。**

```javascript
modules.export = function(code){
  let newCode;
  // todo
  return newCode
}
```

### 2、Loader执行顺序为什么从右往左（从后往前）

解析less文件示例：

```javascript
modules.export = {

  module:{
      rules:[
        {
          test:/\.less$/,
          loader:[
            'style-loader',
            'css-loader',
            'less-loader',
          ]
        }
      ]
  }
}
```

我们现在已经知道了，loader本质实际上就是一个模块化的导出函数，接收代码进行处理之后再返回出来。我们最初学习webpack的时候，就知道loader有执行顺序，遵循从右到左（从下到上），那为什么会有这种奇怪的机制呢？

解释这个问题前我们要先来了解一个重要的知识点**compose函数**

compose在函数式编程范式中经常会使用到，它的作用就是把任意数量的函数像管道一样连接起来，把公共的数据一层一层处理后往下传递。说到这有些小伙伴可能脑海里就有一些熟悉的场景了，比如jquery中的链式调用【$('root').css().css().text()……】



下面用一些伪代码来简单表示一下这个compose函数的作用和大致流程。

现在我们有几个功能模块函数，`addTwo``reduceOne` `takeTen`分别执行+2 -1 *10等运算操作

```javascript
 // 结果加2
const addTwo = (num) => {
  return num + 2;
};
// 结果减1
const reduceOne = (num) => {
  return num - 1;
};
// 结果*10
const takeTen = (num) => {
  return num * 10;
};
```

我们传入一个初始值，进行一系列加减乘的操作，如果我们正常写的话有如下2种写法

```javascript
const source = 10
// 第一种
const result1 = addTwo(source)
const result2 = reduceOne(result1)
const result3 = takeTen(result2) // 110
// 第二种
const result = takeTen(addTwo(reduceOne(source)))  // 110
```

这两种写法，无论哪一种看起来都非常的不优雅且不合理。接下来我们用compose函数来进行优化

```javascript
const source = 10

// 定义compose函数方法
const compose = (fn1, fn2, fn3) => {
  return (...args) => fn1(fn2(fn3(...args)));
};

const result = compose(addTwo,reduceOne,takeTen)(source)  // 101
```

这样我们就可以通过compose这个函数方法来控制我们传入函数的调用了，不过这种写法缺陷也很明显，函数传参固定了，也没有类型和边界判断。我们也可以更进一步的优化一下这个**compose函数**

```javascript
const source = 10

// 优化后的compose函数
const compose = (...fn) => {
  if (fn.length === 0) {
    return source;
  }
  fn.forEach((item) => {
    if (typeof item !== "function") {
      console.error("compose方法传入的参数必须是function类型");
    }
  });
  if (fn.length == 1) {
    return fn[0];
  }
  return fn.reduce((fn1, fn2) => (...source) => fn1(fn2(...source)));
};

const result = compose(addTwo,reduceOne,takeTen)(source) // 101
```

写到这里，有细心的小伙伴就已经发现了，不对呀，上面咱们执行(source +2 -1)*10 结果是110呀，为什么通过compose函数处理过之后变成101了，这明显不是我们想要的结果。那么是哪里出问题了呢？

还是让我们回到代码中去，compose函数中最核心的一行代码

```javascript
return fn.reduce((fn1, fn2) => (...source) => fn1(fn2(...source)));
```

这里我们通过数组的reduce方法来进行参数列表的调用处理，如果对Array.reduce( )方法不清楚的可以移步至MDN进行查看 [mdn传送门](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

**MDN上对reduce方法的定义：**reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

这么一看是不是非常符合我们compose函数的设计理念呢，下面我们通过一个拆解示意图进行讲解

![img](https://cdn.nlark.com/yuque/0/2022/png/25678107/1661514286368-ef005857-92ce-4a4e-81e5-f768b5fd6d21.png)





















```javascript
// loaderA
function loaderA(code){
  let newCode = code + '-loaderA'
  return newCode 
}

// loaderB
function loaderB(code){
  let newCode = code + '-loaderB'
  return newCode
}

// loader初始化
const initLoader = (...args)=> loaderA(loaderB(...args));
//loader接收的原始代码
const source = 'hello'
// loader处理完的代码
let newSource =  initLoader('hello')

console.log(newSource);  // hello-loaderB-loaderA
```
