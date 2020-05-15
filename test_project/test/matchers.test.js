test('测试007号技师的匹配', ()=>{
  // === 绝对匹配（必须完全相等）
  expect('007号技师').toBe('007号技师')
})

test('toEqual匹配器', ()=>{
  // == 内容结果的匹配
  const a = {number: '007'}
  expect(a).toEqual({number: '007'})
})

test('toBeNull匹配器', ()=>{
  // 只匹配Null
  const a = null
  expect(a).toBeNull()
})

test('toBeUndefined匹配器', ()=>{
  // 只匹配undefined
  const a = undefined
  expect(a).toBeUndefined()
})

test('toBeDefined匹配器', ()=>{
  // 只匹配已经声明并且初始化的变量
  const a = 1
  expect(a).toBeDefined()
})

test('toBeTruthy匹配器', ()=>{
  // 值为false通不过测试，为true为通过
  const a = 1
  expect(a).toBeTruthy()
})

test('toBeFalsy匹配器', ()=>{
  // 值为true通不过测试，为false为通过
  const a = 0
  expect(a).toBeFalsy()
})

test('toBeGreaterThan匹配器', ()=>{
  // 大于
  const count = 10
  expect(count).toBeGreaterThan(9)
})

test('toBeGreaterThanOrEqual匹配器', ()=>{
  // 大于等于
  const count = 10
  expect(count).toBeGreaterThanOrEqual(10)
})

test('toBeCloseTo匹配器', ()=>{
  // 小于等于
  const one = 0.1
  const two = 0.2
  expect(one + two ).toBeCloseTo(0.3)
})

test('toMatch匹配器', ()=>{
  // 字符串匹配（子串）
  const str = "谢大脚,刘英,小红"
  expect(str ).toMatch('谢大脚')
})

test('toContain匹配器', ()=>{
  // 字符串匹配(数组)
  const arr = ["谢大脚","刘英","小红"]
  const data = new Set(arr)  // set
  expect(data).toContain('谢大脚')
})

const throwNewErrorFunc = () =>{
  throw new Error ("this is Error")
}

const throwNewErrorFunction = () =>{
}

test('toThrow匹配器', ()=>{
  // 抛出异常
  expect(throwNewErrorFunc).toThrow('this is Error')
})

test('toThrow匹配器', ()=>{
  // 字符串匹配(数组)
  expect(throwNewErrorFunction).not.toThrow()
})