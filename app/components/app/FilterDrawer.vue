<template>
  <IconsFilters
    @click="isNavFilterOpen = !isNavFilterOpen"
    class="icon-filter"
  />

  <v-navigation-drawer
    v-model="isNavFilterOpen"
    location="right"
    :rail="isNavFilterMini"
    rail-width="100"
    width="300"
    color="white"
    temporary
  >
    <section
      class="border-t pa-4 d-flex flex-column justify-space-between h-100"
    >
      <div class="grow">
        <v-menu
          v-model="menuFrom"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290"
        >
          <template #activator="{ props: menuProps }">
            <v-text-field
              v-bind="menuProps"
              :model-value="localFilters.fromDate"
              @update:model-value="localFilters.fromDate = $event"
              label="Fecha inicio"
              prepend-inner-icon="mdi-calendar"
              readonly
              variant="outlined"
            />
          </template>

          <v-date-picker
            :model-value="localFilters.fromDate"
            @update:model-value="formatDate($event, 'fromDate')"
            hide-header
            color="primary"
            show-adjacent-months
          />
        </v-menu>

        <v-menu
          v-model="menuTo"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290"
        >
          <template #activator="{ props: menuProps }">
            <v-text-field
              v-bind="menuProps"
              :model-value="localFilters.toDate"
              @update:model-value="localFilters.toDate = $event"
              label="Fecha final"
              prepend-inner-icon="mdi-calendar"
              readonly
              variant="outlined"
            />
          </template>

          <v-date-picker
            :model-value="localFilters.toDate"
            @update:model-value="formatDate($event, 'toDate')"
            hide-header
            color="primary"
            show-adjacent-months
          />
        </v-menu>

        <!-- <v-select
          class="select-style"
          :items="rooms"
          variant="outlined"
          item-title="label"
          item-value="value"
          :model-value="localFilters.room"
          @update:model-value="localFilters.room = $event"
          placeholder="Habitación"
        /> -->

        <v-select
          class="select-style"
          :items="statusList"
          variant="outlined"
          item-title="label"
          item-value="value"
          label="Estado"
          :model-value="localFilters.status"
          @update:model-value="localFilters.status = $event"
          placeholder="Estado"
        />
      </div>

      <v-btn color="primary" elevation="0" class="mt-5" @click="applyFilters">
        FILTRAR
      </v-btn>
    </section>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { getRooms } from '~/services/rooms/rooms.service'
import type { Filters, FiltersEmit } from '~/types/FilterDrawer'

const props = defineProps<{ filters: Filters }>()
const emit = defineEmits<FiltersEmit>()

const localFilters = ref<Filters>({
  fromDate: '',
  toDate: '',
  room: '',
  status: '',
})

const isNavFilterOpen = ref(false)
const isNavFilterMini = ref(false)

const rooms = ref([])
const menuTo = ref(false)
const menuFrom = ref(false)

const statusList = [
  { label: 'Pendiente', value: 'F' },
  { label: 'Completada', value: 'Z' },
]

const getRoomsMethod = async () => {
  try {
    const res = await getRooms()
    if (!res) return
    rooms.value = res.map((room) => ({
      label: room.DETALLE,
      value: room.ID,
    })) as never
  } catch (error) {
    console.log(error)
  }
}

const formatDate = (date: Date | null, type: keyof Filters) => {
  if (!date) return
  const formatted = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  localFilters.value[type] = formatted as any
  if (type === 'fromDate') menuFrom.value = false
  if (type === 'toDate') menuTo.value = false
}

const applyFilters = () => {
  emit('apply', localFilters.value)
  isNavFilterOpen.value = false
}

onMounted(() => {
  getRoomsMethod()
})

watch(
  () => props.filters,
  (newValue) => {
    localFilters.value = { ...newValue }
  },
  { deep: true },
)
</script>

<style scoped>
.icon-filter {
  cursor: pointer;
}
</style>
