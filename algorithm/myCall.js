Function.prototype.myCall = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }

    if(typeof context !== 'object'){
        throw new TypeError('parameter is no a object!')
    }
    
    context = context || window
    context.fn = this
    const arg = [...arguments].slice(1)
    const result = context.fn(...arg)
    delete context.fn
    return result
}

let b = 1

const c = {
    b: 10,
    c: 11
}

function test(){
    console.log(this.b)
}

test()

test.myCall(c)