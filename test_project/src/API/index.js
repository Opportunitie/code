import axios from 'axios'

const  fetchData = (fn) => {
  axios.get('http://a.jspang.com/jestTest.json').then(response =>{
    fn(response.data)
  })
}

const  fetchDataTwo = (fn) => {
  return axios.get('http://a.jspang.com/jestTest.json')
}

const  fetchDataThree = (fn) => {
  return axios.get('http://a.jspang.com/jestTest1.json')
}

export {
  fetchData,
  fetchDataTwo,
  fetchDataThree,
}
