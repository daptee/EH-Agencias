<template>
  <v-select
    class="select-style"
    :items="items"
    variant="transparent"
    item-title="text"
    item-value="value"
    placeholder="Más reciente"
  ></v-select>
</template>

<script setup lang="ts">
const items = [
  {
    text: 'Más reciente',
    value: 'recent',
  },
]
</script>

<style scoped lang="scss">
.select-style {
  width: 200px;
}
</style>
