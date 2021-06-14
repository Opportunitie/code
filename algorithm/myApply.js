Function.prototype.myApply = function (context){
    if(typeof this !== 'function'){
        throw new TypeError('error')
    }
    if(typeof context !== 'object'){
        throw new TypeError('parameter is no a object!')
    }

    context = context || window
    context.fn = this
    let result
    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }
    delete context.fn
    return result
}

let a = 1

let b ={
    a: 2,
    b: 2
}
function test(){
    console.log(this.a)
}

test.myApply(a)