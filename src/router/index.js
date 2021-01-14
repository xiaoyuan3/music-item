import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('../views/recommend/Recommend')
const Rank = () => import('../views/rank/Rank')
const RankDetail = () => import('../views/rank/RankDetail')
const List = () => import('../views/list/List')
const ListDetail = () => import('../views/list/ListDetail')
const RecommendDetail = () => import('../views/recommend/RecommendDetail')
const Search = () => import('../views/search/Search')

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
    component: Recommend,
    children: [
      {
        path: `:id`,
        component: RecommendDetail
      }
    ]
  },
  {
    // 列表页面路由
    path: '/list',
    component: List,
    children: [
      {
        path: ':id',
        component: ListDetail
      }
    ]
  },
  {
    // 排行页面路由
    path: '/rank',
    component: Rank,
    children: [
      {
        path:  `:id`,
        component: RankDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path:  `:id`,
        component: ListDetail
      }
    ]
  }
  
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router