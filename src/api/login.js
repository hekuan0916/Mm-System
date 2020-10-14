import axios from 'axios'
import { Message } from 'element-ui'
var _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
})

function getRcode (data) {
  return _fetch({
    url: '/sendsms',
    method: 'post',
    data
  })
}
function registerUser (data) {
  return _fetch({
    url: '/register',
    method: 'post',
    data
  })
}

function toLogin (data) {
  return _fetch({
    url: '/login',
    method: 'post',
    data
  })
}
export { getRcode, registerUser, toLogin }

// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
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
    } else {
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
