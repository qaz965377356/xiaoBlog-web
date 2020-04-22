
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import lodash from 'lodash'

import ElementUI from 'element-ui'
import '@/assets/theme/index.css'

import '@/assets/icon/iconfont.css'
import api  from './http/index'
// import 'lib-flexible/flexible'
// import 'lib-flexible'

import {formatTime} from "./utils/time";


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(api)

Object.defineProperty(Vue.prototype, '$_', { value: lodash })

Vue.directive('title',  function (el, binding) {
  document.title = el.dataset.title
})
// 格式话时间
Vue.filter('format', formatTime)

// const setHtmlFontSize = () => {
//   const htmlDom = document.getElementsByTagName('html')[0];
//   let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//   if (htmlWidth >= 750) {
//     htmlWidth = 750;
//   }
//   if (htmlWidth <= 320) {
//     htmlWidth = 320;
//   }
//   htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
// };
// window.onresize = setHtmlFontSize;
// setHtmlFontSize();


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
