// 回文检查
// O(n^2) time | O(n) space
function palindromeCheckOne(str) {
    let newStr = ""
    for (let value of str.split('').reverse().join("")) {
        newStr += value
    }
    return newStr == str
}
// O(n) time | O(n) space
function palindromeCheckTwo(str) {
    let newStr = []
    for (let value of str.split('').reverse().join("")) {
        newStr.push(value)
    }
    return newStr.join('') == str
}
// O(n) time | O(n) space
function palindromeCheckThree(str, i = 0) {
    let j = str.length - 1 - i
    if (i >= j) {
        return true
    } else{
        return str[i] == str[j] && palindromeCheckThree(str, i + 1)
    }

}
// O(n) time | O(1) space
function palindromeCheckFour(str){
    let left = 0;
    let right = str.length - 1;
    while(left < right){
        if(str[left] != str[right]){
            return false
        }
        left++
        right--
    }
    return true
}




let arrs = "abcdcba"
console.log("one", palindromeCheckOne(arrs));
console.log("two", palindromeCheckTwo(arrs));
console.log("three", palindromeCheckThree(arrs));
console.log("four", palindromeCheckFour(arrs));