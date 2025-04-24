<script setup>
import { computed } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'

const useCategories = useCategoryStore()

const currentPage = computed(() => Math.floor(useCategories.startValue / 3))
const totalPages = computed(() => Math.ceil(useCategories.categories.length / 3))
const pages = computed(() => Array.from({ length: totalPages.value }))
</script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-3 mt-4">
    <button class="btn btn-outline-dark btn-sm px-3" @click="useCategories.prevPage" :disabled="currentPage === 0">
      &lt;
    </button>
    <span class="d-flex align-items-center gap-2">
      <span
        v-for="(_, idx) in pages"
        :key="idx"
        class="page-dot"
        :class="{ active: idx === currentPage }"
      ></span>
    </span>
    <button class="btn btn-outline-dark btn-sm px-3" @click="useCategories.nextPage" :disabled="currentPage === totalPages - 1">
      &gt;
    </button>
  </div>
</template>

<style scoped>
.page-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  background: transparent;
  border: 2px solid #000000;
  transition: background 0.1s, border 0.1s;
}
.page-dot.active {
  background: #000000;
  border-color: #000000;
}
</style>
