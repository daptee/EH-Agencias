<template>
  <div class="d-flex align-center ga-3 mb-8">
    <v-icon>$date</v-icon>
    <span class="primary--text">Datos personales</span>
  </div>

  <section>
    <v-text-field
      v-model="props.reservationData.personalData.name"
      label="Nombre"
      variant="outlined"
    />
    <v-text-field
      v-model="form.lastName"
      label="Apellidos"
      variant="outlined"
    />
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290"
      min-width="auto"
    >
      <template #activator="{ props }">
        <v-text-field
          v-bind="props"
          v-model="formattedDate"
          label="Fecha de nacimiento"
          prepend-inner-icon="mdi-calendar"
          readonly
          variant="outlined"
        />
      </template>

      <v-date-picker
        v-model="selectedDate"
        hide-header
        @update:model-value="updateDate"
        color="primary"
        show-adjacent-months
      />
    </v-menu>
    <v-text-field v-model="form.phone" label="Teléfono" variant="outlined" />
    <v-text-field v-model="form.dni" label="DNI" variant="outlined" />
    <v-text-field v-model="form.email" label="Email" variant="outlined" />
  </section>
</template>

<script setup lang="ts">
import type { BuyProcessModalProps } from '~/types/BuyProcessModal'

const props = defineProps<BuyProcessModalProps>()
const menu = ref(false)
const formattedDate = ref('')
const selectedDate = ref(new Date())
const updateDate = (date: Date) => {
  formattedDate.value = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  menu.value = false
}

const form = ref({
  firstName: '',
  lastName: '',
  birthdayDate: '',
  phone: '',
  dni: '',
  email: '',
})
</script>

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 16px;
  font-weight: 600;
}
</style>
