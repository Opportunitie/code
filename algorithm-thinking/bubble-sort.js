// 冒泡排序 （稳定）
// O(n^2) time | O(1) space
function bubbleSort(array){
    let isSortable = false
    let counter = 0
    while(!isSortable){
        isSortable = true
        for (let i = 0; i < array.length - 1 - counter; i++) {
            if(array[i] > array[i+1]){
                swap(i,i+1,array)
                isSortable = false
            }
        }
        counter++
    }
    return array
}

function swap(i,j,array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp
}

let arrs = [1, 2, 4, 5, 67, -2, -4, -7, 3, 144, 22];
console.log(bubbleSort(arrs));