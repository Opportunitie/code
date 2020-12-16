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

// 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
let obj = { 1: 222, 2: 123, 5: 888 };
let result = Array.from({ length: 12 }).map(
  (_, index) => obj[index + 1] || null
);
console.log("result", result);

// 实现一个Promise.finally
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reson) => P.resolve(callback()).then(() => reson)
  );
};

//随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
function newArr(arr) {
  let sortArr = Array.from(new Set(arr)).sort((a, b) => a - b);
  let map = new Map();
  sortArr.forEach((item) => {
    const key = Math.floor(item / 10);
    let group = map.get(key) || [];
    group.push(item);
    map.set(key, group);
  });
  return [...map.values()];
}
console.log(newArr([2, 10, 3, 4, 5, 11, 10, 11, 20]));

//如何把一个字符串的大小写取反（大写变小写小写 变大写），例如 ’AbC' 变成 'aBc' 。
const fanString = "aBc";
function fanZhuanStirng(str) {
  return str
    .split("")
    .map((item) =>
      item.toUpperCase() === item ? item.toLowerCase() : item.toUpperCase()
    )
    .join("");
}
console.log(fanZhuanStirng(fanString));

//实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位 置。
const findString = function (str, targetStr) {
  if (str.length < targetStr.length) return -1;
  for (let i = 0; i <= str.length - targetStr.length; i++) {
    if (str.slice(i, i + targetStr.length) === targetStr) {
      return i;
    }
  }
  return -1;
};
console.log(findString("abcdscsegsdtgeg", "geg"));
console.log("abcdscsegsdtgeg".indexOf("geg1")); // indexOf查找到返回字符串第一次出现的位置，未找到返回-1

//example 1
var a = {},
  b = "123",
  c = 123;
a[b] = "b";
a[c] = "c";
console.log(a[b]);

//example 2
var a = {},
  b = Symbol("123"),
  c = Symbol("123");
a[b] = "b";
a[c] = "c";
console.log(a[b]);

// example 3
var a = {},
  b = { key: "123" },
  c = { key: "456" };
a[b] = "b";
a[c] = "c";
console.log(a[b]);
for(let key in a){
  console.log( key )
  console.log( typeof key )
}