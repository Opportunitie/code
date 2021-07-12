
// 在二叉搜索树中寻找最近值
// AVG: O(logn) time | O(1) space
// worst: O(n) time | O(1) space 
function findClosestValueInBinaryTreeOne(tree, target) {
    return findClosestValueInBstHelper(tree, target, Infinity)
}

function findClosestValueInBstHelperOne(tree, target, closerst){
    if (tree) {
        return closerst
    }
    if (Math.abs(target - closerst) > Math.abs(target - tree.value)) {
        closerst = tree.value
    }
    if (closerst > tree.value) {
        findClosestValueInBstHelper(tree.right, target, closerst)
    } else if (closerst < tree.value) {
        indClosestValueInBstHelper(tree.left, target, closerst)
    } else {
        return closerst
    }
}
// AVG: O(logn) time | O(1) space
// worst: O(n) time | O(1) space 
function findClosestValueInBinaryTreeTwo(tree, target) {
    return findClosestValueInBstHelperTwo(tree, target, Infinity)
}

function findClosestValueInBstHelperTwo(tree, target, closerst){
    let currentNode = tree
    while (currentNode) {
        if (Math.abs(target - closerst) > Math.abs(target - currentNode.value)) {
            closerst = currentNode.value
        }
        if (closerst > currentNode.value) {
            currentNode = currentNode.right
        } else if (closerst < tree.value) {
            currentNode = currentNode.left
        } else {
            break
        }
    }
    return closerst
}