let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
]

function formatData(arr) {
    let result = []
    let itemMap = {}

    for (let item of arr) {
        if (!itemMap[item.id]) {
            itemMap[item.id] = item
        }

        if (item.pid == 0) {
            result.push(item)
        } else {
            if (!itemMap[item.pid].children) {
                itemMap[item.pid].children = []
            }
            itemMap[item.pid].children.push(item)
        }
        
    }
    return result
}

console.log(formatData(arr));