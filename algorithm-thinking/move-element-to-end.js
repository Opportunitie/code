
// O(n) time | O(1) space
function moveElementToEnd(arr,moveTo){
    let i = 0;
    let j = arr.length - 1;
    while(i < j){
        while(i < j && arr[j] == moveTo){
            j--
        }
        if(arr[i] == moveTo){
            swap(arr,i,j)
        }
        i++
    }
    return arr
}


function swap(arr,i, j){
    let temp = arr[i];
    arr[i] = arr[j]
    arr[j] =  temp
}

let arrs = [2,1,2,2,2,2,3,4,2]
console.log(moveElementToEnd(arrs,2));