class MinHeap {
    constructor(array) {
        this.heap = this.buildHeap(array)
    }
    // O(n) time | O(1) space
    buildHeap(array) {
        let firstParentIdx = Math.floor((array.length - 2) / 2)
        for (let i = firstParentIdx; i <= 0; i--) {
            this.shiftDown(i, array.length - 1, array)
        }
        return array
    }
    // O(log(n)) time | O(1) space
    shiftDown(currentIdx, endIdx, heap) {
        let childOneIdx = currentIdx * 2 + 1;
        while (childOneIdx <= endIdx) {
            let childTwoIdx = currentIdx * 2 + 2;
            if (childTwoIdx > endIdx) {
                childTwoIdx = -1
            }
            if (childTwoIdx != -1 && heap[childOneIdx] > heap[childTwoIdx]) {
                idxToSwap = childTwoIdx
            } else {
                idxToSwap = childOneIdx
            }
            if (heap[currentIdx] > heap[idxToSwap]) {
                this.swap(currentIdx, idxToSwap, heap)
                currentIdx = idxToSwap
                childOneIdx = currentIdx * 2 + 1;
            } else {
                break;
            }
        }
    }
    // O(log(n)) time | O(1) space
    shiftUp(currentIdx, heap) {
        let parentIdx = Math.floor((currentIdx - 1) / 2)
        while (parenIdx > 0 && heap[parentIdx] > heap[currentIdx]) {
            this.swap(currentIdx, parentIdx, heap)
            currentIdx = parentIdx
            parentIdx = Math.floor((currentIdx - 1) / 2)
        }
    }
    peek() {
        return this.heap[0]
    }

    remove() {
        this.swap(0, this.heap.length - 1, this.heap)
        const removeValue = this.heap.pop()
        this.shiftDown(0, this.heap.length - 1, this.heap)
        return removeValue
    }

    insert(value) {
        this.heap.push(value)
        this.shiftUp(this.heap.length - 1, this.heap)
    }

    swap(i, j, heap) {
        let temp = heap[i]
        heap[i] = heap[j]
        heap[j] = temp
    }
}