<script setup>
import { useRoute } from 'vue-router'
import HeaderNavComponent from './components/HeaderNavComponent.vue'
import { onMounted } from 'vue'
import { renewToken, verifyToken } from './services/HttpService'
import { useAuthStore } from './stores/auth'
import FooterComponent from './components/FooterComponent.vue'

const route = useRoute()

const auth = useAuthStore()

onMounted(async () => {
  console.log('Token antes da verificação:', auth.token)
  console.log(auth.rememberUser)
  console.log(auth.user)
  console.log(auth.isAuthenticated)

  if (auth.token) {
    const token = auth.token
    const response = await verifyToken(token)
    console.log('Remember:', auth.rememberUser)

    if (response.status === 401 && auth.rememberUser === true) {
      const renewResponse = await renewToken(auth.token)
      console.log('Renew Response:', renewResponse)

      if (renewResponse.status === 200) {
        auth.renewToken(renewResponse.data)
      } else {
        auth.logout()
      }
    }
  }
})
</script>

<template>
  <HeaderNavComponent v-if="!route.meta.hideNav" />

  <main>
    <RouterView />
  </main>

  <FooterComponent v-if="!route.meta.hideFooter" />
</template>

<style scoped></style>
