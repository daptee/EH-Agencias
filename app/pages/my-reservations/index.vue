<template>
  <div class="main" v-if="items">
    <v-container fluid class="pa-0 content-container">
      <v-row>
        <v-col cols="12" align-self="center">
          <TableDataTable
            :items="items"
            :headers="MyReservationsHeaders"
            :quantityPerPage="items.length"
            :search="searchData"
            @rowClicked="routeToDetail"
            mobile-breakpoint="960"
          >
            <template #tableToolbar="{}">
              <div
                class="d-flex justify-space-between align-center pt-11 main pr-10"
              >
                <div class="d-flex flex-column pl-5">
                  <h3 class="primary--text fs-16 fw-6 poppins">Reservas</h3>
                  <AppApplyFilters :filters="filters" @remove="removeFilter" />
                </div>
                <!-- <div class="d-flex align-center justify-end px-5">
                  <ToolkitOrder />
                </div> -->
                <AppFilterDrawer
                  :filters="filters"
                  @apply="
                    (newFilters) => {
                      filters.fromDate = newFilters.fromDate
                      filters.toDate = newFilters.toDate
                      filters.room = newFilters.room
                      filters.status = newFilters.status
                      getReservations()
                    }
                  "
                />
              </div>
            </template>

            <template #RESERVA="{ item }">
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
                      v-if="item.ORIGEN_WEB"
                      width="18"
                      height="18"
                      :src="
                        item.ORIGEN_WEB === 'WEB'
                          ? '/png/eh.png'
                          : item.ORIGEN_WEB === 'AIRBNB'
                            ? '/png/airbnb.png'
                            : '/png/booking.png'
                      "
                    />
                    <div v-else>?</div>
                  </figure>
                  <span class="ml-2 fs-16 dryBrown--text poppins"
                    >#{{ item.RESERVA }}</span
                  >
                </div>
              </section>
            </template>

            <template #HABITACION="{ item }">
              <div class="d-flex align-center">
                <figure>
                  <v-img width="28" height="28" src="/png/bed.png" />
                </figure>
                <span class="pl-4 poppins fs-16 primary--text fw-7"
                  >Habitacion {{ item?.HABITACION }}</span
                >
              </div>
            </template>

            <template v-slot:[`item.DESDE`]="{ item }">
              <span class="dryBrown--text">{{
                item?.DESDE + ' - ' + item?.HASTA
              }}</span>
            </template>

            <template #DESDE="{ item }">
              <span class="dryBrown--text">{{
                item?.DESDE + ' - ' + item?.HASTA
              }}</span>
            </template>

            <template #ESTADO="{ item }">
              <VuetifyChip
                label
                :chipClass="[
                  'fs-12 font-weight-bold',
                  item?.ESTADO === 'F' || item?.ESTADO === 'R'
                    ? 'yellowPendingChip'
                    : 'secondaryChip',
                ]"
              >
                <template #content>
                  <span>
                    {{
                      item?.ESTADO === 'F' || item?.ESTADO === 'R'
                        ? 'PENDIENTE'
                        : 'COMPLETADA'
                    }}
                  </span>
                </template>
              </VuetifyChip>
            </template>
          </TableDataTable>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { fetchReservations } from '~/services/reservations/reservations.service'
import type { Filters } from '~/types/FilterDrawer'
import type {
  Reservation,
  ReservationRequest,
} from '~/types/ReservationsService'

import { MyReservationsHeaders } from '~/utils/headers'

definePageMeta({
  layout: 'default',
  name: 'Mis reservas',
  path: '/mis-reservas',
})

const uiStore = useUiStore()
const { handleAppLoading } = uiStore
const { showToast } = useToast()
const { user } = useAuthStore()
const { searchData } = storeToRefs(uiStore)

const items = ref<Reservation[]>([])
const page = ref<number>(1)
const lastPage = ref<number>(1)
const filters = ref<Filters>({
  fromDate: undefined,
  toDate: undefined,
  room: undefined,
  status: undefined,
})

const increasePage = () => {
  if (page.value >= lastPage.value) return
  page.value++
}

const decreasePage = () => {
  if (page.value <= 1) return
  page.value--
}

const removeFilter = (key: any) => {
  filters.value = {
    ...filters.value,
    [key]: undefined,
  }

  getReservations()
}

const routeToDetail = (item: any, rowData: any) => {
  navigateTo(`/mis-reservas/${rowData.item.RESERVA}`)
}

const getReservations = async () => {
  handleAppLoading(true)
  try {
    const params: ReservationRequest = {
      agency_code: `${user?.agency_code}`,
      fromDate: filters.value.fromDate as string,
      toDate: filters.value.toDate as string,
      roomId: filters.value.room as string,
      status: filters.value.status as string,
    }
    const productResponse = await fetchReservations(params)
    items.value = productResponse
  } catch (err: any) {
    showToast(err, 'error')
  } finally {
    handleAppLoading(false)
  }
}

onMounted(() => {
  getReservations()
})
</script>

<style scoped lang="scss">
.yellowPendingChip {
  background-color: rgba($yellowPending, 0.15);
  color: rgba($yellowPending, 0.8);
  font-size: 12px !important;
}

.secondaryChip {
  background-color: rgba($secondary, 0.15);
  color: rgba($secondary, 0.8);
  font-size: 12px !important;
}

.br-50 {
  border-radius: 50%;
}

.dryBrown--text {
  color: $dryBrown !important;
  font-weight: 600;
}
</style>
