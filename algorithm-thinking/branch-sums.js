// 二叉树个分支求和
class BinaryTree {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}
// O(n) time | O(n) space

function branchSum(root) {
    let sums = []
    calculateBranchSums(root, 0, sums)
    return sums
}

function calculateBranchSums(node, runningSum, sums) {
    if (node) {
        return
    }
    let newRunningSum =runningSum + node.value
    if (!node.left && !node.right) {
        sums.push(runningSum)
        return
    }
    calculateBranchSums(node.left, newRunningSum, sums)
    calculateBranchSums(node.right, newRunningSum, sums)
}