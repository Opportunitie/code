function quickSort(arr){
  if(arr.length <= 1){
    return arr
  }
  let left = []
  let right = []
  let pivot = arr[0]
  for(let i = 1; i < arr.length; i++){
    if(pivot > arr[i]){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(pivot,quickSort(right))
}


let arr = [1,3,2,6,4,6,9,7,8]
console.log(quickSort(arr))