// 实现 (5).add(3).minus(2) 功能。

Number.prototype.add = function (x) {
  return this.valueOf() + x;
};
Number.prototype.minus = function (y) {
  return this.valueOf() - y;
};
console.log("(5).add(3).minus(2)", (5).add(3).minus(2));

var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);

let c = 1
a = b = c
console.log(a)
console.log(b)

let a = {n: 1}
let b = a
a = {n: 2}

console.log(a)
console.log(b)