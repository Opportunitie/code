
// O(wh) time | O(wh) space
function riverSiszs(matrix) {
    let size = []
    let visited = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            visited[i][j] = false
        }
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (visited[i][j]) {
                continue;
            } else {
                traverseNode(i, j, matrix, visited, size)
            }
        }
    }
    return size
}

function traverseNode(i, j, matrix, visited, size) {
    let currentRiverSize = 0;
    let nodeExpert = [[i, j]]
    while (nodeExpert.length) {
        let node = nodeExpert.pop()
        let i = node[0]
        let j = node[1]
        if (visited[i][j] || !matrix[i][j]) {
            continue;
        }
        currentRiverSize++
        unvisitedNeighbors = getUnvisitedNeighbor(i, j, matrix, visited)
    }
    if (currentRiverSize) {
        size.push(currentRiverSize)
    }
}

function getUnvisitedNeighbor(i, j, matrix, visited) {
    let unVisitedNeighbors = []
    if (i > 0 && !visited[i - 1][j]) {
        unVisitedNeighbors.push([i - 1, j])
    }
    if (i < matrix.length - 1 && !visited[i + 1][j]) {
        unVisitedNeighbors.push([i + 1, j])
    }
    if (j > 0 && !visited[i][j - 1]) {
        unVisitedNeighbors.push([i, j - 1])
    }
    if (j < matrix[0].length - 1 && !visited[i][j + 1]) {
        unVisitedNeighbors.push([i, j + 1])
    }
    return unVisitedNeighbors
}