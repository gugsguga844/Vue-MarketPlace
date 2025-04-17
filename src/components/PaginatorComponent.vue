<script setup></script>

<template>
  <div class="d-flex justify-content-center align-items-center gap-3 mt-4">
    <button class="btn btn-outline-light btn-sm px-3" disabled>
      &lt;
    </button>
    <span class="d-flex align-items-center gap-2">
      <span class="page-dot active"></span>
      <span class="page-dot"></span>
    </span>
    <button class="btn btn-outline-light btn-sm px-3">
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
  border: 2px solid #fff;
  transition: background 0.1s, border 0.1s;
}
.page-dot.active {
  background: #fff;
  border-color: #fff;
}
</style>