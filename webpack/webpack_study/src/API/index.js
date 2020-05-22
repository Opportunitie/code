function fetchData(url){
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onload = function(){
    console.log(xhr.response)
  }
  xhr.send()
}

export {
  fetchData
}
