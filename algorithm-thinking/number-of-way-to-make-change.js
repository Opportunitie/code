
// O(dn) time | O(n) space
function numberOfWayToMakeChange(n, denoms){
    let ways = []
    for (let i = 0; i <= n; i++) {
        ways[i] = 0
    }
    ways[0] = 1
    for(let denom of denoms){
        for (let amount = 1; amount <= n; amount++) {
            if(denom <= amount){
                ways[amount] = ways[amount] + ways[amount - denom]
            }
        }
    }
    return ways[n]
}

let arrs = [1,5,10,25]
console.log(numberOfWayToMakeChange(10,arrs));