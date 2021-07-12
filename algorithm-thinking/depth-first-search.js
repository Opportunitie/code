// 深度优先算法
class Node{
    constructor(val) {
        this.value = val
        this.children = []
    }
}

Node.prototype.appendChild = function(val){
    this.children.push(new Node(val))
}
// O(v + e) time | O(v) space
function depthFirstSearch(tree,array){
    if(!tree){
        return
    }
    array.push(tree.value)
    for(child of tree.children){
        depthFirstSearch(child, array)
    }
    return array
}