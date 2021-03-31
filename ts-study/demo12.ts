class Person12 {
  // public name: string;
  // constructor(name: string){
  //   this.name = name
  // }
  constructor(public name: string) {}
}

class Teacher12 extends Person12{
  constructor(public age:number){
    super('haha')
  }
}

const person12 = new Person12("xiaoxiao");
const teacher12 = new Teacher12(18);

console.log(person12.name);
console.log(teacher12.age);
