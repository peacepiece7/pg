const users = [
  { name: 'foo', age: 36 },
  { name: 'bar', age: 21 },
  { name: 'quz', age: 32 },
  { name: 'fredo', age: 20 },
]
const map = (list, iteratee) => {
  const new_list = []
  for (let i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]))
  }
  return new_list
}
const filter = (list, predicate) => {
  const new_list = []
  for (let i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i])
  }
  return new_list
}
const bvalue = (key) => (list) => list[key]

// 1.
const ages = map(
  filter(users, (user) => user.age < 30),
  bvalue('age')
)
// console.log(ages)

// 2.
const bvalues = (key) => (list) => map(list, (v) => v[key])
const keyedValues = bvalues('age')
const ages2 = filter(keyedValues(users), (age) => age < 30)
// console.log(ages2)

// 3.
const under_30 = (u) => u.age < 30
const ages3 = map(filter(users, under_30), bvalue('age'))
// console.log(ages3)

// 4.
const ages4 = bvalues('age')(filter(users, under_30))
console.log(ages4)
