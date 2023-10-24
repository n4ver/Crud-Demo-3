export default [
  {
    name: 'Index',
    path: '/',
    meta: { requireAuth: false },
    component: () => import('../views/Index.vue')
  },
  {
    name: 'Todo',
    path: '/Todo',
    meta: { requireAuth: false },
    component: () => import('../views/Todo.vue')
  },
  {
    name: 'TodoID',
    path: '/Todo/:id',
    meta: { requireAuth: false },
    component: () => import('../views/TodoId.vue')
  },
  {
    name: 'TodoEditId',
    path: '/Todo/Edit/:id',
    meta: { requireAuth: false },
    component: () => import('../views/TodoEditId.vue')
  }
]
