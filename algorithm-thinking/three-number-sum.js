// 找出数组中三个数之和等于target的所有序列
// O(n^2) time | O(n) space
function threeNumberSum(array,target){
    array.sort((a,b)=>a-b)
    let triples = []
    for (let i = 0; i < array.length - 2; i++) {
        let left = i+1;
        let right = array.length -1;
        while(left < right){
            let tempSum = array[i] + array[left] + array[right]
            if(tempSum == target){
                triples.push([array[i],array[left],array[right]])
                left++
                right--
            }else if(tempSum > target){
                right--
            }else if(tempSum< target){
                left++
            }
        }
    }
    return triples
}

let arrs = [-8,-6,1,2,3,5,6,12]

console.log(threeNumberSum(arrs,0));