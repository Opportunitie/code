let arr = [3,4,1,2,6,5,9,8,7]

function bubbleSort(arr){
  if(arr.length <= 1 ){
    return arr
  }
  for(let i = 0; i <arr.length; i++){
    let done = true
    for(let j= 1; j<arr.length - i;j++){
      if(arr[j-1] > arr[j] ){
        let temp = arr[j]
        arr[j] = arr[j-1]
        arr[j-1] = temp
        dont = false
      }
    }
    if(done){
      break
    }
  }
  return arr
}

console.log(bubbleSort(arr))