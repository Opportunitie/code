// 不适用四则运算求和
function sum(a,b){
    if(a === 0 ){
        return b
    }
    if(b === 0){
        return a
    }
    let newA = a ^ b
    let newB = (a & b) << 1
    return sum(newA,newB)
}

console.log(sum(5,6));
