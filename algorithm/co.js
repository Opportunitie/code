function *main() {
  let x = yield "starting";
  console.log(x);
  let y = yield (x * 2);

  console.log(x, y);
  return x + y;
}

// let it = main();

// let res = it.next(); // 第一个next()用于启动生成器
// console.log(res.value);  // 输出"starting" （yield语句后跟的值传给了next()的对象）

// res = it.next(5); // 向等待的第一个yield传入值5，*main()中的 x 被赋值为5
// console.log(res.value); // 输出10 （x * 2得到了10传给next(5)运行后的对象）

// res = it.next(20); // 向等待的第二个yield传入值20， *main()中的y被赋值为20
//                  // 输出5 20    （执行后面的console.log(x, y)语句分别输出x,y的值）
// console.log(res.value); // 输出25  (return ...的值传给了next(20)运行后的对象)

function co(gen){
  const g = gen()
  function next(data){
    const result  = g.next(data)
    if(result.done){
      return result.value
    }
    next(result.value)
    // result.value.then(data => next(data))
  }
  next()
}
co(main)