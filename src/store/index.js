import Vuex from 'vuex'
import Vue from 'vue'
import {getToken, setToken, removeToken} from '@/http/token'
import user from '../api/user'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    userName: '',
    name: '',
    avatar: '',
    token: getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },
  actions: {
    // 获取用户信息
    getUserInfo({commit, state}) {
      let that = this;
      return new Promise((resolve,reject) => {
        user.getUserInfo().then(res => {
          if(res.code == 200){
            commit('SET_USERNAME', res.data.userName)
            commit('SET_NAME', res.data.nickName)
            commit('SET_AVATAR', res.data.avatar)
            commit('SET_ID', res.data.id)
            resolve(res);
          }else {
            //获取不到登录的用户信息，判定为过期
            commit('SET_USERNAME', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            commit('SET_ID', '')
            removeToken();
            resolve(res);
          }
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 退出
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(data => {

          commit('SET_TOKEN', '')
          commit('SET_USERNAME', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_ID', '')
          removeToken()
          resolve()

        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    fedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERNAME', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ID', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        register(user.userName, user.nickname, user.password).then((data) => {
          commit('SET_TOKEN', data.data['Oauth-Token'])
          setToken(data.data['Oauth-Token'])
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
