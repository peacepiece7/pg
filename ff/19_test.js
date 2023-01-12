const users = [
  { name: 'foo', age: 36 },
  { name: 'bar', age: 21 },
  { name: 'quz', age: 32 },
  { name: 'fredo', age: 20 },
]

function log(val) {
  console.log(val)
  return val
}

function find(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return list[i]
  }
}

// 1. 기본적 사용법
find(users, (user) => user.age == 32)

// 2. bind match (user.age == 32 부분)
/**
 * @param {object} list
 * @param {string} key
 * @returns {boolean}
 */
function bmatch(key, val) {
  return function (obj) {
    return obj[key] === val
  }
}

// log(find(users, bmatch('age', 32)))

// 3. match, a obj와 b obj가 같은지 검사
function match(obj1, obj2) {
  if (!obj1 || !obj2) return false // ! 요고는 내가 추가했는데 find 함수가 undefined를 반환하면 obj1이 undefined라 undefined[key]를 찾으면 에러가 남..
  for (let key in obj2) {
    if (obj1[key] !== obj2[key]) return false
  }
  return true
}

function object(key, val) {
  const obj2 = {}
  obj2[key] = val
  return obj2
}

function bmatch2(obj2, val) {
  if (arguments.length === 2) obj2 = object(obj2, val) // argurment == 2 -> ('age', 32), arguments == 1 => ({name : "john", age : 32})
  return function (obj) {
    return match(obj, obj2)
  }
}

// log(match(find(users, bmatch('name', 'foo')), find(users, bmatch('age', 36))))

// log(match(find(users, bmatch2({ name: 'foo', age: 37 })), find(users, bmatch2('age', 36))))

// log(find(users, bmatch2('age', 36)))

// obj1 = {name : 'foo', age : 36}, obj2 = {name : 'foo', age : 36}
log(match(find(users, bmatch2({ name: 'foo', age: 37 })), find(users, bmatch2('age', 36))))
log(find(users, (user) => user.age == 36 && user.name == 'foo'))
log(find(users, bmatch2({ name: 'foo', age: 36 })))
