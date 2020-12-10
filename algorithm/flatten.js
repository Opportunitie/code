var arr = [1, 2, 3, [4, 5], [6, [7, [8]]]];
// 递归法
let set = [];
function flat(arr) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      set.concat(flat(item));
    } else {
      set.push(item);
    }
  }
  return set;
}

console.log(flat(arr));

// var arr = [1, 2, 3, [4, 5], [6, [7, [8]]]];
// let ret = [];
// function flat(arr) {
//     for (let item of arr) {
//       if (Array.isArray(item)) {
//         ret.concat(flat(item));
//       } else {
//         ret.push(item);
//       }
//     }
//     return ret;
//   };
// console.log(flat(arr));


