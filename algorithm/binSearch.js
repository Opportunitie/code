function binSearch(arr, target){
  let upperBound = arr.length - 1
  let lowerBound = 0
  let mid 
  while(lowerBound <= upperBound){
    mid = Math.floor((upperBound+lowerBound) / 2)
    if(arr[mid] > target){
      upperBound = mid -1;
    }else if(arr[mid] < target){
      lowerBound = mid + 1
    }else{
      return mid  
    }
  }
  return -1
}

let arr = [1,3,4,5,6,7,8]
console.log(binSearch(arr, 4))