// class XiaoJieJie13{
//   constructor(private _age: number){}
//   get age(){
//     return this._age
//   }
//   set age(age:number){
//     this._age = age
//   }
// }


// const dajiao13 = new XiaoJieJie13(28)
// dajiao13.age = 25
// console.log(dajiao13.age);


// 静态类 static

class Girl13{
 static sayLove(){
    return 'I love you!'
  }
}

const girl13:Girl13  = new Girl13()

console.log(Girl13.sayLove());