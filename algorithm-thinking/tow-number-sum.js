
// 两数之和
let arrayData = [-2, -1, 6, 3, 8, 9, 4, 5, 18]

// O(n^2) time | O(1) space
function methodOne(array, target) {
    let innerArray = [...array]
    for (let i = 0; i < innerArray.length; i++) {
        for (let j = i + 1; j < innerArray.length; j++) {
            if (innerArray[i] + innerArray[j] === target) {
                return [innerArray[i], innerArray[j]]
            }
        }
    }
    return []
}

console.log('one', methodOne(arrayData, 10));

// O(n) time | O(n) space
function methodTwo(array, target) {
    let innerArray = [...array]
    let tempObj = {}
    for (let i = 0; i < innerArray.length; i++) {
        let potentialMatch = target - innerArray[i]
        if (tempObj[potentialMatch]) {
            return [innerArray[i], potentialMatch]
        } else {
            tempObj[innerArray[i]] = true
        }
    }
    return []
}

console.log('Two', methodTwo(arrayData, 10));

// O(n) time | O(1) space
function methodThree(array, target) {
    let innerArray = array.sort(function (a, b) {
        return a - b
    })
    let left = 0
    let right = innerArray.length - 1
    while (left < right) {
        if (innerArray[left] + innerArray[right] === target) {
            return [innerArray[left], innerArray[right]]
        } else if (innerArray[left] + innerArray[right] > target) {
            right--
        } else if (innerArray[left] + innerArray[right] < target) {
            left++
        }
    }
    return []
}

console.log('Three', methodThree(arrayData, 10));