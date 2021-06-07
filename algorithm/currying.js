// 函数柯里化
// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;


function currying(){
  let data = [... Array.from(arguments)]
  let _add = function (){
    if(arguments.length === 0){
      return data.reduce((sum, current) => sum + current, 0)
    }else{
      data = data.concat(Array.from(arguments))
      return _add
    }
  }
  return _add
}

console.log(currying(1)(2)(3)());
