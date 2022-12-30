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