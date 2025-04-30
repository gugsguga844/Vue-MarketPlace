import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView/ProfileView.vue'
import ProfileData from '@/views/ProfileView/ProfileData.vue'
import { useAuthStore } from '@/stores/auth'
import ProfileAddresses from '@/views/ProfileView/ProfileAddresses.vue'
import ProfileAdmin from '@/views/ProfileView/ProfileAdmin.vue'
import AddAddress from '@/views/ProfileView/AddAddress.vue'
import ProfileSecurity from '@/views/ProfileView/ProfileSecurity.vue'
import EditAddress from '@/views/ProfileView/EditAddress.vue'
import AdminUsers from '@/views/ProfileView/Admin/AdminUsers.vue'
import AdminCategories from '@/views/ProfileView/Admin/AdminCategories.vue'
import AdminProducts from '@/views/ProfileView/Admin/AdminProducts.vue'
import ProductView from '../views/ProductView.vue'
import AdminDiscounts from '@/views/ProfileView/Admin/AdminDiscounts.vue'
import CartView from '@/views/CartView.vue'
import AuthView from '@/views/AuthView.vue'
import ProductsView from '@/views/ProductsView.vue'
import AdminCoupons from '@/views/ProfileView/Admin/AdminCoupons.vue'

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
      component: AuthView,
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      redirect: '/profile/profileData',
      children: [
        {
          path: 'profileData',
          name: 'profileData',
          component: ProfileData,
        },
        {
          path: 'addresses',
          name: 'addresses',
          component: ProfileAddresses,
        },
        {
          path: 'admin',
          name: 'admin',
          component: ProfileAdmin,
          redirect: '/profile/admin/adminUsers',
          children: [
            {
              path: 'adminUsers',
              name: 'adminUsers',
              component: AdminUsers,
            },
            {
              path: 'adminCategories',
              name: 'adminCategories',
              component: AdminCategories,
            },
            {
              path: 'adminProducts',
              name: 'adminProducts',
              component: AdminProducts,
            },
            {
              path: 'adminDiscounts',
              name: 'adminDiscounts',
              component: AdminDiscounts,
            },
            {
              path: 'adminCoupons',
              name: 'adminCoupons',
              component: AdminCoupons,
            },
          ],
        },
        {
          path: 'addAddress',
          name: 'addAddress',
          component: AddAddress,
        },
        {
          path: 'security',
          name: 'security',
          component: ProfileSecurity,
        },
        {
          path: 'editAddress',
          name: 'editAddress',
          component: EditAddress,
          props: true,
        },
      ],
      meta: {
        requiresAuth: true,
        hideFooter: true,
      },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
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
