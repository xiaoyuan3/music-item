import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('../views/recommend/Recommend')
const Rank = () => import('../views/rank/Rank')
const Singer = () => import('../views/singer/Singer')
const SingerDeail = () => import('../views/singer/SingerDeail')
const List = () => import('../views/list/List')
// 使用组件
Vue.use(VueRouter);

const routes = [
  {
    // 默认推荐页面
    path: '',
    redirect: '/recommend'
  },
  {
    // 推荐页面路由
    path: '/recommend',
    component: Recommend
  },{
    // 列表页面路由
    path: '/list',
    component: List
  },
  {
    // 排行页面路由
    path: '/rank',
    component: Rank
  },
  {
    // 歌手榜路由
    path: '/singer',
    component: Singer,
    children: [
      {
        // 子路由 歌手榜详情路由
        path: ':id',
        component: SingerDeail
      }
    ]
  },
  // {
  //   path: '/detail/:id',
  //   component: SingerDeail
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router