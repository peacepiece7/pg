const users = [
  { name: 'foo', age: 36 },
  { name: 'bar', age: 21 },
  { name: 'quz', age: 32 },
  { name: 'fredo', age: 20 },
]

function log(value) {
  console.log(value)
  return value
}

function filter(list, predicate) {
  const new_list = []
  for (let i = 0, len = list.length; i < len; i++) predicate(list[i]) && new_list.push(list[i])
  return new_list
}
function map(list, iteratee) {
  const new_list = []
  for (let i = 0, len = list.length; i < len; i++) new_list.push(iteratee(list[i]))
  return new_list
}
const name_over_30 = map(
  filter(users, (user) => user.age > 30),
  (user) => user.age
)

// console.log(name_over_30)

module.exports = {
  filter,
  map,
  log,
}
