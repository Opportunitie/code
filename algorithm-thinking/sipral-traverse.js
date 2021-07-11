
// O(n) time | O(n) space 
function sipralTraverseOne(array) {
    let result = []
    let startCol = 0;
    let endCol = array[0].length - 1;
    let startRow = 0;
    let endRow = array.length - 1;

    while (startCol <= endCol && startRow <= endRow) {
        for (let col = startCol; col <= endCol; col++) {
            result.push(array[startRow][col])
        }

        for (let row = startRow + 1; row <= endRow; row++) {
            result.push(array[row][endCol])
        }

        for (let col = endCol - 1; col >= startCol; col--) {
            result.push(array[endRow][col])
        }

        for (let row = endRow - 1; row > startRow; row--) {
            result.push(array[row][startCol])
        }

        startCol++;
        endCol--;
        startRow++
        endRow--
    }
    return result
}
// O(n) time | O(n) space
function sipralTraverseTwo(array) {
    let result = []
    sipralFill(array, 0, array[0].length - 1, 0, array.length - 1, result)
    return result
}

function sipralFill(array, startCol, endCol, startRow, endRow, result) {
    if (startCol > endCol && startRow > endRow) {
        return
    }

    for (let col = startCol; col <= endCol; col++) {
        result.push(array[startRow][col])
    }

    for (let row = startRow + 1; row <= endRow; row++) {
        result.push(array[row][endCol])
    }

    for (let col = endCol - 1; col >= startCol; col--) {
        result.push(array[endRow][col])
    }

    for (let row = endRow - 1; row > startRow; row--) {
        result.push(array[row][startCol])
    }
    sipralFill(array, startCol + 1, endCol - 1, startRow + 1, endRow - 1, result)
}


let arrs = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7]
]
console.log(sipralTraverseOne(arrs));
console.log(sipralTraverseTwo(arrs));