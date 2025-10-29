<script setup lang="ts">
import { BASE_STATUSES_LIST } from '~/constants/status'
</script>

<template>
  <v-card elevation="0" class="py-4 px-8 rounded-lg">
    <span class="title-card">Historial de pedidos</span>
    <section class="mt-4 rows-container">
      <v-row class="item-row">
        <v-col cols="12" sm="4" class="d-flex align-center ga-4">
          <v-icon size="13">{{ BASE_STATUSES_LIST[1].icon }}</v-icon>
          <span class="title-span">Comenzado</span>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="value-span">Fondos insuficientes</span>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="d-flex value-span justify-end">
            24/04/2025 - 17.30hs</span
          >
        </v-col>
      </v-row>
    </section>
  </v-card>
</template>

<style scoped lang="scss">
.item-row {
  border-bottom: 1px solid $lightGrey;
}
</style>
