
// O(n) time | O(n) space
function maxSubsetSumNoAdjacentOne(array){
    if(!array.length){
        return 0
    }
    if(array.length == 1){
        return array[0]
    }
    let maxSums = [array[0]]
    maxSums[1] = Math.max(array[0],array[1])
    for (let i = 2; i < array.length; i++) {
        maxSums[i] = Math.max(maxSums[i-1],maxSums[i-2] + array[i])
    }
    return maxSums[maxSums.length - 1]
}
// O(n) time | O(1) space
function maxSubsetSumNoAdjacentTwo(array){
    if(!array.length){
        return 0
    }
    if(array.length == 1){
        return array[0]
    }
    let secend = array[0]
    let first = Math.max(array[0],array[1])
    for (let i = 2; i < array.length; i++) {
        current = Math.max(first, secend + array[i])
        secend = first;
        first = current
    }
    return first
}


let arrs = [7,10,12,7,9,14]
console.log('one',maxSubsetSumNoAdjacentOne(arrs));
console.log('two',maxSubsetSumNoAdjacentTwo(arrs));