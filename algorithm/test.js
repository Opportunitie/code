function qsort(arr){
    if(arr.length <= 1){
        return arr
    }
    let left = [];
    let right = []
    let pivot = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(arr[i] < pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return qsort(left).concat(pivot,qsort(right))
}

let a = [2,1,5,4,6,8,7,9,0]

// console.log(qsort(a)); 


function binSearch(arr,data){
    let min = 0;
    let max = arr.length - 1;
    let mid
    while(min <= max){
        mid = Math.floor((min + max) / 2);
        if(data < arr[mid] ){
            max = mid - 1
        }else if(data > arr[mid]){
            min = mid + 1
        }else{
            return mid
        }
    }
    return -1
}
console.log(binSearch(a,10));