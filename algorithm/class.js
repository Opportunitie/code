class A{
  constructor(){
    this.x = 1
  }
}

class B extends A{
  constructor(y,z){
    super()
    this.y = y
    this.z =z
  }
  displayData(){
    console.log(this.x)
  }
}

let b = new B(2,3)
console.log(b.x)
console.log(b.y)
console.log(b.z)
b.displayData()