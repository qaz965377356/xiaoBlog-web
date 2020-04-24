import axios from '@/http/api';
import line from "./line";

const article = {
  // 时间线列表
  getArticles (query,page) {
    return axios({
      url: '/pass/article',
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
  },
  getHotArtices () {
    return axios({
      url: '/pass/article/hot',
      method: 'get',
    })
  },
  getNewArtices () {
    return axios({
      url: '/pass/article/new',
      method: 'get',
    })
  },
  viewArticle (id) {
    return axios({
      url: '/pass/articleBody/view/' + id,
      method: 'get',
    })
  },
  getArticlesByCategory (id) {
    return axios({
      url: '/pass/article/category/' + id,
      method: 'get',
    })
  },
  getArticlesByTag (id) {
    return axios({
      url: '/pass/article/tag/' + id,
      method: 'get',
    })
  },
  publishArticle (article) {
    return axios({
      url: '/pass/article/publish',
      method: 'post',
      data: article
    })
  },
  listArchives () {
    return axios({
      url: '/pass/article/listArchives',
      method: 'get',
    })
  },
  getArticleById (id) {
    return axios({
      url: '/pass/article/' + id,
      method: 'get',
    })
  },

}

export default article;
