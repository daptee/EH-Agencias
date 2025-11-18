<template>
  <div class="container">
    <IconsEH class="eh-logo" />
    <span class="primary--text">¡Gracias por elegirnos!</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100%;
}

.eh-logo {
  width: 125px;
  height: 125px;
}
.primary--text {
  color: $primary !important;
  font-size: 24px;
  font-weight: 600;
}
</style>
