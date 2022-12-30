// ts 类型保护机制
// 通过一些方法，让ts能够在特定的区块中，确保变量的类型，因此可以在该区块放心调用变量的属性或者方法，以及该类型的原型方法

class Java {
  name: string = 'java'
  java(): void {
    console.log('java');
  }
  run: string = 'run'
}

class JavaScript {
  name: string = 'javascript'
  javascript(): void {
    console.log('javascript');
  }
  say: number = 1
}

// 判断fn 是否具有java或者javascript方法 有的话就调用

// 直接用js的判断方法，会报错，提示不存在属性
// ; (function print() {
//   const fn = true ? new Java() : new JavaScript()
//   if (fn.java) {
//     fn.java()
//   } else {
//     fn.javascript()
//   }
// })

// 解决方案1：用类型断言的方法来给fn 进行类型设定
; (function () {
  const fn = true ? new Java() : new JavaScript()
  if ((fn as Java).java) {
    (fn as Java).java()
  } else {
    (fn as JavaScript).javascript()
  }
})

  // 解决方案2：用instanceof 用来判断某个实例，是否属于某个类
  ; (function () {
    const fn = true ? new Java() : new JavaScript()
    if (fn instanceof Java) {
      fn.java()
    } else {
      fn.javascript()
    }
  })

  // 解决方案3：in 关键字 用来判断某个属性是否在一个对象中
  ; (function () {
    const fn = true ? new Java() : new JavaScript()
    if ('run' in fn) {
      fn.java()
    } else {
      fn.javascript()
    }
  })

  // 用typeof 来判断基本类型
  ; (function (v: number | string | number[]) {
    if (typeof v == 'number') {
      console.log(v.toFixed());
    } else if (typeof v == 'string') {
      console.log(v.length);
    } else {
      v.concat([])
    }
  })

  // 通过一个自定义校验函数来判断类型
  ; (function () {
    function isJava(fn: Java | JavaScript): fn is Java {
      return (fn as Java).java !== undefined
    }

    const fn = true? new Java() : new JavaScript()
    if(isJava(fn)){
      fn.java()
    }else{
      fn.javascript()
    }
  })
