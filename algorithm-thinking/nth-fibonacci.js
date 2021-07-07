// 斐波那契

// O(2^n) time | O(n) space  递归
function getNthFibOne(n) {
    if (n == 1) {
        return 0
    }
    if (n == 2) {
        return 1
    }
    return getNthFibOne(n - 1) + getNthFibOne(n - 2)
}
// O(n) time | O(n) space 递归
function getNthFibTwo(n, memoize = {1:0,2:1}){
    if(n in memoize){
        return memoize[n]
    }
    memoize[n] = getNthFibTwo(n-1, memoize) + getNthFibTwo(n-2,memoize)
    return memoize[n]
}


// O(n) time | n(1) space
function getNthFibThree(n) {
    let init = [0, 1]
    let count = 3
    while (count <= n) {
        let nextFib = init[0] + init[1]
        init[0] = init[1];
        init[1] = nextFib;
        count++
    }
    return n == 1 ? init[0] : init[1]
}

console.log("1",getNthFibOne(6));
console.log("2",getNthFibTwo(6));
console.log("3",getNthFibThree(6));
