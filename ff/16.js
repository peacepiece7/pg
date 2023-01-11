function User(id, name, age) {
  this.id = id
  this.name = name
  this.age = age
  this.getId = () => {
    return this.id
  }
  this.getName = () => {
    return this.name
  }
  this.getAge = () => {
    return this.age
  }
}

// prettier-ignore
const users = [
    new User(1, 'john', 13),
    new User(2, 'foo', 20),
    new User(3, 'fredo', 21),
    new User(4, 'waldo', 32),
    new User(3, 'fredo', 21),
    new User(4, 'waldo', 32)
]

// 이거는 메서드 출력되는거 보기싫어서 적음
for (let i = 0; i < users.length; i++) {
  Object.defineProperty(users[i], 'getName', {
    enumerable: false,
  })
  Object.defineProperty(users[i], 'getAge', {
    enumerable: false,
  })
  Object.defineProperty(users[i], 'getId', {
    enumerable: false,
  })
}

function find(list, predicate) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return list[i]
  }
}

const user = find(users, (user) => user.getName() === 'waldo')

console.log(user)
