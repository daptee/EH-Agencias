<template>
  <v-navigation-drawer
    v-model="isNavOpen"
    :rail="isNavMini"
    rail-width="100"
    app
    width="300"
    color="white"
  >
    <AppMenuNavHeader />
    <AppMenuNavModules />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '~/stores/app'

const uiStore = useUiStore()
const { isNavOpen, isNavMini } = storeToRefs(uiStore)
</script>
