// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios' //引入axios
import qs from 'qs'
import  { Message }  from 'element-ui';
import App from './App'


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios //修改Vue的原型属性
const message = Message
Vue.prototype.$message = message

axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if(config.method === 'post') { // post请求时，处理数据
    config.data = qs.stringify( {
      ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
    })
  }
  return config;
}, function (error) {
  loadinginstace.close()
  return Promise.reject(error);
})
//添加响应拦截器
axios.interceptors.response.use(function(response){
  return response;
},function(error){
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
