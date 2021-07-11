// O(n) time | O(n) space  

// 还有两周方法 # TODO
function minHeightBst(array) {
    return constructorMinHeightBst(array, 0, array.length - 1)
}

function constructorMinHeightBst(array, startIndex, endIndex) {
    if (startIndex > endIndex) {
        return null;
    }
    let middleIndex = Math.floor((startIndex + endIndex) / 2)

    let bst = new Bst(array[middleIndex])

    bst.left = constructorMinHeightBst(array, startIndex , middleIndex-1)
    bst.right = constructorMinHeightBst(array, middleIndex + 1, endIndex)
    return bst
}


class Bst {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
    insert(value) {
        if (value >= this.value) {
            if (!this.right) {
                this.right = new Bst(value)
            } else {
                this.right.insert( value)
            }
        } else if(value < this.value){
            if (!this.left) {
                this.left = new Bst(value)
            } else {
                this.left.insert(tree.left, value)
            }
        }
    }
}


let arrs = [1,2,5,7,10,13,14,15,22]
console.log(minHeightBst(arrs));