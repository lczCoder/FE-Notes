class Animal {
  name: string = ""
  constructor(name: string) {
    this.name = name
    console.log('this', this);
  }
  run() {
    console.log('run');
  }
}

class Dog extends Animal {
  color: string = ""
  constructor(name: string, color: string) {
    super(name)
    this.color = color
    this.run()
  }
  private cry() {
    console.log('汪汪汪');
  }

  go() {
    this.cry();
  }
}

; (function () {
  class PersonPublic {
    name: string
    constructor(name: string) {
      this.name = name
    }
    run() {
      console.log('跑步');

    }
  }
  const person = new PersonPublic('小吴')
  console.log(person.name);
  person.run()

  class Student extends PersonPublic {
    constructor(name: string) {
      super(name)
    }
  }
  const student = new Student('小王')
  console.log(student.name);
  student.run()
})

  ; (function () {
    class PersonPrivate {
      private name: string
      constructor(name: string) {
        this.name = name
      }
      private run() {
        console.log('跑步');
      }
    }
    class Student extends PersonPrivate {
      constructor(name: string) {
        super(name)
      }
    }
    const student = new Student('xx')
    // student.name   ×
    // student.run()  ×
  })

  ; (function () {
    class PersonProtected {
      protected name: string
      constructor(name: string) {
        this.name = name
      }
      protected run() {
        console.log('跑步');
      }
    }
    const person = new PersonProtected('zz')
    // person.name  ×
    // person.run() ×

    class Student extends PersonProtected {
      constructor(name: string) {
        super(name)
        this.run()
      }
    }
  })

  ; (function () {
    class Person {
      readonly color = '123'
      public style: string = "null"


      constructor(public name: string) {
      }
      run() {
        // this.color = '231'
        this.style = "21"
      }
    }
    const person = new Person('we')
    // person.color = '231' ×

    class Stud extends Person {
      constructor(name: string) {
        super(name)
      }
      set() {
        // this.color = '231'   ×
      }
    }
  })

  ; (function () {
    class Person {
      static color: string = "white"
      constructor() {

      }
    }
    const person = new Person()
    // console.log(person.color);   ×
    console.log(Person.color);

    class Stu extends Person {
      constructor() {
        super()
      }
    }
    console.log(Stu.color);
    Stu.color = '123'
    console.log(Stu.color);
  })

  ; (function () {
    abstract class Person {
      public abstract name:string
      constructor() {

      }
      abstract say<T>(s:T):T
    }

    class Stu extends Person{
      constructor(public name:string){
        super()
      }
      say<T>(s:T): T {
        return s
      }
    }
    const stu = new Stu('231')
    stu.say(true)
  })



;(function(){
  class Person {
    constructor(){

    }
    sleep(){
      return this
    }
    run(){
      return this
    }
  }
  const per = new Person()
  per.sleep().run()

  class Stu extends Person{
    say(){
      return this
    }
  }

  const stu = new Stu()
  stu.run().say().sleep()

})



/**
 * ts在class中提供了6个修饰符
 * 1、public 公共，class中的属性和方法默认都是public 可被子类继承和实例化，（可以被修改）
 * 2、private 私有 给constructor 加上private属性，这个类不能被实例化，也不能被继承
 *    给某个方法和属性加上private, 该属性和方法只能在该类中使用，无法在实例化中使用和继承
 * 3、protected 受保护 该属性和方法 只能被子类继承，无法进行实例化
 * 4、readonly 只读属性，无法在自身，子类或者实例中进行修改
 * 5、static 只能通过自身或者子类来访问，无法被实例化, 但可以被修改
 * 6、abstract 抽象类，抽象类只能被继承，无法被实例化，需要子类实现抽象方法和属性
 */

/**
 * 在class中返回this,可以实现链式调用，和多态子类父类的连续调用
 */