<template>
  <div class="d-flex align-center ga-3 mb-8">
    <v-icon>$date</v-icon>
    <span class="primary--text">Datos personales</span>
  </div>

  <section>
    <v-text-field
      v-model="firstName"
      label="Nombre"
      variant="outlined"
      :error="!!firstNameError"
      :error-messages="firstNameError"
    />
    <v-text-field
      v-model="lastName"
      label="Apellidos"
      variant="outlined"
      :error="!!lastNameError"
      :error-messages="lastNameError"
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
          v-model="birthdayDate"
          label="Fecha de nacimiento"
          prepend-inner-icon="mdi-calendar"
          readonly
          variant="outlined"
          :error="!!birthdayDateError"
          :error-messages="birthdayDateError"
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
    <v-text-field
      v-model="phone"
      label="Teléfono"
      variant="outlined"
      :error="!!phoneError"
      :error-messages="phoneError"
    />

    <v-autocomplete
      v-model="dniType"
      :items="documentsTypes"
      label="DNI"
      variant="outlined"
      :error="!!dniTypeError"
      :error-messages="dniTypeError"
    />

    <v-text-field
      v-model="dni"
      label="DNI"
      variant="outlined"
      :error="!!dniError"
      :error-messages="dniError"
    />
    <v-text-field
      v-model="email"
      label="Email"
      variant="outlined"
      :error="!!emailError"
      :error-messages="emailError"
    />
  </section>
</template>

<script setup lang="ts">
import type { BuyProcessModalProps } from '~/types/BuyProcessModal'
import { useForm, useField } from 'vee-validate'
import { getDocumentsTypes } from '~/services/dni/dni.service'

const props = defineProps<BuyProcessModalProps>()
const documentsTypes = ref([])
const { handleAppLoading } = useUiStore()
const { showToast } = useToast()
const menu = ref(false)
const selectedDate = ref(new Date())
const updateDate = (date: Date) => {
  birthdayDate.value = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  menu.value = false
}

const { validate, setFieldValue } = useForm({
  validationSchema: BuyProcessStepOneSchema,
  initialValues: {
    firstName: props.reservationData.personalData.name,
    lastName: props.reservationData.personalData.lastName,
    birthdayDate: props.reservationData.personalData.birthDate,
    phone: props.reservationData.personalData.phone,
    dniType: props.reservationData.personalData.dniType,
    dni: props.reservationData.personalData.dni,
    email: props.reservationData.personalData.email,
  },
})

const { value: firstName, errorMessage: firstNameError } = useField('firstName')
const { value: lastName, errorMessage: lastNameError } = useField('lastName')
const { value: birthdayDate, errorMessage: birthdayDateError } =
  useField('birthdayDate')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: dniType, errorMessage: dniTypeError } = useField('dniType')
const { value: dni, errorMessage: dniError } = useField('dni')
const { value: email, errorMessage: emailError } = useField('email')

const validateStep = async () => {
  const ok = await validate()

  if (ok.valid) {
    props.reservationData.personalData.name = firstName.value as string
    props.reservationData.personalData.lastName = lastName.value as string
    props.reservationData.personalData.birthDate = birthdayDate.value as string
    props.reservationData.personalData.phone = phone.value as string
    props.reservationData.personalData.dniType = dniType.value as string
    props.reservationData.personalData.dni = dni.value as string
    props.reservationData.personalData.email = email.value as string
    return true
  }

  return false
}

const getDocumentsTypesMethod = async () => {
  try {
    handleAppLoading(true)
    const res = await getDocumentsTypes()
    if (!res) return
    res.forEach((type) => {
      documentsTypes.value.push(type.DOCUMENTO as never)
    })
  } catch (error: any) {
    showToast(error, 'error')
  } finally {
    handleAppLoading(false)
  }
}

onMounted(() => {
  getDocumentsTypesMethod()
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
