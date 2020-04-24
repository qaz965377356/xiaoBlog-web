import axios from '@/http/api';


const categorys = {
  // 时间线列表
  getAllCategorys () {
    return axios({
      url: '/pass/categorys',
      method: 'get'
    })
  },
  getAllCategorysDetail () {
    return axios({
      url: '/pass？categorys/detail',
      method: 'get'
    })
  },
  getCategory (id) {
    return axios({
      url: '/pass/categorys/' + id,
      method: 'get'
    })
  },
  getCategoryDetail (id) {
    return axios({
      url: '/pass/categorys/detail/' + id,
      method: 'get'
    })
  },
}

export default categorys;
