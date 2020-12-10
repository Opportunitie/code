const sleep = (time) =>{
  return new Promise( resolve => setTimeout(resolve,time))
}
sleep(10000).then(()=>{console.log('1111')})


const a = [3, 15, 8, 29, 102, 22]
console.log(a.sort((a,b)=>b-a))