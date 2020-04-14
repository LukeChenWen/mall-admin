import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import Login from '@/components/login/login.vue'
import Home from '@/views/home/home.vue'
import Users from '@/components/users/users.vue'
import AuthList from '@/components/authority/auth-list.vue'
import RoleList from '@/components/authority/role-list.vue'
import GoodsList from '@/components/goods/goods-list.vue'
import AddGoods from '@/components/goods/add-goods.vue'
import CateParams from '@/components/goods/cate-params.vue'
import GoodsCategory from '@/components/goods/goods-category.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        name: 'users',
        path: '/users',
        component: Users
      },
      {
        name: 'authList',
        path: '/authList',
        component: AuthList
      },
      {
        name: 'roleList',
        path: '/roleList',
        component: RoleList
      },
      {
        name: 'goodsList',
        path: '/goodsList',
        component: GoodsList
      },
      {
        name: 'addGoods',
        path: '/addGoods',
        component: AddGoods
      },
      {
        name: 'cateParams',
        path: '/cateParams',
        component: CateParams
      },
      {
        name: 'goodsCategory',
        path: '/goodsCategory',
        component: GoodsCategory
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 注册全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // console.log(token)
  // 如果去登录页,直接执行
  if (to.path === '/login') {
    next()
  } else {
    if (!token) {
      // 如果没有token,跳回登录
      Message.success('请先登录')
      router.push({ name: 'login' })
      // 去到登录,直接return跳过
      return
    }
    // 如果有,继续渲染组件
    next()
  }
})
export default router
