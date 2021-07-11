 // O(n) time | O(n) space
 function invertBinaryTreeOne(tree){
     let queue = [tree]
     while (queue.length) {
         let currentNode = queue.pop()
         if(!currentNode){
             continue
         }
         swapLeftAndRight(currentNode)
         queue.push(currentNode.left);
         queue.push(currentNode.right)
     }
 }

 function swapLeftAndRight(node){
     let temp = node.left;
     node.left = node.right;
     node.right = temp
 }

// O(n) time | O(d) space
 function invertBinaryTreeTwo(tree){
     if(!tree){
         return
     }
     swapLeftAndRight(tree)
     invertBinaryTreeTwo(tree.left)
     invertBinaryTreeTwo(tree.right)
 }