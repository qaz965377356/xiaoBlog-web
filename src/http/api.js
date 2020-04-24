import axios from 'axios';
import config from './config';
import qs from 'qs';
// import Cookies from "js-cookie";
import router from '@/router'
import store from '@/store'
import {Message} from 'element-ui'

import {getToken} from '@/http/token'
// 使用vuex做全局loading时使用
// import store from '@/store'

const tip = msg => {
  Message({
    type: 'warning',
    showClose: true,
    message: msg
  })
}

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function (data) {
      }]
    })

    // request 拦截器  支持请求开始前进行相关处理
    instance.interceptors.request.use(
      config => {

        let apiUrl = config.url;
        let token = getToken();
        console.log(apiUrl);
        if (apiUrl.substring(0,6) == '/pass/'){
          //放行，不带token

        }else {
          if (token) {
            config.headers.accessToken = token
          }else {
            //需要token的请求但是没找到token，登录
            router.push('/login')
          }
        }
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {
          //TODO
        }
        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);//再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          //error =errorInfo.data  //页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(

      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        // 根据返回的code值来做不同的处理
        switch (data.code) {
          case 200:
            console.log("请求成功，code：200");
            console.log(data.data);
            break;
          case 0:
            store.commit('changeState');
            // console.log('登录成功')
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err


        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              tip(err.message);
              break

            case 401:
              err.message = '未授权，请登录'
              tip(err.message);
              break

            case 403:
              err.message = '拒绝访问'
              tip(err.message);
              break

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              tip(err.message);
              break

            case 408:
              err.message = '请求超时'
              tip(err.message);
              break

            case 500:
              err.message = '服务器内部错误'
              tip(err.message);
              break

            case 501:
              err.message = '服务未实现'
              tip(err.message);
              break

            case 502:
              err.message = '网关错误'
              tip(err.message);
              break

            case 503:
              err.message = '服务不可用'
              tip(err.message);
              break

            case 504:
              err.message = '网关超时'
              tip(err.message);
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              tip(err.message);
              break

            default:
          }
        }
        console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
