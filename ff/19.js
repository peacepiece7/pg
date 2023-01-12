const users = [
  { name: 'foo', age: 36 },
  { name: 'bar', age: 21 },
  { name: 'quz', age: 32 },
  { name: 'fredo', age: 20 },
]

function find(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return list[i]
  }
}

function bmatch(key, val) {
  return function (obj) {
    return obj[key] === val
  }
}

// console.log(find(users, bmatch('age', 32)))

function object(key, val) {
  let obj = {}
  obj[key] = val
  return obj
}

function match(obj, obj2) {
  for (let key in obj2) {
    if (obj[key] !== obj2[key]) return false
  }
  return true
}

function bmatch2(obj2, val) {
  if (arguments.length == 2) obj2 = object(obj2, val)
  return function (obj) {
    return match(obj, obj2)
  }
}

console.log(find(users, bmatch2('age', 32)))
console.log(match(find(users, bmatch2('age', 32), find(users, bmatch2('name', 'fredo')))))

// 2. findIndex
function findIndex(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return i
  }
  return -1
}

console.log(findIndex(users, bmatch2({ name: 'fredo', age: 20 })))
