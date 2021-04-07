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