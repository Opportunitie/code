import { testOne, testTwo } from '../src/view/index'
// const tempTest = require('../src/view/index.js')
// const { testOne, testTwo } = tempTest

test('服务-1', () =>{
  expect(testOne(300)).toBe('至尊')
})

test('服务-2', ()=>{
  expect(testTwo(1200)).toBe('多人')
})