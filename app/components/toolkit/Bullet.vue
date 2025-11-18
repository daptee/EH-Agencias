<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="13"
      height="13"
      rx="6.5"
      transform="matrix(1 0 0 -1 0 13)"
      :fill="props.border"
    />
    <rect
      width="9"
      height="9"
      rx="4.5"
      transform="matrix(1 0 0 -1 2 11)"
      :fill="props.center"
    />
  </svg>
</template>

<script setup lang="ts">
import type { BulletProps } from '~/types/Bullet'

const props = defineProps<BulletProps>()
</script>
