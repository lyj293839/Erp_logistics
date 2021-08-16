// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import All from './common/All'
import { get,post } from "./api/index";
import store from "@/store";
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$Enum = localStorage.getItem('enum')?JSON.parse(localStorage.getItem('enum')):{}
Vue.prototype.$All = All
Vue.prototype.$get = get
Vue.prototype.$post = post

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
