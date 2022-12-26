interface Coordinate {
  x: number,
  y: number
}

// 函数重载
function show(obj: Coordinate): Coordinate;
function show(x: number, y: number): Coordinate;
function show(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0
  }

  if (typeof arg1 === 'object') {
    coord = {
      ... (arg1 as Coordinate)
    }
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number
    }
  }

  return coord
}


console.log(show({ x: 1, y: 2 }));
console.log(show(3, 4));



/**
 * 当一个函数的形参有可能是多种数据类型的时候，可以用函数重载的方法进行多种类型接收的定义
 * 然后在函数内 通过typeof 等类型校验来判断传入的参数类型，以及做出相对于的处理方式和返回
 * 传入的参数类型可以不一致，
 * 但是函数的返回类型必须一致 或者为void
 */