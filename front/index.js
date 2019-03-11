import { map, groupBy } from 'lodash'

import Vue from 'vue'
import VueRouter from 'vue-router'
import { Layout, Navigation, Shots } from './src'

Vue.use(VueRouter)

Vue.component('Layout', Layout)
Vue.component('Navigation', Navigation)
Vue.component('Shots', Shots)

const routes = [
  { path: '*', component: () => import('./pages/home/index.vue') },
]

const router = new VueRouter({ mode: 'history', routes })

const context = require.context('./shots')

const items = context.keys().map(k => {
  const [category, ...names] = k.replace(/\.png$/, '').split('/').slice(1)

  return ({
    category,
    name: names
  })
})

const shots = map(groupBy(items, it => it.category), (images, name) => ({ name, options: images.map(it => it.name[0]) }))

new Vue({
  el: '#app',
  router,
  render: (h) => {
    return h('Layout', {
      props: {
        options: shots
      }
    })
  },
})