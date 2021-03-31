interface Girl21{
  name: string;
}


class SelectGirl<T extends Girl21> {
  constructor(private girls: T[]) {}
  getGirl(index:number):T{
    return this.girls[index]
  }
}

const selectGirl =  new SelectGirl<{name: string}>([{name: 'aaa' },{name: 'bbb' },{name: 'cccc' }])
console.log(selectGirl.getGirl(1).name);




// class SelectGirl<T extends number | string> {
//   constructor(private girls: T[]) {}
//   getGirl(index:number):T{
//     return this.girls[index]
//   }
// }

// const selectGirl =  new SelectGirl<string>(['aaa','bbb','ccc'])
// console.log(selectGirl.getGirl(1));