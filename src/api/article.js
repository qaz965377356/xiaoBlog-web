import request from '@/request'


export function getArticles(query, page) {
  return request({
    url: '/api/article',
    method: 'get',
    params: {
      pageNumber: page.pageNumber,
      pageSize: page.pageSize,
      name: page.name,
      sort: page.sort,
      year: query.year,
      month: query.month,
      tagId: query.tagId,
      categoryId: query.categoryId
    }
  })
}

export function getHotArtices() {
  return request({
    url: '/api/article/hot',
    method: 'get'
  })
}

export function getNewArtices() {
  return request({
    url: '/api/article/new',
    method: 'get'
  })
}

export function viewArticle(id) {
  return request({
    url: `/api/article/view/${id}`,
    method: 'get'
  })
}

export function getArticlesByCategory(id) {
  return request({
    url: `/api/article/category/${id}`,
    method: 'get'
  })
}

export function getArticlesByTag(id) {
  return request({
    url: `/api/article/tag/${id}`,
    method: 'get'
  })
}


export function publishArticle(article) {
  return request({
    url: '/api/article/publish',
    method: 'post',
    data: article
  })
}

export function listArchives() {
  return request({
    url: '/api/article/listArchives',
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: `/api/article/${id}`,
    method: 'get'
  })
}
