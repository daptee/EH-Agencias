<template>
  <v-expansion-panels multiple class="mt-4">
    <v-expansion-panel elevation="0">
      <v-expansion-panel-title class="text-title-expansion px-8">
        Pasajero 1
      </v-expansion-panel-title>
      <v-expansion-panel-text class="expansion-content">
        <v-text-field
          v-model="form.firstName"
          label="Nombre"
          variant="outlined"
        />
        <v-text-field
          v-model="form.lastName"
          label="Nombre"
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
        <v-text-field v-model="form.dni" label="Nombre" variant="outlined" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
const form = ref({
  firstName: '',
  lastName: '',
  birthdayDate: '',
  dni: '',
})

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
</script>
