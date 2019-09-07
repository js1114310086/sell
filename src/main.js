import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'
import Element from 'element-ui'
import { Message } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-variables.scss'
import axios from './utils/axios'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import plugin from './utils/plugin'

Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$http = axios;
Vue.use(VueQuillEditor);
Vue.use(plugin);

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('userInfo') || JSON.stringify(store.getters.userInfo) === '{}') {
    if (to.name == 'login') {
      next();
    } else {
      Message.error("登录过期");
      router.replace('/');
    }
  } else {
    let module = to.path.split('/')[1] ? to.path.split('/')[1] : 'index';
    store.commit('ACTIVE_NAV', module);
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
