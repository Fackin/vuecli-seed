import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './schema';

import * as lib from './excomponents'; // 自定义组件

/**使用element组件 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/display.css';
import './stylus/base.css'; // 公共样式
import './stylus/resetelement.styl'; // 重写elementUI样式
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false;

// 工具方法 AbCdEf => ab-cd-ef
const kebabCase = str => str.replace(/([A-Z])/g, s => '-' + s.toLowerCase()).replace(/^-/, '');
// 自动注册 自定义组件
Object.keys(lib).forEach(name => {
  Vue.component(`ex-${kebabCase(name)}`, lib[name]);
})

Vue.use(VueRouter);
/* 路由集合 */
const router = new VueRouter({
  base: '/vuecli-seed/',
  mode: 'history',
  fallback: true,
  routes: [
    ...routes
    // { path: '*', component: lib.NoMatch, name: '页面丢失' }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
