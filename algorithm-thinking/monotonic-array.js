// 单调数组
// O(n) time | O(1) space
function monotonicArrayOne(array){
    if(array.length < 2){
        return true
    }
    let direction = array[1] - array[0]
    for (let j = 2; j < array.length; j++) {
        if(direction == 0){
            direction = array[j] - array[j-1];
            continue;
        }
        if(isMonotonic(direction,array[j],array[j-1])){
            return false
        }
    }
    return true
}

function isMonotonic(direction,currentInt,privousInt){
    if(direction > 0){
        return currentInt - privousInt < 0
    }
    return currentInt -privousInt > 0
}

// O(n) time | O(1) space
function monotonicArrayTwo(array){
    let isNonedecreasing = true
    let isNoneIncreasing = true
    for (let index = 1; index < array.length; index++) {
        if(array[index] > array[index - 1]){
            isNoneIncreasing = false
        }
        if(array[index] < array[index - 1]){
            isNonedecreasing = false
        }
    }
    return isNonedecreasing || isNoneIncreasing
}

let arrs = [-9,-6,-2,1,4,7,9]
console.log(monotonicArrayOne(arrs));
console.log(monotonicArrayTwo(arrs));