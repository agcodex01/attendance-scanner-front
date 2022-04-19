import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/pages',
    component: () => import('../components/Layout.vue'),
    children: [
      // {
      //   path: '/login',
      //   name: 'login',
      //   component: () => import('../views/Login.vue')
      // },
      {
        path: '/gate-entrance',
        name: 'gate_entrance',
        component: () => import('../views/GateEntrance.vue')
      },
      {
        path: '/department',
        name: 'department',
        component: () => import('../views/Department.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/Admin.vue')
      },
      {
        path: '/employees/create',
        name: 'create_employee',
        component: () => import('../views/CreateEmployee.vue')
      },
      {
        path: '/employees/:id/update',
        name: 'update_employee',
        component: () => import('../views/UpdateEmployee.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/Error.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
