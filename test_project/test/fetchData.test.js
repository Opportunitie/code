import { fetchData, fetchDataTwo, fetchDataThree } from '../src/API/index'

test('fetchData 方法测试', (done)=>{
  fetchData((data) =>{
    expect(data).toEqual({
      success: true
    })
    done()
  })
})

test('fetchDataTwo测试', () => {
  return fetchDataTwo().then((response)=>{
    expect(response.data).toEqual({
      success: true
    })
  })
})

test('fetchDataThree测试', () => {
  expect.assertions(1) // 必须执行一次expect
  return fetchDataThree().catch(err=>{
    // console.log(err.toString())  查看抛出异常内容
    expect(err.toString().indexOf('404') > -1).toBe(true)
  })
})