<template>
  <div class="pt-10">
    <v-container v-if="reservationDetail" fluid class="px-10">
      <div class="d-flex align-center mb-4">
        <v-icon size="26" @click="navigateTo('/mis-reservas')"
          >$arrow_back</v-icon
        >
        <div class="mr-8">
          <h3 class="primary--text pl-3 fs-16 fw-7">
            <span>PEDIDO</span> #{{ reservationDetail.RESERVA }}
          </h3>
          <p
            v-if="reservationDetail.CODIGO_INGRESO"
            class="primary--text pl-3 fs-16 mb-0"
          >
            ORDEN NR #{{ reservationDetail.VOL_ORDEN }}
          </p>
        </div>
        <div class="verticalLine" />
        <div v-if="true" class="d-flex align-center">
          <v-icon size="13">
            {{
              BASE_STATUSES_LIST[reservationDetail.ESTADO as StatusKey]?.icon ||
              BASE_STATUSES_LIST['default'].icon
            }}
          </v-icon>
          <p
            class="status fw-5 mb-0 ml-3 text-uppercase"
            :style="`color: ${BASE_STATUSES_LIST[reservationDetail.ESTADO as StatusKey].color};`"
          >
            {{ BASE_STATUSES_LIST[reservationDetail.ESTADO as StatusKey].name }}
          </p>
        </div>
        <p v-else class="mb-0">Sin estado</p>
      </div>

      <v-row>
        <v-col cols="12" md="9" class="d-flex flex-column ga-4">
          <ContactInformation
            :name="reservationDetail.NOMBRE"
            :phone="reservationDetail.TELEFONO_CONTACTO"
            :dni="reservationDetail.DNICUIT"
            :email="reservationDetail.EMAIL_CONTACTO"
            :nationality="reservationDetail.RESIDE_ESTADO"
            :locality="reservationDetail.RESIDE_LOCALIDAD"
          />
          <PassengersInformation :passengers="reservationDetail.PASAJEROS" />
          <HistoryInformation
            :reservation-detail-history="
              reservationDetailHistory?.status_history
            "
          />
        </v-col>

        <v-col cols="12" md="3">
          <ReservationInformation
            :dates="
              getRangeDates(
                reservationDetail.RESERVA_DESDE,
                reservationDetail.RESERVA_HASTA,
              )
            "
            :persons="reservationDetail.CUANTOS"
            :room="reservationDetail.HABITACION"
            :arrivalTime="getArrivalTime(reservationDetail.RESERVA_DESDE)"
            :paymentMethod="reservationDetail.PLATAFORMA_EXTERNA"
            :price="formatPrice(reservationDetail.IMPORTE_COBRADO)"
          />
        </v-col>
      </v-row>
    </v-container>

    <ToolkitNoData v-if="!isAppLoading && !reservationDetail" />
  </div>
</template>

<script setup lang="ts">
import { BASE_STATUSES_LIST, type StatusKey } from '~/constants/status'
import {
  fetchReservationDetail,
  fetchReservationDetailHistory,
} from '~/services/reservations/reservations.service'
import type {
  ReservationDetail,
  ReservationDetailHistory,
} from '~/types/ReservationsService'

definePageMeta({
  layout: 'default',
  path: '/mis-reservas/:id',
})

const uiStore = useUiStore()
const { handleAppLoading } = uiStore
const { isAppLoading } = storeToRefs(uiStore)
const { showToast } = useToast()
const { formatPrice } = usePriceFormatter()
const route = useRoute()
const id = route.params.id as string

const reservationDetail = ref<ReservationDetail | null>(null)
const reservationDetailHistory = ref<ReservationDetailHistory | null>(null)

const getReservationDetail = async () => {
  try {
    const res = await fetchReservationDetail(id)
    reservationDetail.value = res
  } catch (err: any) {
    showToast(err, 'error')
  }
}

const getReservationDetailHistory = async () => {
  try {
    const res = await fetchReservationDetailHistory(id)
    reservationDetailHistory.value = res
  } catch (err: any) {
    showToast(err, 'error')
  }
}

const getArrivalTime = (date: string) => {
  return date.split(' ')[1] || ''
}

const getRangeDates = (dateFrom: string, dateTo: string) => {
  const dateFromArr = dateFrom.split(' ')[0]
  const dateToArr = dateTo.split(' ')[0]
  return dateFromArr + ' al ' + dateToArr
}

onMounted(async () => {
  handleAppLoading(true)
  await Promise.all([getReservationDetail(), getReservationDetailHistory()])
  handleAppLoading(false)
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
