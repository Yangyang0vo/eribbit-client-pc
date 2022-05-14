// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 导出基准地址 ，原因： 其他不是通过axios发请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// export const baseURL = 'http://pcapi-xiaotuxian-front.itheima.net/'
// export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const instance = axios.create({
  // axios 的一些配置 baseURL timeout
  baseURL,
  // timeout: 5000
  timeout: 8000
})

instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果有token，进行头部携带
  const { profile } = store.state.user
  // 判断是否有token
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => { return Promise.reject(err) })

// res => res.data  取出data数据 ，将来直接调用的时候直接拿到的就是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码 进入该函数
  if (err.response && err.response.status === 401) {
    // 1. 清空无效信息
    // 2. 跳转到登录页面
    // 3. 跳转需要传参数(当前路由地址)给登录页码
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
    // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求 ： 请求地址 请求方式，提交的数据
  return instance({
    url,
    method,
    // 1.如果是get 请求，需要把提交的数据放到params里面    ?a=10&c=10
    // 2.如果是post请求，需要把提交的数据放到data里面 请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    // toLowerCase 转换成小写
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
