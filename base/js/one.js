// 对象转换时内置[[ToPrimitive]]函数
let a = {
    valueOf(){
        return 0
    },

    toString(){
        return "1"
    },
    [Symbol.toPrimitive](x){
        return 2
    }
}

console.log('aa',1 + a);
// 四则运算符

// +
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"

'a' + + 'b' // -> "aNaN"

// *
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN

// 比较运算符
let a = {
    valueOf() {
      return 0
    },
    toString() {
      return '1'
    }
  }
  a > -1 // true
