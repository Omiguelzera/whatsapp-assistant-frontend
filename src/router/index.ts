import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      redirect: '/sessions',
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: () => import('@/views/chat/SessionsView.vue'),
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('@/views/chat/ChatView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/users/UsersView.vue'),
    },
    {
      path: '/admin/metrics',
      name: 'metrics',
      component: () => import('@/views/admin/MetricsView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'sessions' }
  }
})

export default router