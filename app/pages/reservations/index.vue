<template>
  <div class="main">
    <v-container fluid>
      <ReservationsHeader />
      <ReservationsAvailabilityCalendar
        :availability-calendar-data="availabilityCalendarData"
        @check-availability="getReservationDetailHistory"
      />
      <ReservationsAvailabilityRooms
        :reservation-data="reservationData"
        :available-rooms="availableRooms"
        :availability-calendar-data="availabilityCalendarData"
      />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { getRates } from '~/services/rates/rates.service'
import { getAvailability } from '~/services/reservations/reservations.service'
import type { AvailabilityCalendarData } from '~/types/AvailabilityCalendar'
import type { Rate } from '~/types/RatesServices'
import type { ReservationData } from '~/types/Reservations'
import type { AvailableRooms } from '~/types/RoomsServices'

definePageMeta({
  layout: 'default',
  name: 'Reservas',
  path: '/reservas',
})

const { formatOnlyDate, toISO, parseDMY } = useDateFormatter()
const { showToast } = useToast()
const { handleAppLoading } = useUiStore()

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
    dniType: '',
    dni: '',
    email: '',
  },
  guests: [],
  residencyData: {
    country: '',
    postalCode: '',
    address: '',
    locality: '',
    estimatedArrival: '',
    specialComments: '',
  },
})

watch(
  () => availabilityCalendarData.value,
  (newVal) => {
    reservationData.value.guests = []
    const totalGuests =
      availabilityCalendarData.value.adults +
      availabilityCalendarData.value.children

    for (let i = 0; i < totalGuests; i++) {
      reservationData.value.guests.push({
        country: '',
        name: '',
        lastName: '',
        birthDate: '',
        dni: '',
      })
    }
  },
  { deep: true, immediate: true },
)

const availableRooms = ref<AvailableRooms[]>([])
const ratesList = ref<Rate[]>([])

const getReservationDetailHistory = async () => {
  if (!availabilityCalendarData.value.dates) return

  try {
    handleAppLoading(true)
    const params = {
      dateFrom: formatOnlyDate(
        availabilityCalendarData.value.dates.start as string,
      ),
      dateTo: formatOnlyDate(
        availabilityCalendarData.value.dates.end as string,
      ),
    }
    const res = await getAvailability(params)

    if (res.length > 0) {
      if (ratesList.value.length === 0) ratesList.value = await getRates()

      availableRooms.value = res.map((room) => {
        const rate = getRateByDateRange(room.HAB, ratesList.value)

        return {
          id: room.HAB,
          capacity: '4',
          price: rate
            ? (Number(rate.VALOR_DOLAR) * totalDays()).toString()
            : '0',
          services: room.DISP.split(','),
        }
      })
    } else {
      availableRooms.value = []
    }
  } catch (err: any) {
    showToast(err, 'error')
  } finally {
    handleAppLoading(false)
  }
}

const totalDays = () => {
  const dates = availabilityCalendarData.value.dates
  if (!dates || !dates.start || !dates.end) return 0

  const start = new Date(dates.start)
  const end = new Date(dates.end)
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const diffInMs = end.getTime() - start.getTime()
  const finalTime = diffInMs / (1000 * 60 * 60 * 24) + 1
  return start === end ? finalTime : finalTime - 1
}

const getRateByDateRange = (hab: string, rates: Rate[]) => {
  if (!availabilityCalendarData.value.dates) return null

  const start = toISO(
    formatOnlyDate(availabilityCalendarData.value.dates.start as string),
  )
  const end = toISO(
    formatOnlyDate(availabilityCalendarData.value.dates.end as string),
  )

  return (
    rates.find((r) => {
      const desde = parseDMY(r.DESDE)
      const hasta = parseDMY(r.HASTA)

      if (!desde || !hasta) return false

      return r.HAB === hab && desde <= start && hasta >= end
    }) ?? null
  )
}
</script>
