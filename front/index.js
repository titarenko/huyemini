import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './components/Layout'

Vue.use(VueRouter)

Vue.component('Layout', Layout)

const routes = [
  { path: '/', component: () => import('./pages/test/index.vue') },
]
const router = new VueRouter({ mode: 'history', routes })

new Vue({
  el: '#app',
  router,
  render: h => h('Layout'),
})