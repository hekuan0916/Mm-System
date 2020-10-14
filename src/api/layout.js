import _fetch from '@/utils/request.js'

function getUserInfo () {
  return _fetch({
    url: '/info'
  })
}
function logout () {
  return _fetch({
    url: '/logout'
  })
}
export { getUserInfo, logout }
