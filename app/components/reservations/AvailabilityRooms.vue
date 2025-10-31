<template>
  <v-col cols="12" align-self="center" class="pl-6 mt-6">
    <v-row>
      <h3 class="primary--text fw-6">Disponibilidad</h3>
    </v-row>
    <v-row>
      <span class="primary--text fw-3">
        Desde 17 de septiembre hasta 17 de octubre
      </span>
    </v-row>
    <v-row>
      <TableDataTable
        :items="items"
        :headers="availableRoomsHeaders"
        :quantityPerPage="items.length"
        :can-be-clicked="false"
        mobile-breakpoint="960"
      >
        <template #HABITACION="{ item }">
          <section class="d-flex align-center">
            <div
              v-if="$vuetify.display.mdAndUp"
              :class="[
                'brder',
                item.ESTADO === 'F' || item.ESTADO === 'R'
                  ? 'yellowPending'
                  : 'secondary',
              ]"
            ></div>
            <div
              :class="[
                'd-flex align-center',
                $vuetify.display.lgAndUp
                  ? 'pl-8'
                  : $vuetify.display.md
                    ? 'pl-5'
                    : '',
              ]"
            >
              <figure>
                <v-img
                  width="22"
                  height="22"
                  :src="
                    item.ORIGEN_WEB === 'WEB'
                      ? '/png/eh.png'
                      : item.ORIGEN_WEB === 'AIRBNB'
                        ? '/png/airbnb.png'
                        : '/png/booking.png'
                  "
                />
              </figure>
              <span class="ml-2 fs-16 dryBrown--text poppins"
                >Suite {{ item.HABITACION }}</span
              >
            </div>
          </section>
        </template>

        <template #CAPACIDAD="{ item }">
          <span class="dryBrown--text mr-2">Capacidad:</span>
          <span class="primary--text">{{ item.CAPACIDAD }} (cuatro)</span>
        </template>

        <template #PRECIO="{ item }">
          <span class="dryBrown--text mr-2">Precio:</span>
          <span class="primary--text">{{ item.PRECIO }} USD</span>
        </template>

        <template #SERVICIOS="{ item }">
          <ReservationsServices />
        </template>

        <template #INFO="{ item }">
          <div class="d-flex align-center ga-2">
            <v-icon size="13">$info</v-icon>
            <span class="primary--text underline mr-2">Más info</span>
          </div>
        </template>

        <template #RESERVAR="{ item }">
          <ReservationsBuyProcessModal
            :reservation-data="props.reservationData"
          />
        </template>
      </TableDataTable>
    </v-row>
  </v-col>
</template>

<script setup lang="ts">
import type { AvailabilityRoomsProps } from '~/types/AvailabilityRooms'
import { availableRoomsHeaders } from '~/utils/headers'

const props = defineProps<AvailabilityRoomsProps>()

const items = [
  {
    ID: 1,
    CAPACIDAD: 4,
    HABITACION: '101',
    PRECIO: 4550,
    ESTADO: 'N',
  },
]
</script>

<style scoped lang="scss">
.dryBrown--text {
  color: $dryBrown !important;
  font-weight: 600;
}

.primary--text {
  color: $primary !important;
  font-weight: 400;
}
</style>
