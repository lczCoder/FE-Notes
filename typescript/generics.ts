//  泛型

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


