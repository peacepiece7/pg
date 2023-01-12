// 프로퍼티가 숨겨져 있다면 유용하지 못함
const users = [
  { name: 'foo', age: 36 },
  { name: 'bar', age: 21 },
  { name: 'quz', age: 32 },
  { name: 'fredo', age: 20 },
]

const findBy = (key, list, val) => {
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i][key] == val) return list[i]
  }
}

console.log(findBy('name', users, 'fredo'))
console.log(findBy('age', users, 32))
