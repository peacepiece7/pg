function Cat(name) {
  this.name = name
}
// method meow를 Cat에 추가했습니다.
Cat.prototype.meow = function () {
  console.log(this.name + ' meow!')
}

const cat = new Cat('hector')
console.log(Cat.__proto__.__proto__.constructor.name)
