<template>
  <v-col cols="12" align-self="center">
    <v-card class="booking-card pa-6">
      <div class="primary--text mb-4 title-section">
        Ingresá las fechas que deseas reservar para ver nuestra disponibilidad
      </div>
      <v-row>
        <v-col cols="12" md="8" align-self="center">
          <div class="calendar-section">
            <DatePicker
              v-model="props.availabilityCalendarData.dates"
              columns="2"
              color="purple"
              timezone="America/Argentina/Buenos_Aires"
              :min-date="new Date()"
              is-range
              :step="1"
              borderless
            ></DatePicker>
          </div>
        </v-col>

        <v-col cols="12" md="4" class="d-flex flex-column">
          <div class="d-flex justify-space-between align-center">
            <span class="primary--text">Adultos</span>
            <div class="d-flex align-center ga-4">
              <v-icon size="40" color="primary" @click="decrease('adults')"
                >$minus</v-icon
              >
              <span class="primary--text">{{
                props.availabilityCalendarData.adults
              }}</span>
              <v-icon size="40" color="primary" @click="increase('adults')"
                >$plus</v-icon
              >
            </div>
          </div>

          <div class="d-flex justify-space-between align-center">
            <span class="primary--text">Niños</span>
            <div class="d-flex align-center ga-4">
              <v-icon size="40" color="primary" @click="decrease('children')"
                >$minus</v-icon
              >
              <span class="primary--text">{{
                props.availabilityCalendarData.children
              }}</span>
              <v-icon size="40" color="primary" @click="increase('children')"
                >$plus</v-icon
              >
            </div>
          </div>

          <v-btn
            color="primary"
            elevation="0"
            class="mt-5"
            @click="emit('checkAvailability')"
          >
            VER DISPONIBILIDAD
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import type {
  AvailabilityCalendarEmits,
  AvailabilityCalendarProps,
} from '~/types/AvailabilityCalendar'

const props = defineProps<AvailabilityCalendarProps>()
const emit = defineEmits<AvailabilityCalendarEmits>()

const totalGuests = () =>
  props.availabilityCalendarData.adults +
  props.availabilityCalendarData.children

const increase = (type: string) => {
  if (totalGuests() >= 4) return

  if (type === 'children') {
    props.availabilityCalendarData.children++
  } else {
    props.availabilityCalendarData.adults++
  }
}

const decrease = (type: string) => {
  if (type === 'children') {
    if (props.availabilityCalendarData.children === 0) return
    props.availabilityCalendarData.children--
  } else {
    if (props.availabilityCalendarData.adults === 0) return
    props.availabilityCalendarData.adults--
  }
}
</script>

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 20px;
}

.booking-card {
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.booking-content {
  gap: 2rem;
}

.calendar-section {
  width: 100%;
  display: flex;
  gap: 1rem;

  .v-date-picker {
    max-width: 100%;
    width: 100%;
    background-color: #fafafa;
    border-radius: 10px;
    padding: 0.5rem;

    .v-date-picker-title {
      text-transform: capitalize;
      text-align: center;
      font-weight: 600;
      margin-top: 0.5rem;
    }
  }
}

.calendar-section {
  position: relative;
  min-width: 100%;
  padding: 10px 40px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: $lightGrey;
  }

  &::before {
    top: 0;
    left: 5%;
    width: 90%;
    height: 1px;
  }

  &::after {
    top: 5%;
    right: 0;
    height: 90%;
    width: 1px;
  }
}

.vc-container {
  min-width: 100%;
}

::v-deep(.vc-container) {
  display: block;
  width: 100%;
}

::v-deep(.vc-pane-layout) {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

::v-deep(.vc-pane) {
  flex: 1 1 50%;
}
</style>
