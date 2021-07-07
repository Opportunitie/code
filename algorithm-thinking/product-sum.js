// 乘积之和
// O(n) time | O(d) space
function productSum(array, multipler = 1){
    let sum = 0
    for(ele of array){
        if(Array.isArray(ele)){
            sum += productSum(ele, multipler + 1)
        }else{
            sum += ele
        }

    }
    return sum * multipler
}

let arr = [5,2,[7,-1],3,[6,[-13,8],4]]

console.log(productSum(arr));