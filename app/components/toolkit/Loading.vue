<template>
  <v-overlay v-model="isAppLoading" opacity="0.7" z-index="2000" class="d-flex align-center justify-center">
    <div class="text-center">
      <v-progress-circular size="64" color="primary" indeterminate bg-color="transparent" />
      <p class="mt-5 text-white">{{ message }}</p>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
import type { LoadingProps } from '~/types/Loading'

const uiStore = useUiStore()
const { isAppLoading } = storeToRefs(uiStore)

const props = withDefaults(defineProps<LoadingProps>(), {
  message: 'Cargando, por favor espere...',
})
const { message } = props
</script>
