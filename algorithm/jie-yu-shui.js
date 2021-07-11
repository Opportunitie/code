
function jieYuShui(arr){
    if(arr.length <= 2){
        return 0;
    }
    let sum = 0;
    let left = 0;
    let right= arr.length - 1;

    let l_max = arr[0];
    let r_max = arr[right];

    while (left < right) {
        l_max = Math.max(l_max,arr[left]);
        r_max = Math.max(r_max,arr[right]);
        if(l_max < r_max){
            sum += l_max -  arr[left];
            left++;
        }else{
            sum += r_max -  arr[right];
            right--;
        }
    }
    return sum
}

let arrs = [4,2,0,3,2,5]
console.log(jieYuShui(arrs));