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
    redirect: '/login'
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
        component: chart
      },
      {
        path: 'subject',
        component: subject
      },
      {
        path: 'business',
        component: business
      },
      {
        path: 'question',
        component: question
      },
      {
        path: 'userList',
        component: userList
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
  // to and from are both route objects.
  Nprogress.done()
})

export default router
