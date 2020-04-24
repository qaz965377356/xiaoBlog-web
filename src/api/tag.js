import axios from '@/http/api';

const tag = {
  // 时间线列表
  getHotTags () {
    return axios({
      url: '/pass/tag/hot',
      method: 'get'
    })
  },
}

export default tag;
