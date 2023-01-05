//TODO: ts 中的高级类型

// 1、联合类型（Union Types）表示取值可以为多种类型中的一种。




// 2、索引类型  keyof 进行对象的遍历，把遍历的属性名当成一个联合类型


interface Obj {
  a: number
  b: string
}

type key = keyof Obj // key : 'a' | 'b'

// 3、索引访问操作符 T[k]

interface Obj2 {
  a: number
  b: string
}

let type: Obj["a"] = 12


// 用泛型来约束函数的
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}
// console.log('q', getValues({ name: 'lcz', age: 24 }, ["age"]));


// type K = { name: string, age: number }
//  T extend keyof K   ===   T extend ( name | age )




// 3、映射类型
interface obj {
  name: string
  age: number
}

/**
 * 1、只读属性 Readonly 类型中的所有属性，均变为只读
 * 2、可选属性 Partial 类型中的所有属性，均变为可选
 * 3、选择属性 Pick 在已知类型中，选择对应的属性作为新的类型
 * 4、预设属性 Record  把一个已知的类型，分配给定义的属性
 */

type only = Readonly<obj>
let xx: only = {
  name: 'weq',
  age: 24
}

type partial = Partial<obj>
// xx.name = '111'  ❌


type pick = Pick<obj, 'age'>
// pick:{
//   age: number;
// }

type record = Record<"color" | "run", Obj>
// type record = {
//   color: Obj;
//   run: Obj;
// }


// 4、条件类型  T extends U ? X : Y 

type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends Function ? "function" : "object"

type t1 = TypeName<string>   // type t1 = string
type t2 = TypeName<number> // type t2 = "number"

// 联合类型的条件类型
// ( T | K ) extends U ? X : Y  ==> ( T extends U ? X : Y ) | ( K extends U ? X : Y )

type t3 = TypeName<string | number[]>

// 过滤第二个参数中包含的第一个参数中的类型
type Diff<T, K> = T extends K ? never : T
type t4 = Diff<"a" | "b" | "c", "a" | "e">  // "b" | "c"


/**
 * 1、Exclude<T,K> 过滤K中 包含 T 的类型
 * 2、NonNullable<T> T中如果包含空类型，返回{}
 * 3、Extract<T,K> 筛选K中 包含 T 的类型
 * 4、ReturnType<F> 泛型T函数的返回值 作为类型
 */

type zz<T> = NonNullable<T>

type lll = zz<string | number | unknown>

type f = ReturnType<() => number>  // f : number