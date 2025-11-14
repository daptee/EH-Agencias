<template>
  <v-card elevation="0" class="py-4 px-8 rounded-lg">
    <span class="title-card">Información de reserva</span>
    <section class="mt-4 d-flex flex-column ga-2">
      <v-row class="ma-0">
        <span class="title-span">Fechas: </span>
        <span class="value-span">{{ props.dates }}</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">Personas: </span>
        <span class="value-span">{{ props.persons }}</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">N de habitación: </span>
        <span class="value-span">{{ props.room }}</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">Hora de llegada aprox: </span>
        <span class="value-span">{{ props.arrivalTime }}</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">Método de pago: </span>
        <span class="value-span">{{ props.paymentMethod }}</span>
      </v-row>

      <v-row class="ma-0 row-price">
        <span class="price-span">{{ props.price }}</span>
        <span class="price-text-span">ARG</span>
      </v-row>
    </section>
  </v-card>
</template>

<script setup lang="ts">
import type { ReservationInformationProps } from '~/types/ReservationInformation'

const props = defineProps<ReservationInformationProps>()
</script>

<style scoped lang="scss">
.row-price {
  padding: 10px 0;
  border-bottom: 1px solid $primary;
  border-top: 1px solid $primary;
}

.price-text-span {
  font-size: 17px;
  margin-left: 5px;
}
</style>
