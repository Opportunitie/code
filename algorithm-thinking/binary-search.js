// 二分查找

// O(logn) time | O(logn) space

function binarySearch(array, target) {
    return binarySearchHelper(array, target, left = 0, right = array.length - 1)
}
function binarySearchHelper(array, target, left, right) {
    if (left > right) {
        return -1
    }
    let middle = Math.floor((left + right) / 2)
    if (array[middle] == target) {
        return middle
    }
    if (target < array[middle]) {
        return binarySearchHelper(array, target, left, middle - 1)
    } else {
        return binarySearchHelper(array, target, middle + 1, right)
    }
}
// O(logn) time | O(1) space
function binarySearchTwo(array, target) {
    return binarySearchHelperTwo(array, target, left = 0, right = array.length - 1)
}
function binarySearchHelperTwo(array, target, left, right) {
    let middle
    while (left <= right) {
        middle = Math.floor((left + right) / 2)
        if (array[middle] == target) {
            return middle
        }
        if (target < array[middle]) {
            right = middle - 1
        } else {
            left = middle + 1
        }
    }
    return -1
}

let arr = [1, 2, 3, 5, 9, 12, 16]
console.log("one", binarySearch(arr, 12));
console.log("two", binarySearchTwo(arr, 12));