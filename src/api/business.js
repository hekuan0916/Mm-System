// eslint-disable-next-line no-unused-vars
import _fetch from '@/utils/request.js'

function getBusinessList (params) {
  return _fetch({
    url: '/enterprise/list',
    params
  })
}
// function registerUser (data) {
//   return _fetch({
//     url: '/register',
//     method: 'post',
//     data
//   })
// }

export { getBusinessList }
