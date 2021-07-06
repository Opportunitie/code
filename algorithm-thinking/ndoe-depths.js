// 各个节点深度之和
// O(n) time | O(h) space
class Tree {
    constructor(val) {
        this.value = val
        this.left = null
        this.right = null
    }
}
function nodeDepthsOne(root) {
    let sumOfDepths = 0;
    let stack = [{ node: root, depths: 0 }]
    while (stack.length) {
        let nodeInfo = stack.pop();
        let { node, depths } = nodeInfo;
        if (!node) {
            continue
        }
        sumOfDepths += depths
        stack.push({ node: root.left, depths: depths + 1 })
        stack.push({ node: root.right, depths: depths + 1 })
    }
    return sumOfDepths
}

// O(n) time | O(h) space
function nodeDepthsTwo(root, depths = 0) {
    if (!root) {
        return 0
    }
    return depths + nodeDepthsTwo(root.left, depths + 1) + nodeDepthsTwo(root.right, depths + 1)
}