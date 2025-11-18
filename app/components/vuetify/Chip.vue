<template>
  <v-chip v-bind="$attrs" :class="chipClass">
    <slot name="content" />
  </v-chip>
</template>

<script setup lang="ts">
const props = defineProps({
  chipClass: {
    type: [Array, String],
    required: false,
    default: '',
  },
})
</script>
