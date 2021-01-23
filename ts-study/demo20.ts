// 泛型
function join<T,P>(first:T,second:P){
  return `${first}${second}`
}
// join('aaa',1) // 类型推断
join<string, number>('aaa',1) // （推荐使用）

// 泛型中数组使用
function myFun<T>(params:Array<T>){
  return params;
}
// function myFun<ANY>(params:ANY[]){
//   return params;
// }

myFun<string>(['123','456'])