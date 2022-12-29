//  泛型

; (function () {
  function useState<T>(value: T): [() => T, (v: T) => void] {
    let str = value
    return [
      () => {
        return str
      },
      (v) => {
        str = v
      }
    ]
  }

  const [getV, setV] = useState<null | number | string>(null)
  console.log(getV());
  setV(100)
  console.log(getV());
  setV("lcz")
  console.log(getV());
})


  // 实现一个需求，一个打印函数，支持传入不同类型参数，返回的类型就是传入参数的类型

  // 实现方案1：函数重载   
  // 优点：没啥优点
  // 缺点：支持一个类型，就得手动添加一个重载函数，不灵活
  ; (function () {
    function print(param: string): string;
    function print(param: number): number;
    function print(param: boolean): boolean;
    function print(param: unknown): unknown {
      return param
    }
    console.log(print(10));
    console.log(print('231'));
    console.log(print(true));
  })

  // 实现方案2：联合类型 
  // 优点：比函数重载少了很多代码，看起来更直观
  // 缺点：和函数重载一样，不够灵活，每当扩展一个新的类型的时候，需要手动添加
  ; (function () {
    type paramType = number | string | boolean
    function print(param: paramType): unknown {
      return param
    }
    console.log(print(100));
    console.log(print('100'));
    console.log(print(false));
  })

  // 实现方案3：any
  // 优点：比较灵活，能接收任意类型的参数
  // 缺点：使用any会使ts失去类型校验,失去了类型之间的约束关系
  ; (function () {
    function print(param: any): any {
      return param
    }
    console.log(print(100));
    console.log(print("110"));
    console.log(print(false));
  })

  // 实现方案4 泛型
  // 缺点：增加学习成本
  // 优点：既满足了传参的任意类型，也保持了ts的类型校验
  ; (function () {
    function print<T>(param: T): T {
      return param
    }
    // console.log(print<number>(90));
    // console.log(print<string>("120"));
    // console.log(print<boolean | string>(false));
  })

  ; (function () {
    interface Log<T = number> {
      name: T
    }

    let log: Log = {
      name: 12
    }
    class B<T>{
      // static x:T  ×
      constructor(public name: T) {

      }
      run<T>(s: T): void {
        console.log(s);
      }
    }

    const b = new B('2')
    b.run(1)
  })


  /**
   * 1、泛型接口调用的时候，必须手动传入指定的类型，或者在定义泛型的时候设置一个默认类型
   * 2、class中，静态成员static 无法使用泛型来定义其类型
   */


  ; (function () {
    type Log = {
      length:number
    }
    function pri<T extends Log>(v: T): void {
      console.log(v, v.toString);
    }
    pri('123')

  })()

  /**
   * 泛型优点：
   * 1、可以使函数，类，接口支持多种类型，增强程序之前的一个扩展性和灵活性
   * 2、减少使用函数重载，any ,冗余的联合类型声明，增强代码可读性
   * 3、灵活控制class和接口之间的约束
   */