interface Girl {
  name: string;
  age: number;
  bust: number;
  waistLine?: number;
  [propname: string]:any;
  say():string
}

interface Teacher extends Girl{
  teach(): string
}

class XiaoJieJie implements Girl{
  name = 'aaaa'
  age = 18
  bust = 90
  say(){
    return 'aaa'
  }
}
// type Girl1 = string

const girl = {
  name: "dajiao",
  age: 18,
  bust: 94,
  waistLine: 21,
  sex: '女',
  say(){
    return '欢迎光临'
  },
  teach(){
    return 'haha'
  }
};

const screenResume = (girl: Girl) => {
  girl.age < 24 && girl.bust >= 90 && console.log(girl.name + "进入面试");
  girl.age >= 24 || (girl.bust < 90 && console.log(girl.name + "你被淘汰"));
};

const getResume = (girl: Teacher) => {
  console.log(girl.name + "年龄是" + girl.age);
  console.log(girl.name + "胸围是" + girl.bust);
  girl.waistLine && console.log(girl.name + "腰围是", girl.waistLine);
  girl.sex && console.log(girl.name + "性别是", girl.sex);
};

screenResume(girl);
getResume(girl);
