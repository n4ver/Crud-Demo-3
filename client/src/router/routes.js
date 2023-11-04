export default [
  {
    name: 'Index',
    path: '/',
    meta: { requireAuth: false },
    component: () => import('../views/Index.vue')
  },
  {
    name: 'Login',
    path: '/Login',
    meta: { requireAuth: false },
    component: () => import('../views/Login.vue')
  },
  {
    name: 'Register',
    path: '/Register',
    meta: { requireAuth: false },
    component: () => import('../views/Register.vue')
  },
  {
    name: 'Todo',
    path: '/Todo',
    meta: { requireAuth: true },
    component: () => import('../views/Todo.vue')
  },
  {
    name: 'TodoID',
    path: '/Todo/:id',
    meta: { requireAuth: true },
    component: () => import('../views/TodoId.vue')
  },
  {
    name: 'TodoEditId',
    path: '/Todo/Edit/:id',
    meta: { requireAuth: true },
    component: () => import('../views/TodoEditId.vue')
  }
]
