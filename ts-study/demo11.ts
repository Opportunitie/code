// private protected public


 // 类的内部和类的外部
class PersonneEleven {
  public name: string // 默认public 
  //  private name: string; // 只能在类的内部使用
  //  protected name: string; // 在类的内部或者子类中使用
   public sayHello(){
     console.log("say Hello!")
   }
}

class Teacher extends PersonneEleven{
  public sayBye(){
    return this.name
  }
}

const personEleven = new PersonneEleven()
const teacher = new Teacher()

personEleven.name = 'xiaoxiao'
teacher.name = 'haha'
console.log(personEleven.name);
personEleven.sayHello()
console.log(teacher.sayBye());