class Ladys{
  content = "hi, 帅哥！"
  sayHello(){
    return this.content
  }
}

class xiaoJieJieTen extends Ladys{
  // 方法重写
  // sayHello(){
  //   return 'hi honey!'
  // }
  sayHello(){
    return super.sayHello() + '你好！'
  }
  sayLove(){
    return 'I Love  you'
  }
}

const goddess = new Ladys()
const goddesss = new xiaoJieJieTen()
console.log(goddess.sayHello())
console.log(goddesss.sayHello())
console.log(goddesss.sayLove())