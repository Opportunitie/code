// 寻找字串
let arrayData = [-2, -1, 6, 3, 8, 9, 4, 5, 18]
let sequenceArrayData = [-1, 3, 5, 18]

// O(n) time | O(1) space
function validateSubsequenceOne(array, sequence) {
    let arrIdx = 0
    let seqIdx = 0
    while (arrIdx < array.length && seqIdx < sequence.length) {
        if (sequence[seqIdx] === array[arrIdx]) {
            seqIdx++
        }
        arrIdx++
    }
    return seqIdx === sequence.length
}

console.log("one", validateSubsequenceOne(arrayData, sequenceArrayData));

// O(n) time | O(1) space
function validateSubsequenceTwo(array, sequence) {
    let seqIdx = 0
    // for (let i = 0; i < array.length; i++) {     // 正常for
    // for (let i in array) {                       // in  i 为 数组index 
    for (let i of array) {         i             // of i 为 数组value
        if (seqIdx === sequence.length) {
            break
        }
        // if (sequence[seqIdx] === array[i]) {
        // if (sequence[seqIdx] === array[i]) {
        if (sequence[seqIdx] === i) {
            seqIdx++
        }
    }
    return seqIdx === sequence.length
}
console.log("two", validateSubsequenceTwo(arrayData, sequenceArrayData));