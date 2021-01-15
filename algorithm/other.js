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
for (let key in a) {
  console.log(key);
  console.log(typeof key);
}

// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
// 示例 1： 输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
// 输出: [5, 6, 7, 1, 2, 3, 4] 解释: 向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6] 向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5] 向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
// 示例 2：
// 输入: [-1, -100, 3, 99] 和 k = 2
// 输出: [3, 99, -1, -100] 解释: 向右旋转 1 步: [99, -1, -100, 3] 向右旋转 2 步: [3, 99, -1, -100]

function scrollArr(arr, k) {
  let tempArr = [...arr];
  for (let i = 0; i < k; i++) {
    tempArr.unshift(tempArr.pop());
  }
  return tempArr;
}

console.log(scrollArr([3, 99, -1, -100], 3));

function scrollArrOptimization(arr, k) {
  let temArr = [...arr];
  let arrLength = temArr.length;
  let transformNum = k % arrLength;
  return temArr.slice(arrLength - k).concat(temArr.slice(0, arrLength - k));
}
console.log(scrollArrOptimization([3, 99, -1, -100], 1));

// 打印出 1 - 10000 之间的所有对称数

function symmetryNumber() {
  return [...new Array(1000).keys()].filter(
    (item) =>
      item.toString().length > 1 &&
      item.toString() === item.toString().split("").reverse().join("")
  );
}
console.log(symmetryNumber());

// 实现一个add函数
// add(1)(2);
// add(1)(2)(3)；
// add(1, 2)(3);
function add(...arg) {
  let a = [...arg];
  let _add = function (...innerArg) {
    if (innerArg.length === 0) {
      return a.reduce((pre, val) => pre + val);
    } else {
      // [].push.apply(a, innerArg)
      a = a.concat(innerArg);
      return _add;
    }
  };
  return _add;
}

console.log(add(1, 2)(3)(4, 5, 6)()); // 6

// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返 回 [0, 1]
// 给定 nums = [2, 7, 11, 15], target = 9 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返 回 [0, 1]
function anwer(arr, target) {
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = i;
  }
  for (let j = 0; j < arr.length; j++) {
    let temp = target - arr[j];
    if (map[temp]) {
      return [j, map[temp]];
    }
  }
  return -1;
}
console.log(anwer([2, 7, 11, 15], 9));

//

let list = [
  { id: 1, name: "部门 A", parentId: 0 },
  { id: 2, name: "部门 B", parentId: 0 },
  { id: 3, name: "部门 C", parentId: 1 },
  { id: 4, name: "部门 D", parentId: 1 },
  { id: 5, name: "部门 E", parentId: 2 },
  { id: 6, name: "部门 F", parentId: 3 },
  { id: 7, name: "部门 G", parentId: 2 },
  { id: 8, name: "部门 H", parentId: 4 },
];

function convert(arr){
  let result = []
  let map = arr.reduce((res,value)=>{
    res[value.id]=value
    return res
  },{})
  for(let item of arr){
    if(item.parentId === 0){
      result.push(item)
      continue
    }
    if(item.parentId in map ){
      parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return result
}

console.log(convert(list))




























// function convert(list) {
//   const res = [];
//   const map = list.reduce((res, v) => {
//     res[v.id] = v;
//     return res;
//   }, {});
//   console.log("map", map);
//   for (const item of list) {
//     if (item.parentId === 0) {
//       res.push(item);
//       continue;
//     }
//     if (item.parentId in map) {
//       const parent = map[item.parentId];
//       parent.children = parent.children || [];
//       parent.children.push(item);
//     }
//   }
//   return res;
// }

console.log(convert(list));

// [
//   {
//     id: 1,
//     name: "部门 A",
//     parentId: 0,
//     children: [
//       {
//         id: 3,
//         name: "部门 C",
//         parentId: 1,
//         children: [{ id: 6, name: "部门 F", parentId: 3 }],
//       },
//       {
//         id: 4,
//         name: "部门 D",
//         parentId: 1,
//         children: [{ id: 8, name: "部门 H", parentId: 4 }],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "部门 B",
//     parentId: 0,
//     children: [
//       { id: 5, name: "部门 E", parentId: 2 },
//       { id: 7, name: "部门 G", parentId: 2 },
//     ],
//   },
// ];
