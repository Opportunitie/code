const numberArr: number[] = [1, 2, 3];

const stringArr: string[] = ["a", "b", "c"];

const undefinedArr: undefined[] = [undefined, undefined];
// const voidArr : void[] = [undefined, undefined ]

const arrSix: (number | string)[] = [1, "stirng", 2];

// type alias 类型别名

type Lady = { name: string, age: number}
class Madam {
  name: string;
  age: number;
}
const xiaoJieJieSix1:Lady[] = [
  {
    name: "aaa",
    age: 18,
  },
  {
    name: "bbb",
    age: 18,
  },
]; 
const xiaoJieJieSix2:Madam[] = [
  {
    name: "aaa",
    age: 18,
  },
  {
    name: "bbb",
    age: 18,
  },
];
