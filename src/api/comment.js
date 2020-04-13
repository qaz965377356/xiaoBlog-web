import request from '@/request'


export function getCommentsByArticle(id) {
  return request({
    url: `/api/comments/article/${id}`,
    method: 'get'
  })
}

export function publishComment(comment) {
  return request({
    url: '/api/comments/create/change',
    method: 'post',
    data: comment
  })
}

