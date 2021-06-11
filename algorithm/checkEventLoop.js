setTimeout(() => {
  console.log(1);
  Promise.resolve(2).then((value) => console.log(2));
  setTimeout(() => {
    console.log(3);
    Promise.resolve(4).then((value) => console.log(4));
  }, 0);
  process.nextTick(() => console.log(10));
  Promise.resolve(5).then((value) => console.log(5));
}, 0);
setTimeout(() => {
  console.log(6);
}, 0);

setImmediate(() => {
  console.log(8);
});

process.nextTick(() => console.log(9));

// timers                // 异步函数的回调函数
// pending callbacks     // 系统内部处理
// idle prepare          // 系统内部处理
// poll                  // 系统内部处理，这里会执行poll队列的函数
                         // 1. 执行pol队列中的函数，直到poll队列执行完或者到达阈值（最大数量限制）
                              // 2. 检测check中是否有setImmediate执行，有的话进入check阶段
                              // 3. 没有的话，看看是否有timer到到达执行时间
                                 // 4.有就去timer执行回调
                                 // 5.没有 等待poll中加入callback
                              

// check                 // 执行setImmediate 的回调函数
// close callbacks      // 一些关闭的回调函数 如socket.on('close',....)