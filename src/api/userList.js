import _fetch from '@/utils/request.js'

function getUserList (params) {
  return _fetch({
    url: '/user/list',
    method: 'get',
    params
  })
}
function addUser (data) {
  return _fetch({
    url: '/user/add',
    method: 'post',
    data
  })
}

function subStatus (data) {
  return _fetch({
    url: '/user/status',
    method: 'post',
    data
  })
}

function editUser (data) {
  return _fetch({
    url: '/user/edit',
    method: 'post',
    data
  })
}

function removeUser (data) {
  return _fetch({
    url: '/user/remove',
    method: 'post',
    data
  })
}

export { getUserList, addUser, subStatus, editUser, removeUser }
