let data = {
  name:'xbd',
  age:18,
  job:'CTO'
}
let templateStr = 'i am ${name},age ${age},job ${job} ';
function templateFunc(str,data){
         let computed = str.replace(/\$\{(\w+)\}/g,function (match,key) {
           return data[key];
         })
         return computed;
       }
console.log(templateFunc(templateStr,data));