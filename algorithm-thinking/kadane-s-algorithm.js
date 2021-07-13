

//O(n) time | O(i) space
function kadanesAlgorithm(array){
    let maxSumHere = array[0];
    let maxSofar = array[0]
    for (let i = 1; i < array.length; i++) {
        maxSumHere = Math.max(array[i], array[i] + maxSumHere)
        maxSofar = Math.max(maxSumHere,maxSofar)
    }   
    return maxSofar
}
let arrs = [3,5,-9,1,3,-2,3,4,7,2,-9,6,3,1,-5,4]
console.log(kadanesAlgorithm(arrs));