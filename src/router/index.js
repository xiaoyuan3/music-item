import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('../views/recommend/Recommend')
const Rank = () => import('../views/rank/Rank')
const Singer = () => import('../views/singer/Singer')
// 使用组件
Vue.use(VueRouter);

const routes = [
  {
    // 默认首页
    path: '',
    redirect:'/recommend'
  },
  {
    path: '/recommend',
    component:Recommend
  },
  {
    path:'/rank',
    component: Rank
  },
  {
    path: '/singer',
    component: Singer
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router