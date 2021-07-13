

function singleCycleCheck(array) {
    let numVisited = 0
    let currentIdx = 0
    while (numVisited < array.length) {
        if (numVisited > 0 && currentIdx == 0) {
            return false
        }
        numVisited++
        currentIdx = getNextIdx(array, currentIdx)
    }
    return true
}

function getNextIdx(array, currentIdx) {
    let jump = array[currentIdx]
    currentIdx = (currentIdx + jump) % array.length

    return currentIdx >= 0 ? currentIdx : currentIdx + array.length
}

let arrs = [2,3,1,-4,-4,2]
console.log(singleCycleCheck(arrs));
