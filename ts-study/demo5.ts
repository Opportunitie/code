function getTotal(one: number, two: number): number {
  return one + two;
}

const totalAll = getTotal(1, 2);

function sayHello(): void {
  console.log("Hello Workd!");
}

function errorFunciont(): never {
  throw new Error();
}

function forNever(): never {
  while (true) {}
  console.log("Hello Worl");
}


function add ({one, two }:{one: number,two: number}){
  return one + two
}

const totalAdd = add({one : 1, two: 2})


function getNumber ({ one }:{one: number}){
  return one 
}

const onee = getNumber({one:1})