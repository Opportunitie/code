// 闭包含义：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。
// demo 1
function A() {
    let a = 1;
    global.B = function () {
        console.log('a', a);
        a = null
    }
}

A()
B()

// 经典面试题
for (var i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, i * 1000)
}

// solutionOne
for (var i = 0; i <= 5; i++) {
    (function (j) {
        setTimeout(() => {
            console.log(j);
        }, j * 1000)
    })(i)
}

// solutionTwo
for (var i = 0; i <= 5; i++) {
    setTimeout((x) => {
        console.log(x);
    }, i * 1000, i)
}

// solutionThree
for(let i = 0; i <= 5; i++ ){
    setTimeout(()=>{
        console.log(i);
    }, i*1000)
}
