import axios from '@/http/api';


const user = {
  //登录接口
  login (data) {
    return axios({
      url: '/pass/user/login',
      method: 'post',
      data:data,
    })
  },
  //注册接口
  register (data) {
    return axios({
      url: '/pass/user/register',
      method: 'post',
      data:data,
    })
  },
}

export default user;

