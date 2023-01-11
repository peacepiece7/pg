const users = [
  { name: 'foo', age: 36 },
  { name: 'bar', age: 21 },
  { name: 'quz', age: 32 },
  { name: 'fredo', age: 20 },
]

const map = (list, iteratee) => {
  const new_list = []
  for (let i = 0; i < list.length; i++) {
    new_list.push(iteratee(list[i]))
  }
  return new_list
}
const filter = (list, predicate) => {
  const new_list = []
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) new_list.push(list[i])
  }
  return new_list
}

// 1.
const under_30 = (u) => u.age < 30
const under_30_age1 = map(filter(users, under_30), (v) => v.age)

// 2.
const bvalues = (key) => (list) => list[key]
const under_30_age2 = map(filter(users, under_30), bvalues('age'))
console.log(under_30_age1)
console.log(under_30_age2)

// 3.
const ages = (list) => map(list, (v) => v.age)
const under_30_age3 = ages(filter(users, (user) => user.age < 30))

// 4.
const bvalue = (key) => (obj) => obj[key]

const bal1 = (key) => (list) => map(list, (v) => v[key])
const bval2 = (key) => {
  const value = bvalue(key)
  return (list) => map(list, value)
}
const ages2 = bal1('age')
console.log(ages2(users))
console.log(bval2('age')(users))

console.log(map(users, (v) => bvalue('age')(v)))
console.log(map(users, bvalue('age')))
