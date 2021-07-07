// 链表结构
class linkedListConstruction {
    constructor() {
        this.head = null
        this.tail = null
    }
    // O(1) time | O(1) space
    setHead(node) {
        if (!this.head) {
            this.head = node
            this.tail = node
            return
        }
        this.indertBefore(this.head, node)
    }
    // O(1) time | O(1) space
    setTail(node) {
        if (!this.tail) {
            this.setHead(node)
            return
        }
        this.indertAfter(this.tail, node)
    }
    // O(1) time | O(1) space
    indertBefore(node, nodeToInsert) {
        if (nodeToInsert === this.head && nodeToInsert == this.tail) {
            return;
        }
        this.remove(nodeToInsert)
        nodeToInsert.prev = node.prev
        nodeToInsert.next = node
        if (!node.prev) {
            this.head = nodeToInsert
        } else {
            node.prev.next = nodeToInsert
        }
        node.prev = nodeToInsert
    }
    // O(1) time | O(1) space
    indertAfter(node, nodeToInsert) {
        if (nodeToInsert == node.head && nodeToInsert == node.tail) {
            return
        }
        this.remove(nodeToInsert)
        nodeToInsert.prev = node
        nodeToInsert.next = node.next
        if (!node.next) {
            this.tail = nodeToInsert
        } else {
            node.next.prev = nodeToInsert
        }
        node.next = nodeToInsert
    }
    // O(p) time | O(1) space
    indertAtPosition(position, nodeToInsert) {
        if (position == 1) {
            this.setHead(nodeToInsert)
            return
        }
        let node = this.head
        currentPosition = 1
        while (node && currentPosition != position) {
            node = node.next
            currentPosition++
        }
        if (node) {
            this.indertBefore(nodeToInsert)
        }
        this.setTail(nodeToInsert)
    }
    // O(n) time | O(1) space
    removeNodesWithValue(value) {
        let node = this.head
        while (node) {
            let removeNode = node
            node = node.next
            if (removeNode.value == value) {
                this.remove(removeNode)
            }
        }
    }
    // O(1) time | O(1) space
    remove(node) {
        if (this.head === node) {
            this.head = this.head.next
        }
        if (this.tail === node) {
            this.tail = this.head.prev
        }
        removeNodeBindings(this, node)

    }
    // O(n) time | O(1) space
    containsNodeWithValue(self, value) {
        node = self.head
        if (node && node.value !== value) {
            node = node.next
        }
        return !!node
    }

}

function removeNodeBindings(self, node) {
    if (node.prev) {
        node.prev.next = node.next
    }
    if (node.next) {
        node.next.prev = node.prev
    }

    node.prev = null
    node.next = null
}
