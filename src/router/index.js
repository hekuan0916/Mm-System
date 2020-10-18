import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import login from '@/views/login/login.vue'
import layout from '@/views/layout/layout.vue'
import chart from '@/views/layout/chart/chart.vue'
import subject from '@/views/layout/subject/subject.vue'
import business from '@/views/layout/business/business.vue'
import question from '@/views/layout/question/question.vue'
import userList from '@/views/layout/userList/userList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: '登录',
      rules: ['超级管理员', '管理员', '老师', '学生']
    }
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/layout',
    // eslint-disable-next-line no-undef
    component: layout,
    redirect: '/layout/subject',
    children: [
      {
        path: 'chart',
        component: chart,
        // 路由源信息
        meta: {
          title: '数据概览',
          rules: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'subject',
        component: subject,
        // 路由源信息
        meta: {
          title: '学科列表',
          rules: ['超级管理员', '管理员', '老师', '学生']
        }
      },
      {
        path: 'business',
        component: business,
        // 路由源信息
        meta: {
          title: '企业列表',
          rules: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'question',
        component: question,
        // 路由源信息
        meta: {
          title: '题库列表',
          rules: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'userList',
        component: userList,
        // 路由源信息
        meta: {
          title: '用户列表',
          rules: ['超级管理员', '管理员']
        }
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  Nprogress.start()
  next()
})
router.afterEach((to, from) => {
  document.title = to.meta.title
  Nprogress.done()
})

export default router
