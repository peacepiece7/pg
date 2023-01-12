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
  for (let i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return list[i]
  }
}

// ! obj1, obj2중 길이가 긴 인자를 기준으로 for문을 돌려야 완벽하게 체크할수 있음
function match(obj1, obj2) {
  if (Object.keys(obj1).length > Object.keys(obj2).length) {
    for (let key in obj1) {
      if (obj1[key] !== obj2[key]) return false
    }
  } else {
    for (let key in obj2) {
      if (obj1[key] !== obj2[key]) return false
    }
  }

  return true
}

// 객체는 검사할 수 없음
function bmatch_no_object(key, val) {
  return function (obj) {
    return obj[key] === val
  }
}

function object(key, val) {
  const new_obj = {}
  new_obj[key] = val
  return new_obj
}

function bmatch(keyOrObj, val) {
  if (arguments.length == 2) keyOrObj = object(keyOrObj, val) // keyOrObj가 문자열인 경우 객체로 변환시킴
  return function (obj2) {
    return match(keyOrObj, obj2)
  }
}

function findIndex(list, predicate) {
  for (let i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return i
  }
  return -1
}

// log(match(find(users, bmatch({ name: 'foo', age: 36 })), find(users, bmatch('age', 36))))

// log(findIndex(users, (user) => user.name === 'fredo'))
log(findIndex(users, bmatch({ name: 'fredo' })))
