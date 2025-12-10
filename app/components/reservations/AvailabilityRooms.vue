<template>
  <v-col cols="12" align-self="center" class="pl-6 mt-6">
    <v-row>
      <h3 class="primary--text fw-6">Disponibilidad</h3>
    </v-row>
    <v-row>
      <span
        v-if="
          props.availabilityCalendarData.dates?.start &&
          props.availabilityCalendarData.dates?.end
        "
        class="primary--text fw-3"
      >
        Desde
        {{
          formatToDayMonth(
            props.availabilityCalendarData.dates?.start as string,
          )
        }}
        hasta el
        {{
          formatToDayMonth(props.availabilityCalendarData.dates?.end as string)
        }}
      </span>

      <span v-else>Elige un rango de fecha</span>
    </v-row>
    <v-row>
      <TableDataTable
        :items="props.availableRooms"
        :headers="availableRoomsHeaders"
        :quantityPerPage="props.availableRooms.length"
        :can-be-clicked="false"
        mobile-breakpoint="960"
      >
        <template #id="{ item }">
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
                <v-img width="22" height="22" :src="'/png/eh.png'" />
              </figure>
              <span class="ml-2 fs-16 dryBrown--text poppins"
                >Suite {{ item.id }}</span
              >
            </div>
          </section>
        </template>

        <template #capacity="{ item }">
          <span class="dryBrown--text mr-2">Capacidad:</span>
          <span class="primary--text">{{ item.capacity }} (cuatro)</span>
        </template>

        <template #price="{ item }">
          <span class="dryBrown--text mr-2">Precio:</span>
          <span class="primary--text">{{ formatPrice(item.price) }} USD</span>
        </template>

        <template #services="{ item }">
          <ReservationsServices />
        </template>

        <template #info="{ item }">
          <div class="d-flex align-center ga-2">
            <v-icon size="13">$info</v-icon>
            <a
              :href="moreInfoLink"
              target="_blank"
              rel="noopener noreferrer"
              class="primary--text underline mr-2"
              >Más info</a
            >
          </div>
        </template>

        <template #RESERVAR="{ item }">
          <ReservationsBuyProcessModal
            :disabled="props.reservationData.guests.length === 0"
            :reservation-data="props.reservationData"
            :availabilityCalendarData="props.availabilityCalendarData"
            :room-data="item"
          />
        </template>
      </TableDataTable>
    </v-row>
  </v-col>
</template>

<script setup lang="ts">
import type { AvailabilityRoomsProps } from '~/types/AvailabilityRooms'
import { availableRoomsHeaders } from '~/utils/headers'

const config = useRuntimeConfig()
const { formatToDayMonth } = useDateFormatter()
const { formatPrice } = usePriceFormatter()
const props = defineProps<AvailabilityRoomsProps>()
const moreInfoLink =
  config.public.MODE === 'development'
    ? 'https://dev.ehboutiqueexperience.com/habitaciones'
    : 'https://ehboutiqueexperience.com/habitaciones'
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
