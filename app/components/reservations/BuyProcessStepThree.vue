<template>
  <div class="d-flex align-center ga-3 mb-8">
    <v-icon>$date</v-icon>
    <span class="primary--text">Datos de residencia</span>
  </div>

  <section>
    <v-text-field v-model="form.country" label="Nombre" variant="outlined" />
    <v-text-field
      v-model="form.postalCode"
      label="Apellidos"
      variant="outlined"
    />
    <v-text-field v-model="form.address" label="Teléfono" variant="outlined" />
    <v-text-field v-model="form.locality" label="locality" variant="outlined" />

    <span class="primary--text">Estadía (opcional)</span>
    <v-text-field
      v-model="form.estimatedHour"
      label="Email"
      variant="outlined"
    />
    <v-text-field v-model="form.comments" label="Email" variant="outlined" />
  </section>
</template>

<script setup lang="ts">
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
  country: '',
  postalCode: '',
  address: '',
  locality: '',
  estimatedHour: '',
  comments: '',
})
</script>

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 16px;
  font-weight: 600;
}
</style>
