// eslint-disable-next-line no-unused-vars
import _fetch from '@/utils/request.js'

function getQuestionList (params) {
  return _fetch({
    url: '/question/list',
    params
  })
}
function addQuestion (data) {
  return _fetch({
    url: '/question/add',
    method: 'post',
    data
  })
}

function editQuestion (data) {
  return _fetch({
    url: '/question/edit',
    method: 'post',
    data
  })
}
function statusQuestion (data) {
  return _fetch({
    url: '/question/assttu',
    method: 'post',
    data
  })
}

function delQuestion (data) {
  return _fetch({
    url: '/question/remove',
    method: 'post',
    data
  })
}

export {
  getQuestionList,
  addQuestion,
  editQuestion,
  statusQuestion,
  delQuestion
}
