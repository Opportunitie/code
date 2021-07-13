

class Node{
    constructor(value){
        this.value =value
        this.children=[]
    }
    append(value){
        this.children.push(new Node(value))
    }
    // O(V+E) time | O(v) space
    breadthFirstSearch(){
        let array = []
        let queue = [this]

        while (queue.length > 0) {
            let currentNode = queue.shift()
            array.push(currentNode.name)
            for(let node of currentNode.children){
                queue.push(node)
            }
        }
        return array
    }
}