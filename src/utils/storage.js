// 封装本地存储操作模块
// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') { value = JSON.stringify(value) }
  window.localStorage.setItem(key, value)
}
// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    //   把获取到的数据直接进行转换 如果是有效的JSON字符串会进行转换 如果不是 就好报错
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
