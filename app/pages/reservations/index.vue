<template>
  <div class="main">
    <v-container fluid>
      <ReservationsHeader />
      <ReservationsAvailabilityCalendar
        :availability-calendar-data="availabilityCalendarData"
      />
      <ReservationsAvailabilityRooms :reservation-data="reservationData" />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { AvailabilityCalendarData } from '~/types/AvailabilityCalendar'
import type { ReservationData } from '~/types/Reservations'

definePageMeta({
  layout: 'default',
  name: 'Reservas',
  path: '/reservas',
})

const availabilityCalendarData = ref<AvailabilityCalendarData>({
  dates: null,
  adults: 0,
  children: 0,
})

const reservationData = ref<ReservationData>({
  personalData: {
    name: '',
    lastName: '',
    birthDate: '',
    phone: '',
    dni: '',
    email: '',
  },
})
</script>
