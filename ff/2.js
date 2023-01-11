const users = [
  { name: 'foo', age: 36 },
  { name: 'bar', age: 21 },
  { name: 'quz', age: 32 },
  { name: 'fredo', age: 20 },
]
function addMaker(a) {
  return function (b) {
    return a + b
  }
}
const sum = addMaker(5)(10)
const add = addMaker(5)

console.log(sum, add(5), add(10))
