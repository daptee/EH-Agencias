<template>
    <v-main class="page-container">
      <v-container fluid class="pa-0 content-container">
        <v-row>
          <v-col cols="12" align-self="center">
            <TableDataTable
              :items="items"
              :headers="headers"
              :quantityPerPage="quantityPerPage"
              @rowClicked="routeToDetail"
              mobile-breakpoint="960"
            >
              <template #tableToolbar="{}">
                <div
                  class="d-flex justify-space-between align-center"
                >
                  <h3 class="primary--text pl-5 fs-16 fw-6 poppins">
                    Reservas
                  </h3>
                </div>
              </template>
              <template #[`item.id`]="{ item }">
                <div class="d-flex ml-n4">
                  <div v-if="$vuetify.display.mdAndUp" class="brder secondary" />
                  <div class="d-flex align-center pl-5">
                    <v-icon size="19" class="mr-2">{{ icon }}</v-icon>
                    <span class="dryBrown--text fs-16">#{{ item }}</span>
                  </div>
                </div>
              </template>
              <template #[`item.quantity`]="{ item }">
                <span class="primary--text fs-16">Cantidad de productos: {{ item }}</span>
              </template>
              <template #[`item.date`]="{ item }">
                <span class="dryBrown--text fs-16">{{ item }}</span>
              </template>
              <template #[`item.total`]="{ item }">
                <span class="dryBrown--text fs-16">{{ item }}</span>
              </template>
              <template #[`item.statuses`]="{ item }">
                <ItemStatuses :item="item.statuses" />
              </template>
            </TableDataTable>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'Mis reservas',
  path: '/mis-reservas'
})

const items = ref([
  {
    id : 1,
    quantity : 1,
    date : '2022-01-01',
    total : 100,
    statuses : {
      status : 'initialized',
      color : 'initialized-color',
      border : 'initialized-border'
    }
  },
  {
    id : 1,
    quantity : 1,
    date : '2022-01-01',
    total : 100,
    statuses : {
      status : 'initialized',
      color : 'initialized-color',
      border : 'initialized-border'
    }
  }
])
const headers = [
  {
    text: 'ID',
    value: 'id',
  },
  {
    text: 'Cantidad',
    value: 'quantity',
  },
  {
    text: 'Fecha',
    value: 'date',
  },
  {
    text: 'Total',
    value: 'total',
  },
]
const quantityPerPage = ref(10)
const icon = ref('mdi-calendar-clock')
const routeToDetail = (item: any) => {
  console.log('item', item);
  
}
</script>

<style scoped lang="scss">
.brder {
  width: 4px;
  height: 58px;
  border-end-start-radius: 10px;
  border-start-start-radius: 10px;
}
.br-50 {
  border-radius: 50%;
}
</style>