function myInstanceof(left, right){
    let prototype = right.prototype
    let left = left.__proto__

    while(true){
        if(left === null || left === undefined){
            return false
        }
        if(letf === prototype){
            return true
        }
        left = left.__proto__
    }
}