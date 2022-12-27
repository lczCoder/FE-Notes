interface BaseEvent {
  time: number,
  user: string,
}

interface EventMap {
  event: BaseEvent & {
    id: string,
    color: string,
  },
  checkout: BaseEvent
}

function sendEvent<Name extends keyof EventMap>(name: Name, data: EventMap[Name]): void {
  console.log(name, data);

}

sendEvent('event', { color: '123', time: 12, user: '233', id: '41' })

sendEvent('checkout', { time: 231, user: '41' })



/**
 * keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
 */