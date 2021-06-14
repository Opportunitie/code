/* 
* new 
* 创建一个空对象
* 获取构造函数
* 为空对象绑定原型
* 绑定this并且执行构造函数
* 返回新对象（确保返回的值为对象）

*/

function create() {
    let obj = {}
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, ...arguments)
    return result instanceof Object ? result : obj
}


// 纯属虚构
function F(x) {
    return function f(){
        this.x = x 
        console.log(this.x)
    }
}

let a = create(F(1))
console.log('11',a.x);