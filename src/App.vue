<script setup>
import { useRoute } from 'vue-router'
import HeaderNavComponent from './components/HeaderNavComponent.vue'
import { onMounted } from 'vue'
import { renewToken, verifyToken } from './services/HttpService'
import { useAuthStore } from './stores/auth'

const route = useRoute()

const auth = useAuthStore()

onMounted(async () => {
  console.log('Token antes da verificação:', auth.token)
  console.log(auth.rememberUser)
  console.log(auth.user)
  console.log(auth.isAuthenticated)

  if (auth.token) {
    const response = await verifyToken(auth.token)

    if (response.status !== 200 && auth.rememberUser == true) {
      const renewResponse = await renewToken(auth.token)

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
</template>

<style scoped></style>
