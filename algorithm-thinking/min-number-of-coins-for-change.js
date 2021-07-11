 
// 最小找钱硬币量
// O(nd) time | O(n) space 
function minNumberOfCoinsForChange(n,array){
    let numOfCoins = (new Array(n + 1)).fill(Infinity)
    numOfCoins[0] = 0
    for(let denom of array){
        for (let amount = 0; amount <= n ; amount++) {
            if(denom <= amount){
                numOfCoins[amount] = Math.min(numOfCoins[amount],numOfCoins[amount-denom] + 1)  // 思想
            }
        }
    }
    return numOfCoins[n] == Infinity ? -1: numOfCoins[n]
}

let arrs = [1,2,4]
console.log(minNumberOfCoinsForChange(6,arrs));