// 题目（京东）
// var a = ?; if(a == 1 && a == 2 && a == 3){ console.log(1); }
// let a ={
//   i: 1,
//   toString(){
//     return this.i++
//   }
// }
//  if (a == 1 && a == 2 && a == 3) {
//     console.log(1);
//   }

// let a = [1, 2, 3];
// a.toString = a.shift;
// if (a == 1 && a == 2 && a == 3) {
//   console.log(1);
// }

// 下面代码输出什么？
var a = 10;
(function () {
  console.log(a);
  a = 5;
  console.log(window.a);
  var a = 20;
  console.log(a);
})();
