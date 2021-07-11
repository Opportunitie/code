

// O(n) time | O(d) space
function validateBinarySearchTree(tree){
    return validateBinarySearchTreeHelper(tree,-Infinity, Infinity)
}

function validateBinarySearchTreeHelper(tree, minValue, maxValue){
    if(!tree){
        return true
    }
    if(tree.value < minValue || tree.value >= maxValue){
        return false
    }
    let leftIsValide = validateBinarySearchTreeHelper(tree.left, minValue, tree.value) 
    return leftIsValide && validateBinarySearchTreeHelper(tree.right, tree.value,maxValue)
}