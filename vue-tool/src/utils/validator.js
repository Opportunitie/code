// 表单检验空数组
export const emptyArr = (rule, value, callback) => {
  if (!value || value.length === 0) {
    return callback(new Error(' '))
  } else {
    callback()
  }
}