<script setup>
defineProps(['titleText', 'linkText', 'titleTextColor', 'subTitleTextColor'])
</script>

<template>
  <div class="d-flex flex-column text-center mb-8">
    <h1 :class="titleTextColor">
      {{ titleText }}
    </h1>
    <p class="adjust-sub-title-text fs-5" :class="subTitleTextColor">
      Explore nosso grid completo de produtos oficiais da Fórmula 1 e encontre itens exclusivos das suas equipes e pilotos favoritos.
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
  color: #acacac;
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