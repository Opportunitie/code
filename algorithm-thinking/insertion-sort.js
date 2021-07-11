// 插入排序
// O(n^2) time | O(1) space
function insertionSort(array){
    for (let i = 1; i < array.length; i++) {
        let j = i
        while(j > 0 && array[j] < array[j-1]){
            swap(array,j,j-1)
            j--
        }
    }
    return array
}

function swap(array,i,j){
    let temp = array[j]
    array[j] = array[i]
    array[i] = temp
}


let arrs = [1, 2, 4, 5, 67, -2, -4, -7, 3, 144, 22]
console.log(insertionSort(arrs));