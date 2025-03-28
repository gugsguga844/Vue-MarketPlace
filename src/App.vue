<script setup>
import { useRoute } from 'vue-router'
import HeaderNavComponent from './components/HeaderNavComponent.vue'

const route = useRoute()
</script>

<template>
  <HeaderNavComponent v-if="!route.meta.hideNav" />

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
