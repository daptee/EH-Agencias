<template>
  <v-overlay :value="isAppLoading" opacity="0.70" z-index="2000">
    <div class="d-flex flex-column align-center">
      <v-progress-circular size="50" color="primary" indeterminate />
      <p class="mt-5">{{ props.message }}</p>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
import type { LoadingProps } from '~/types/Loading';

const appStore = useUiStore()
const isAppLoading = computed(() => appStore.isAppLoading)
const props = defineProps<LoadingProps>()

</script>
