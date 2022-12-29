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