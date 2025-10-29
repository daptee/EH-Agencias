<template>
  <div class="main pt-10">
    <v-container fluid class="px-10">
      <div class="d-flex align-center mb-4">
        <v-icon size="26">$arrow_back</v-icon>
        <div class="mr-8">
          <h3 class="primary--text pl-3 fs-16 fw-7">
            <span>PEDIDO</span> #336789
          </h3>
          <p class="primary--text pl-3 fs-16 mb-0">ORDEN NR #75317</p>
        </div>
        <div class="verticalLine" />
        <div v-if="true" class="d-flex align-center">
          <v-icon size="13">{{ BASE_STATUSES_LIST[1].icon }}</v-icon>
          <p
            class="status fw-5 mb-0 ml-3 text-uppercase"
            :style="`color: ${BASE_STATUSES_LIST[1].color};`"
          >
            {{ BASE_STATUSES_LIST[1].name }}
          </p>
        </div>
        <p v-else class="mb-0">Sin estado</p>
      </div>

      <v-row>
        <v-col cols="12" md="6" class="d-flex flex-column ga-4">
          <ContactInformation />
          <PassengersInformation />
          <HistoryInformation />
        </v-col>

        <v-col cols="12" md="6">
          <ReservationInformation />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { BASE_STATUSES_LIST } from '~/constants/status'

definePageMeta({
  layout: 'default',
  path: '/mis-reservas/:id',
})
</script>

<style scoped lang="scss">
.verticalLine {
  width: 29px;
  height: 1px;
  background-color: $primary;
  transform: rotate(-90deg);
}
</style>
