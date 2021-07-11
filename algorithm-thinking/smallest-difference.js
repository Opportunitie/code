// 最小差值
// O(nlogn + mlogm) time | O(1) space
function smallestDifference(arrayOne, arrayTwo) {
    arrayOne.sort((a, b) => a - b)
    arrayTwo.sort((a, b) => a - b)
    let current = Infinity
    let smallest = Infinity
    let indexOne = 0;
    let indexTwo = 0;
    let smallestNums = []
    while (indexOne < arrayOne.length && indexTwo < arrayTwo.length) {
        let valueOne = arrayOne[indexOne]
        let valueTwo = arrayTwo[indexTwo]
        if (valueOne < valueTwo) {
            current = valueTwo - valueOne
            indexOne++
        } else if (valueOne > valueTwo) {
            current = valueOne-valueTwo
            indexTwo++
        } else {
            return [valueOne, valueTwo]
        }
        if (current < smallest) {
            smallest = current
            smallestNums = [valueOne, valueTwo]
        }
    }
    return smallestNums
}

let arrOne = [-1,5,10,20,28,3];
let arrTwo = [26,134,135,15,17]

console.log("one", smallestDifference(arrOne,arrTwo));