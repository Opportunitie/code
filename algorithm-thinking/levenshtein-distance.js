
// O(MN) time | O(MN) space
function levenshtein(str1, str2) {
    let arr = []
    for (let i = 0; i <= str1.length; i++) {
        arr[i] = [];
        for (let j = 0; j <= str2.length; j++) {
            if (i == 0) {
                arr[i][j] = j
            } else if (j == 0) {
                arr[i][j] = i
            } else {
                arr[i][j] = 0
            }
        }
    }
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i-1] === str2[j-1]) {
                arr[i][j] = 1
            } else {
                arr[i][j] = 1 + Math.min(arr[i - 1][j - 1], arr[i - 1][j], arr[i][j - 1])
            }
        }

    }
    return arr[str1.length][str2.length]
}

// O(MN) time | O(min(M,N)) space  31




let str1 = 'abc'
let str2 = 'yabd'

console.log(levenshtein(str1, str2));
