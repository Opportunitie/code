// 联合类型和类型保护
interface Waiter18 {
  anjiao: boolean;
  say: () => {};
}

interface Teacher18 {
  anjiao: boolean;
  skill: () => {};
}

function judgeWho(animal: Waiter18 | Teacher18) {
  // animal.say()
  // 断言
  if (animal.anjiao) {
    (animal as Teacher18).skill();
  } else {
    (animal as Waiter18).say();
  }
}

function judgeWhoTwo(animal: Waiter18 | Teacher18) {
  if ("skill" in animal) {
    animal.skill();
  } else {
    animal.say();
  }
}

function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first} ${second}`;
  }
  return first + second;
}

class NumberObj {
  count: number = 0;
}

function addObj(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
}
