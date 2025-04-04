<script setup lang="ts">
import ProfileNav from '@/components/ProfileNav.vue'
</script>

<template>
  <div class="container-fluid overflow-hidden z-0">
    <div class="row overflow-auto">
      <ProfileNav />
      <div class="col offset-2 d-flex flex-column h-sm-100 py-4 px-4">
        <RouterView />
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
