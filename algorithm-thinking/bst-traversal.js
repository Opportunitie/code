
// 遍历搜索二叉树
// O(n) time | O(n) space
function inOrderBstTraversal(tree, array) {
    if (tree) {
        inOrderBstTraversal(tree.left, array)
        array.push(tree.value)
        inOrderBstTraversal(tree.right, array)
    }
    return array
}

function preOrderBstTraversal(tree,array){
    if(tree){
        array.push(tree.value)
        preOrderBstTraversal(tree.left,array);
        preOrderBstTraversal(tree.right,array)
    }
    return array
}

function postOrderBstTraversal(tree,array){
    if(tree){
        postOrderBstTraversal(tree.left,array)
        postOrderBstTraversal(tree.right,array)
        array.push(tree.value)
    }
    return array
}