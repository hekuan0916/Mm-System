// eslint-disable-next-line no-unused-vars
import _fetch from '@/utils/request.js'

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
