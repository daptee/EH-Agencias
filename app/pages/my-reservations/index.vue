<template>
  <div class="main" v-if="items">
    <v-container fluid class="pa-0 content-container">
      <v-row>
        <v-col cols="12" align-self="center">
          <TableDataTable
            :items="items"
            :headers="MyReservationsHeaders"
            :quantityPerPage="items.length"
            @rowClicked="routeToDetail"
            mobile-breakpoint="960"
          >
            <template #tableToolbar="{}">
              <div class="d-flex justify-space-between align-center pt-11 main">
                <h3 class="primary--text pl-5 fs-16 fw-6 poppins">Reservas</h3>
                <div
                  class="d-flex align-center justify-end px-5"
                  v-if="lastPage"
                >
                  <div class="mr-4 fs-16 poppins">
                    {{ 'Pagina ' + page + ' de ' + lastPage }}
                  </div>
                  <Button
                    icon
                    withIcon
                    iconName="mdi-chevron-left"
                    iconColor="white"
                    btnClass="primary mr-4"
                    @click="decreasePage()"
                    text
                  /><Button
                    icon
                    withIcon
                    iconName="mdi-chevron-right"
                    btnClass="primary"
                    iconColor="white"
                    @click="increasePage()"
                    text
                  />
                </div>
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

            <template #CUANTOS="{ item }">
              <div>
                <Icon
                  v-for="(icon, index) in parseInt(item.CUANTOS)"
                  :key="index"
                  iconName="mdi-account-outline"
                  color="primary"
                />
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
                    ? 'yellowPending'
                    : 'secondary',
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
import type { Rerservation } from '~/types/Reservations'
import { MyReservationsHeaders } from '~/utils/headers'

definePageMeta({
  layout: 'default',
  name: 'Mis reservas',
  path: '/mis-reservas',
})

const uiStore = useUiStore()
const { handleAppLoading } = uiStore
const { showToast } = useToast()

const items = ref<Rerservation[]>([])
const page = ref<number>(1)
const lastPage = ref<number>(1)
const icon = ref('mdi-calendar-clock')

const increasePage = () => {
  if (page.value >= lastPage.value) return
  page.value++
}

const decreasePage = () => {
  if (page.value <= 1) return
  page.value--
}

const routeToDetail = (item: any, rowData: any) => {
  navigateTo(`/mis-reservas/${rowData.item.RESERVA}`)
}

const getReservations = async () => {
  handleAppLoading(true)
  try {
    const productResponse = await fetchReservations()
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
.brder {
  width: 4px;
  height: 58px;
  border-end-start-radius: 10px;
  border-start-start-radius: 10px;
}

.yellowPending {
  background-color: rgba($yellowPending, 0.15);
  color: rgba($yellowPending, 0.8);
  font-size: 12px !important;
}

.secondary {
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
