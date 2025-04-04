import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView/ProfileView.vue'
import PersonalData from '@/views/ProfileView/PersonalData.vue'
import { useAuthStore } from '@/stores/auth'
import ProfileAddresses from '@/views/ProfileView/ProfileAddresses.vue'
import AddModeratorView from '@/views/ProfileView/AddModeratorView.vue'
import AddAddress from '@/views/ProfileView/AddAddress.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        hideNav: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hideNav: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      redirect: '/profile/personalData',
      children: [
        {
          path: 'personalData',
          name: 'personalData',
          component: PersonalData,
        },
        {
          path: 'addresses',
          name: 'addresses',
          component: ProfileAddresses,
        },
        {
          path: 'addModerator',
          name: 'addModerator',
          component: AddModeratorView,
        },
        {
          path: 'addAddress',
          name: 'addAddress',
          component: AddAddress,
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
