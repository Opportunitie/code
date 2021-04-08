// 浅拷贝(解决一层问题)

// shadowCopy1
let a1 = {
    age: 1
}

let b1 = Object.assign({}, a1)
a1.age = 2

console.log('a', b1.age)

// shadowCopy1
let a2 = {
    age: 1
}
let c = { ...a2 }
a2.age = 2
console.log('a', c.age)

// deepCopy
let deep = {
    age: 1,
    jobs: {
        first: 'FE'
    }
}

let d = JSON.parse(JSON.stringify(deep))

deep.jobs.first = 'native'

console.log('d',d.jobs.first);

// JSON.parse(JSON.stringify(deep) 方法局限性
// 忽略 undifined
// 忽略 symbol
// 不能序列化函数
// 不能解决循环引用的对象
// demo 1
let obj = {
    a: 1,
    b: {
      c: 2,
      d: 3,
    },
  }
  obj.c = obj.b
  obj.e = obj.a
  obj.b.c = obj.c
  obj.b.d = obj.b
  obj.b.e = obj.b.c
  let newObj = JSON.parse(JSON.stringify(obj)) // 报错
  console.log(newObj) 

  let e = {
    age: undefined,
    sex: Symbol('male'),
    jobs: function() {},
    name: 'yck'
  }
  let f = JSON.parse(JSON.stringify(e))
  console.log(f) // {name: "yck"}

  // MessageChannel
function structturalClone(obj){
    return new Promise(resolve =>{
        const {port1 = null, port2 = null} = new MessageChannel()
        port2.onmessage = ev => resolve(ev.data)
        port1.postMessage(obj)
    })
}
  var objM = {
    a: 1,
    b: {
      c: 2
    }
  }
  
  objM.b.d = objM.b

  const test = async ()=>{
      const clone = await structturalClone(objM)
      console.log('clone',clone);
  }
  
  test()

  // 实现简单的deepClone
  function deepClone(obj){
      function isObject(obj){
          return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
      }

      if(!isObject(obj)){
        throw new Error('非对象');
      }

      const isArray = Array.isArray(obj)
      let newObj = isArray?[...obj]:{...obj}
      Reflect.ownKeys(newObj).forEach(item =>{
          newObj[item] = isObject(newObj[item])?deepClone(newObj[item]): newObj[item]
      })

      return newObj
  }
  let objD = {
    a: [1, 2, 3],
    b: {
      c: 2,
      d: 3
    }
  }
  let newObj = deepClone(objD)
  objD.b.c = 1;
  console.log(newObj.b.c);