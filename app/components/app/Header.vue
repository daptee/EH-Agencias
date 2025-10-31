<template>
  <div>
    <v-app-bar app color="white" flat height="90">
      <v-app-bar-nav-icon
        class="hidden-lg-and-up mx-1"
        @click="isNavOpen = !isNavOpen"
      />
      <AppHeaderContent />
    </v-app-bar>
    <v-divider />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '~/stores/app'

const uiStore = useUiStore()
const { isNavOpen, isNavMini } = storeToRefs(uiStore)
</script>
