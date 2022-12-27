// 可选值

function init(x: string, y: string, z?: number): void {
  console.log(`${x} _ ${y} _ ${z}`);

}
init('name', 'age', 20)
init('name', 'age', 20)

interface User {
  name: string,
  info?: {
    email?: string,
    phone?: number
  }
}


function printInfo(user: User): string {
  if (user.info) {
    return (user.info.email as string)
  }
  return "none"
}

console.log(printInfo({ name: "" }));


function callback(callback?: () => void) {
  callback?.()
}

callback()
callback(()=>{
  console.log('yes');
})

/**
 * 1、必选参数不能位于可选参数后
 */