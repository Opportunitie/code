function testOne(number){
  return number >= 200 ? '至尊' : '基本' 
}

function testTwo(number){
  return number >= 1000 ? '多人': '单人'
}

module.exports = {
  testOne,
  testTwo
}