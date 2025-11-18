<template>
  <v-expansion-panels v-model="expanded" multiple class="mt-4">
    <v-expansion-panel
      elevation="0"
      v-for="(guest, index) in props.reservationData?.guests"
      :key="index"
    >
      <v-expansion-panel-title class="text-title-expansion px-8">
        Pasajero {{ index + 1 }}
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
          v-model="menu"
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
            v-model="selectedDate"
            hide-header
            @update:model-value="updateDate(selectedDate, index)"
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

const { validate, setFieldValue, errors } = useForm({
  validationSchema: BuyProcessStepTwoSchema,
})

const fields = props.reservationData.guests.map((g, index) => ({
  country: useField(`guests.${index}.country`),
  name: useField(`guests.${index}.name`),
  lastName: useField(`guests.${index}.lastName`),
  birthDate: useField(`guests.${index}.birthDate`),
  dni: useField(`guests.${index}.dni`),
}))

const validateStep = async () => {
  const ok = await validate()

  if (!ok.valid) return false

  return true
}

const menu = ref(false)
const selectedDate = ref(new Date())
const updateDate = (date: Date, index: number) => {
  if (!fields[index]) return

  fields[index].birthDate.value.value = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  menu.value = false
}

fields.forEach((f, index) => {
  watch(f.country.value, (val) => {
    if (!props.reservationData.guests[index]) return
    props.reservationData.guests[index].country = val as string
  })

  watch(f.name.value, (val) => {
    if (!props.reservationData.guests[index]) return
    props.reservationData.guests[index].name = val as string
  })
  watch(f.lastName.value, (val) => {
    if (!props.reservationData.guests[index]) return
    props.reservationData.guests[index].lastName = val as string
  })
  watch(f.birthDate.value, (val) => {
    if (!props.reservationData.guests[index]) return
    props.reservationData.guests[index].birthDate = val as string
  })
  watch(f.dni.value, (val) => {
    if (!props.reservationData.guests[index]) return
    props.reservationData.guests[index].dni = val as string
  })
})

watch(
  () => props.reservationData.guests,
  (newGuests) => {
    newGuests.forEach((g, index) => {
      if (!fields[index]) return
      setFieldValue(`guests.${index}.country`, g.country)
      setFieldValue(`guests.${index}.name`, g.name)
      setFieldValue(`guests.${index}.lastName`, g.lastName)
      setFieldValue(`guests.${index}.birthDate`, g.birthDate)
      setFieldValue(`guests.${index}.dni`, g.dni)
    })
  },
  { immediate: true, deep: true },
)

const getNationsMethod = async () => {
  try {
    handleAppLoading(true)
    const res = await getNations()
    if (!res) return
    res.forEach((nation) => {
      nationsItems.value.push({
        label: nation.NACION_ESP,
        value: nation.ID,
      })
    })
  } catch (error: any) {
    showToast(error, 'error')
  } finally {
    handleAppLoading(false)
  }
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
