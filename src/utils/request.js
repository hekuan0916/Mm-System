import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router/index'
import { getToken, removeToken } from '@/utils/local.js'

var _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
})

// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (getToken()) {
      config.headers.token = getToken()
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_fetch.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // eslint-disable-next-line eqeqeq
    if (response.data.code == 200) {
      return response.data
      // eslint-disable-next-line eqeqeq
    } else if (response.data.code == 206) {
      // 删除token
      removeToken()
      // 跳转login
      router.push('/login')
      // 终止
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      // eslint-disable-next-line no-undef
      Message.error(response.data.message)
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default _fetch
