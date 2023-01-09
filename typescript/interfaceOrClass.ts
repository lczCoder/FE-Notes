; (function () {
  interface Person {
    name: string
    eat(food: string): void
  }

  class Student implements Person {
    public name: string = ""
    constructor() {

    }
    eat(food: string): void {

    }
    say() {

    }
  }
})

  ; (function () {
    interface Person {
      name: string
      age: number
    }

    interface Child extends Person {
      sex: string
    }
  })




  ; (function () {
    class Person {
      name: string = ""
      age = 123
      constructor() {

      }
      say() {
        console.log('say');
      }
      run() {
        console.log('run');

      }
    }

    interface Human extends Person {

    }

    const human: Human = {
      name: "",
      age: 23,
      say: () => {
        return true
      },
      run: () => { }
    }


  })()




/**
 * class继承class使用关键字 extends
 * 接口继承class 使用关键字 extends
 * 接口约束class 使用关键字 implements
 * 
 */

/**
 * 1、接口只能约束类的公有成员 public 不能约束private等私有属性或方法
 * 2、接口不能约定类的构造函数
 * 3、子类可以同时继承基类和接口约束
 */

/**
 * 1、接口是可以进行继承的，一个接口可以继承一个或者多个接口
 * 2、接口可以继承类，不过只能抽象属性和方法，没有具体的功能实现
 */

/**
 * ts中 接口具有申明合并的能力 定义了多个同名的接口，最后ts会把这些接口合并成一个，不同属性的会进行追加，相同的属性如果定义不同类型会有报错提示
 * 特殊点: 如果相同接口中定义了多个重名的函数类型，会被认为为函数重载
 * 这样的函数重载顺序 遵循 当前接口上到下，不同接口 下到上
 * 如果函数重载的类型 是字符串字面量，会进行提升，也遵守上述的排序原则
 */