import { fetchData } from './API/index'
// import 'bootstrap'
import './index.css'
// console.log('home1111saqw')

// class Log{
//   constructor(){
//     console.log('出错了');
//   }
// }
// let log = new Log()

let url =''
if(DEV){
  url = 'http://localhost:8080'
}else{
  url = 'http://www.baidu.com'
}
console.log(url)
fetchData('./api/user')