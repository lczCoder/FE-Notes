// ts 类型推断

/**
 * 1、在ts编辑器中，表达式会默认从右向左进行一个类型的推断
 */
let a = 123
// 这个时候 ts就会根据赋值 123 推断出a的类型为number类型, 后续无法给a设置其他类型的值

// 如果遇到多个类型的组合，ts会自动推断出一个兼容2种类型的联合类型 
let b = [1, false, () => { }] // (number | boolean | (() => void))[]

/**
 * 有一种情况，会产生从左到右的一个类型推断
 * 一般发生在一些触发或者回调的事件函数中
 */



window.onclick = (e) => {
  console.log(e.button);
}

// 这个时候，会根据window.onclick 推断出参数e的类型是 MouseEvent
// 并且在e被调用的时候，提示对应的属性和方法


/**
 * 当需要调用一个原本类型上不存在的属性或者方法的时候，可以通过类型断言，或者接口来改变其本身的类型
 */
interface Run {
  run: () => void
}

let x = {

} as Run

console.log(x.run);

