// 首先，new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。

// 普通函数、对象、new (构造函数)
function fun() {
    console.log(this.a);
}
var a = 1;
fun()


const obj = {
    a: 2,
    foo: fun
}
obj.foo()


const c = new fun()


// 箭头函数
function a() {
    return () => {
        return () => {
            console.log(this)
        }
    }
}
console.log(a()()())

// bind、apply、call
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?


let fn2 = function fn1() {
    return function () {
        return fn.apply()
    }.apply(a)
}
fn2()

let a = { name: 'yck' }
function foo() {
    console.log(this.name)
}
foo.bind(a)() // => 'yck'