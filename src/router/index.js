import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/views/home/home.vue'
import Users from '@/components/users/users.vue'
import AuthList from '../components/authority/auth-list.vue'
import RoleList from '../components/authority/role-list.vue'

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
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
