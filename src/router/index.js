import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView/ProfileView.vue'
import PersonalData from '@/views/ProfileView/PersonalData.vue'

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
      ],
    },
  ],
})

export default router
