// // 类的只读属性
// class Person14{
//   public readonly _name: string
//   constructor(name: string){
//     this._name = name
//   }
// }

// const person14 = new Person14('dajiao')
// console.log(person14._name);

// 抽象类 抽象方法
abstract class Girl {
  abstract skill():void;
}

class Waiter extends Girl {
  skill() {
    console.log("请喝水");
  }
}

class BaseTeacher extends Girl {
  skill() {
    console.log("请喝水2");
  }
}

class SeniorTeacher extends Girl {
  skill() {
    console.log("请喝水3");
  }
}
