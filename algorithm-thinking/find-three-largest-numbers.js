// 最大的三个数
// O(n) time | O(1) space
function findThreeLargestNumbers(array) {
    let largestNumbers = [null, null, null]
    updateLargestNumbers(array, largestNumbers)
    return largestNumbers
}

function updateLargestNumbers(array, largestNumbers) {
    for (let value of array) {
        if (!largestNumbers[2] || value > largestNumbers[2]) {
            shiftAndUpdate(largestNumbers, value, 2)
        } else if (!largestNumbers[1] || value > largestNumbers[1]) {
            shiftAndUpdate(largestNumbers, value, 1)
        } else if (!largestNumbers[0] || value > largestNumbers[0]) {
            shiftAndUpdate(largestNumbers, value, 0)
        }
    }
}

function shiftAndUpdate(largestNumbers, num, index) {
    for (let i = 0; i <= index; i++) {
        if (i == index) {
            largestNumbers[index] = num
        } else {
            largestNumbers[i] = largestNumbers[i + 1]
        }
    }
}

let arrs = [1, 2, 4, 5, 67, -2, -4, -7, 3, 144, 22]
console.log(findThreeLargestNumbers(arrs));