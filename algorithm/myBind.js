Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('this is not a function')
    }
    const _this = this
    context = context || window
    const arg = [...arguments].slice(1)

    return function F(){
        if (_this instanceof F) {
            return new _this(...arg, ...arguments)
        } else {
            return _this.apply(context, arg.concat(...arguments))
        }
    }
}


let a = {
    b:2,
    fn: function(){
        console.log(this.b); 
    }
}

let c = a.fn.myBind(a)
c()

