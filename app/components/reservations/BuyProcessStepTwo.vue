<template>
  <v-expansion-panels v-model="expanded" multiple class="mt-4">
    <v-expansion-panel
      elevation="0"
      v-for="(guest, index) in props.reservationData?.guests"
      :key="index"
    >
      <v-expansion-panel-title class="text-title-expansion px-8">
        <span>Pasajero {{ index + 1 }}</span>
        <template v-slot:actions>
          <div class="d-flex align-center justify-space-between">
            <v-btn
              color="primary"
              elevation="0"
              size="small"
              :disabled="isAlreadyAutomplete"
              @click.stop="completePassenger(index)"
            >
              Autocompletar
            </v-btn>
            <v-icon icon="mdi-chevron-down"></v-icon>
          </div>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="expansion-content" v-if="fields[index]">
        <v-autocomplete
          v-model="fields[index].country.value.value"
          :items="nationsItems"
          item-title="label"
          item-value="value"
          label="Pais"
          variant="outlined"
          :error="!!fields[index].country.errorMessage.value"
          :error-messages="fields[index].country.errorMessage.value"
        />

        <v-text-field
          v-model="fields[index].name.value.value"
          label="Nombre"
          variant="outlined"
          :error="!!fields[index].name.errorMessage.value"
          :error-messages="fields[index].name.errorMessage.value"
        />
        <v-text-field
          v-model="fields[index].lastName.value.value"
          label="Apellidos"
          variant="outlined"
          :error="!!fields[index].lastName.errorMessage.value"
          :error-messages="fields[index].lastName.errorMessage.value"
        />
        <v-menu
          v-model="menu[index]"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290"
          min-width="auto"
        >
          <template #activator="{ props: menuProps }">
            <v-text-field
              v-bind="menuProps"
              v-model="fields[index].birthDate.value.value"
              label="Fecha de nacimiento"
              prepend-inner-icon="mdi-calendar"
              readonly
              variant="outlined"
              :error="!!fields[index].birthDate.errorMessage.value"
              :error-messages="fields[index].birthDate.errorMessage.value"
            />
          </template>

          <v-date-picker
            v-model="selectedDate[index]"
            hide-header
            @update:model-value="updateDate(selectedDate[index], index)"
            color="primary"
            show-adjacent-months
          />
        </v-menu>
        <v-text-field
          v-model="fields[index].dni.value.value"
          label="DNI / Pasaporte"
          variant="outlined"
          :error="!!fields[index].dni.errorMessage.value"
          :error-messages="fields[index].dni.errorMessage.value"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { getNations } from '~/services/nations/natios.service'
import type { BuyProcessModalProps } from '~/types/BuyProcessModal'

const props = defineProps<BuyProcessModalProps>()
const { handleAppLoading } = useUiStore()
const { showToast } = useToast()
const nationsItems = ref([])
const expanded = ref<number[]>(props.reservationData.guests.map((_, i) => i))
const isAlreadyAutomplete = ref<boolean>(false)

const initialValues = {
  guests: props.reservationData.guests.map((g) => ({
    country: g.country,
    name: g.name,
    lastName: g.lastName,
    birthDate: g.birthDate,
    dni: g.dni,
  })),
}

const { validate, setFieldValue, errors, values } = useForm({
  validationSchema: BuyProcessStepTwoSchema,
  initialValues,
})

const fields = values.guests.map((_, index) => ({
  country: useField(`guests.${index}.country`),
  name: useField(`guests.${index}.name`),
  lastName: useField(`guests.${index}.lastName`),
  birthDate: useField(`guests.${index}.birthDate`),
  dni: useField(`guests.${index}.dni`),
}))

const validateStep = async () => {
  const ok = await validate()
  if (!ok.valid) return false

  values.guests.forEach((g, i) => {
    props.reservationData.guests[i] = { ...g }
  })

  return true
}

const menu = ref<boolean[]>(props.reservationData.guests.map(() => false))
const selectedDate = ref<Date[]>(
  props.reservationData.guests.map(() => new Date()),
)
const updateDate = (date: Date, index: number) => {
  if (!fields[index]) return

  fields[index].birthDate.value.value = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  menu.value[index] = false
}

const getNationsMethod = async () => {
  try {
    handleAppLoading(true)
    const res = await getNations()
    if (!res) return
    res.forEach((nation) => {
      nationsItems.value.push({
        label: nation.NACION_ESP,
        value: nation.ID,
      } as never)
    })
  } catch (error: any) {
    showToast(error, 'error')
  } finally {
    handleAppLoading(false)
  }
}

const completePassenger = (index: number) => {
  setFieldValue(`guests.${index}.name`, props.reservationData.personalData.name)
  setFieldValue(
    `guests.${index}.lastName`,
    props.reservationData.personalData.lastName,
  )
  setFieldValue(
    `guests.${index}.birthDate`,
    props.reservationData.personalData.birthDate,
  )
  setFieldValue(`guests.${index}.dni`, props.reservationData.personalData.dni)
  isAlreadyAutomplete.value = true
}

onMounted(() => {
  getNationsMethod()
})

defineExpose({ validateStep })
</script>

<style scoped>
::v-deep .v-input__details {
  padding: 0 !important;
}

::v-deep .v-input__details:has(.v-messages__message) {
  padding: 15px !important;
}
</style>
