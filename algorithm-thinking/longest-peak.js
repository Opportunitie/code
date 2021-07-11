// 最大峰值长度
// O(n) time | O(1) space
function longestPeak(array) {
    let longest = 0;
    i = 1
    while (i < array.length - 1) {
        let ispeek = array[i] > array[i - 1] && array[i] > array[i + 1]
        if (!ispeek) {
            i++;
            continue
        }
        let leftIndex = i - 2;
        while (leftIndex >= 0 && array[leftIndex + 1] > array[leftIndex]) {
            leftIndex--;
        }
        let rightIndex = i + 2;
        while (rightIndex <= array.length - 1 && array[rightIndex - 1] > array[rightIndex]) {
            rightIndex++
        }
        let longth = rightIndex - leftIndex - 1
        longest = Math.max(longth, longest)
        i = rightIndex
    }
    return longest
}

let arrs = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
console.log(longestPeak(arrs));