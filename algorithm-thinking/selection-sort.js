// 选择排序
// O(n^2) time | O(1) space
function selectionSort(array){
    let currentIndex = 0;
    while(currentIndex < array.length - 1){
        let smallerIndex = currentIndex;
        for (let i = currentIndex + 1; i < array.length; i++) {
            if(array[smallerIndex] > array[i]){
                smallerIndex = i
            }
        }
        swap(currentIndex,smallerIndex,array)
        currentIndex++
    }
    return array
}

function swap(i, j, array){
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

let arrs = [1, 2, 4, 5, 67, -2, -4, -7, 3, 144, 22];
console.log(selectionSort(arrs));