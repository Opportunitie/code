// 继承

// 原型链继承

// 借用构造函数继承
// 缺点
// 1. 每个实例都拷贝一份，占用内存大，尤其是方法过多的时候。（函数复用又无从谈起了，本来我们用 prototype 就是解决复用问题的）
// 2. 方法都作为了实例自己的方法，当需求改变，要改动其中的一个方法时，之前所有的实例，他们的该方法都不能及时作出更新。只有后面的实例才能访问到新方法

// 组合继承
// 缺点
// 这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费
function Parent(val){
    this.value = val
}

Parent.prototype.getValue = function (){
    console.log(this.value)
}

function Child(val){
    Parent.call(this, val)
}

Child.prototype = new Parent()

let child = new  Child(1)

child.getValue()

console.log( child instanceof Parent);

// 寄生组合继承

function Parent1(val){
    this.value = val
}

Parent1.prototype.getValue = function(){
    console.log(this.value)
}

function Child1(val){
    Parent1.call(this, val)
}

Child1.prototype = Object.create(Parent1.prototype, {
    constructor:{
        value: Child1,
        configurable: true,
        writable: true,
        enumerable: true,
    }
})

let child1 =  new Child1(1)

child1.getValue()

console.log(child1 instanceof Parent1); 
// class 实现继承

class P {
    constructor(val){
        this.value = val
    }
    getValue(){
        console.log(this.value);
    }
}

class C extends P{
    constructor(val){
        super(val)
        this.value = val
    }
}

let c = new C(1)
c.getValue()

console.log(c instanceof P); 