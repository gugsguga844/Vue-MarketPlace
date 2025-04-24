<script setup>
defineProps(['titleText', 'titleDescription', 'linkText', 'titleTextColor', 'subTitleTextColor'])
</script>

<template>
  <div class="d-flex flex-column text-center mb-8">
    <h1 :class="titleTextColor">
      {{ titleText }}
    </h1>
    <p class="adjust-sub-title-text fs-6" :class="subTitleTextColor">
      {{ titleDescription }}
    </p>

    <RouterLink to="/"> {{ linkText }} </RouterLink>
  </div>
</template>

<style scoped>
.primaryText {
  color: #fff;
  font-weight: bold;
}

.secondaryText {
  color: #000;
  font-weight: bold;
}

.tertiaryText {
  color: #5e5e5e;
  font-weight: bold;
}

.adjust-sub-title-text {
  width: 60%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .adjust-sub-title-text {
    width: 100%;
  }
}
</style>