<template>
  <div>
    <v-chip
      v-for="filter in activeFilters"
      :key="filter.key"
      class="ma-2"
      closable
      @click:close="emit('remove', filter.key)"
    >
      {{ filter.name }}: {{ filterValue(filter.key, filter.value) }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import type { ApplyFiltersEmit, ApplyFiltersProps } from '~/types/ApplyFilters'

const props = defineProps<ApplyFiltersProps>()
const emit = defineEmits<ApplyFiltersEmit>()

const filterLabels: Record<string, string> = {
  fromDate: 'Fecha inicio',
  toDate: 'Fecha final',
  room: 'Habitación',
  status: 'Estado',
}

const activeFilters = computed(() => {
  return Object.entries(props.filters)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== '',
    )
    .map(([key, value]) => ({
      key,
      name: filterLabels[key],
      value,
    }))
})

const filterValue = (key: string, value: any) => {
  if (key === 'status') {
    return value === 'F' ? 'Pendiente' : 'Completada'
  }

  return value
}
</script>
