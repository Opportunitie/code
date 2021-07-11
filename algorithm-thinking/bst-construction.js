
class Bst {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    // O(logn) time | O(1) space
    // O(n) time | O(1) space
    insert(value) {
        let currentNode = this
        while (true) {
            let nodeValue = currentNode.value
            if (value < nodeValue) {
                if (!currentNode.left) {
                    currentNode.left = new Bst(value)
                    break
                } else {
                    currentNode = currentNode.left
                }
            } else if (value >= nodeValue) {
                if (!currentNode.right) {
                    currentNode.right = new Bst()
                    break
                } else {
                    currentNode = currentNode.right
                }
            }
        }
        return this
    }
    // O(logn) time | O(1) space
    // O(n) time | O(1) space
    contains(value) {
        let currentNode = this
        while (currentNode) {
            let nodeValue = currentNode.value
            if (value < nodeValue) {
                currentNode = currentNode.left
            } else if (value > nodeValue) {
                currentNode = currentNode.right
            } else {
                return true
            }
        }
        return false
    }

    remove(value, parentNode = None){
        // # TODO 23
    }
}