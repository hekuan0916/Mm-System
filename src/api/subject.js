import _fetch from '@/utils/request.js'

function getSubList (params) {
  return _fetch({
    url: '/subject/list',
    params,
    method: 'get'
  })
}
function setSubStatus (data) {
  return _fetch({
    url: '/subject/status',
    method: 'post',
    data
  })
}
function removeSub (data) {
  return _fetch({
    url: '/subject/remove',
    method: 'post',
    data
  })
}

function addSub (data) {
  return _fetch({
    url: '/subject/add',
    method: 'post',
    data
  })
}

function editSub (data) {
  return _fetch({
    url: '/subject/edit',
    method: 'post',
    data
  })
}

export { editSub, getSubList, setSubStatus, removeSub, addSub }
