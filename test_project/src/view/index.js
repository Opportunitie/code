function testOne(number){
  return number >= 200 ? '至尊' : '基本' 
}

function testTwo(number){
  return number >= 1000 ? '多人': '单人'
}

export {
  testOne,
  testTwo
}

// 单元测试: unit testing;
// 集成测试:
// yarn test -> babel-jest（检测）-> babel(是否安装) -> .babelrc -> 将es6转换成es5