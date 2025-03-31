<script setup lang="ts">
import ProfileNav from '@/components/ProfileNav.vue'
</script>

<template>
  <div class="container-fluid overflow-hidden z-0">
    <div class="row vh-100 overflow-auto">
      <ProfileNav />
      <div class="col d-flex flex-column h-sm-100">
        <main class="row overflow-auto">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 576px) {
  .h-sm-100 {
    height: 100%;
  }
}
</style>
