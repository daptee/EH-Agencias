<template>
  <div class="d-flex align-center ga-3 mb-8">
    <v-icon>$date</v-icon>
    <span class="primary--text">Datos de residencia</span>
  </div>

  <section>
    <v-autocomplete
      v-model="country"
      :items="nationsItems"
      item-title="label"
      item-value="value"
      label="Pais"
      variant="outlined"
      :error="!!countryError"
      :error-messages="countryError"
    />

    <v-text-field
      v-model="postalCode"
      label="Código postal"
      variant="outlined"
      :error="!!postalCodeError"
      :error-messages="postalCodeError"
    />
    <v-text-field
      v-model="address"
      label="Dirección"
      variant="outlined"
      :error="!!addressError"
      :error-messages="addressError"
    />
    <v-text-field
      v-model="locality"
      label="Localidad"
      variant="outlined"
      :error="!!localityError"
      :error-messages="localityError"
    />

    <span class="primary--text">Estadía (opcional)</span>
    <v-text-field
      v-model="estimatedHour"
      label="Hora estimada de llegada"
      variant="outlined"
      :error="!!estimatedHourError"
      :error-messages="estimatedHourError"
    />
    <v-text-field
      v-model="comments"
      label="Peticiones especiales"
      variant="outlined"
      :error="!!commentsError"
      :error-messages="commentsError"
    />
  </section>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { getNations } from '~/services/nations/natios.service'
import type { BuyProcessModalProps } from '~/types/BuyProcessModal'

const props = defineProps<BuyProcessModalProps>()
const { handleAppLoading } = useUiStore()
const { showToast } = useToast()
const nationsItems = ref([])
const { validate, setFieldValue } = useForm({
  validationSchema: BuyProcessStepThreeSchema,
  initialValues: props.reservationData.residencyData,
})

const { value: country, errorMessage: countryError } = useField('country')
const { value: postalCode, errorMessage: postalCodeError } =
  useField('postalCode')
const { value: address, errorMessage: addressError } = useField('address')
const { value: locality, errorMessage: localityError } = useField('locality')
const { value: estimatedHour, errorMessage: estimatedHourError } =
  useField('estimatedHour')
const { value: comments, errorMessage: commentsError } = useField('comments')

const validateStep = async () => {
  const ok = await validate()

  if (ok.valid) {
    props.reservationData.residencyData.country = country.value as string
    props.reservationData.residencyData.postalCode = postalCode.value as string
    props.reservationData.residencyData.address = address.value as string
    props.reservationData.residencyData.locality = locality.value as string
    props.reservationData.residencyData.estimatedArrival =
      estimatedHour.value as string
    props.reservationData.residencyData.specialComments =
      comments.value as string
    return true
  }

  return false
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

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 16px;
  font-weight: 600;
}

::v-deep .v-input__details {
  padding: 0 !important;
}

::v-deep .v-input__details:has(.v-messages__message) {
  padding: 15px !important;
}
</style>
