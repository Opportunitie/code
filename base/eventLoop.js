// js 单线程
// 进程
// 进程说明：进程描述了 CPU 在运行指令及加载和保存上下文所需的时间
// 线程
// 线程说明：线程是进程中的更小单位，描述了执行一段指令所需的时间。

// 详细解释
/* 
 把这些概念拿到浏览器中来说，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程，比如渲染线程、JS 引擎线程、HTTP 请求线程等等。
  当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。

  上文说到了 JS 引擎线程和渲染线程，大家应该都知道，在 JS 运行的时候可能会阻止 UI 渲染，这说明了两个线程是互斥的。
  这其中的原因是因为 JS 可以修改 DOM，如果在 JS 执行的时候 UI 线程还在工作，就可能导致不能安全的渲染 UI。
  这其实也是一个单线程的好处，得益于 JS 是单线程运行的，可以达到节省内存，节约上下文切换时间，没有锁的问题的好处。 
*/

// node 种Event Loop
/*
  timer 
  pending callbacks
  idle prepare
  poll
  check
  closs callbacks
*/
// nextTick
// 说明: process.nextTick这个函数是独立在Event Loop之外的，它有一个自己的队列，每次阶段执行完后，如果存在nextTick,就会清空队列里面的回调函数，并且优先于当前其他microtask执行。
setTimeout(() => {
    console.log('timer1')
}, 0)
Promise.resolve().then(function () {
    console.log('promise1')
})
process.nextTick(() => {
    console.log('nextTick')
    process.nextTick(() => {
        console.log('nextTick')
        process.nextTick(() => {
            console.log('nextTick')
            process.nextTick(() => {
                console.log('nextTick')
            })
        })
    })
})