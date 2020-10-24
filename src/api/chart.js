// eslint-disable-next-line no-unused-vars
import _fetch from '@/utils/request.js'

// function getChart (params) {
//   return _fetch({
//     url: '/info',
//     params
//   })
// }
function getChart (data) {
  return _fetch({
    url: '/data/title',
    method: 'post',
    data
  })
}

function getStatistics (data) {
  return _fetch({
    url: '/data/statistics',
    method: 'post',
    data
  })
}

export { getChart, getStatistics }
