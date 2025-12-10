<template>
  <div>
    <v-btn
      variant="outlined"
      color="primary"
      @click="openReservationModal"
      :disabled="props.disabled"
    >
      Reservar
    </v-btn>

    <v-dialog
      v-model="isDialogOpen"
      max-width="500"
      :height="actualStep?.id === 5 ? 'auto' : '700'"
      persistent
      scrollable
      @click:outside="actualStep?.id === 5 ? closeProcessModal() : ''"
      @after-leave="resetSteps"
    >
      <v-card class="px-12 py-10 d-flex justify-space-between">
        <component
          :is="currentStepComponent"
          v-if="currentStepComponent"
          ref="stepComponentRef"
          :reservation-data="props.reservationData"
        />

        <ReservationsBuyProcessFooter
          :steps="steps"
          @stopBuyProcess="stopBuyProcess()"
          @nextStep="validateCurrentStep()"
          v-if="actualStep?.id !== 5"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import type { Steps } from '~/types/BuyProcessFooter'
import BuyProcessStepOne from './BuyProcessStepOne.vue'
import BuyProcessStepTwo from './BuyProcessStepTwo.vue'
import BuyProcessStepThree from './BuyProcessStepThree.vue'
import BuyProcessStepFour from './BuyProcessStepFour.vue'
import BuyProcessFinal from './BuyProcessFinal.vue'
import type { BuyProcessModalProps } from '~/types/BuyProcessModal'
import {
  cancelReserve,
  confirmReserve,
  createReserve,
  initReserve,
} from '~/services/reservations/reservations.service'
import type {
  ConfirmReserve,
  CreateReservationRequest,
} from '~/types/RoomsServices'

const props = defineProps<BuyProcessModalProps>()
const { showToast } = useToast()
const { handleAppLoading } = useUiStore()
const { formatOnlyDate, formatDate } = useDateFormatter()
const { user } = useAuthStore()
const isDialogOpen = ref(false)
const stepComponentRef = ref()
const reservationNumber = ref('')

const steps = ref<Steps[]>([
  { id: 1, isCompleted: true, isActual: true },
  { id: 2, isCompleted: true, isActual: false },
  { id: 3, isCompleted: true, isActual: false },
  { id: 4, isCompleted: true, isActual: false },
  { id: 5, isCompleted: true, isActual: false },
])

const actualStep = computed(() => steps.value.find((step) => step.isActual))

const currentStepComponent = computed(() => {
  const actual = steps.value.find((step) => step.isActual)
  if (!actual) return null

  switch (actual.id) {
    case 1:
      return BuyProcessStepOne
    case 2:
      return BuyProcessStepTwo
    case 3:
      return BuyProcessStepThree
    case 4:
      return BuyProcessStepFour
    case 5:
      return BuyProcessFinal
    default:
      return null
  }
})

const closeProcessModal = () => {
  isDialogOpen.value = false
}

const resetSteps = () => {
  steps.value.forEach((step) => {
    step.isActual = step.id === 1
  })
}

const stopBuyProcess = async () => {
  closeProcessModal()
}

const validateCurrentStep = async () => {
  const child = stepComponentRef.value

  if (child?.validateStep) {
    const ok = await child.validateStep()

    if (!ok) return

    nextStep()
  } else {
    const ok = await handleFinishBuyProcess()

    if (!ok) return

    nextStep()
  }
}

const nextStep = () => {
  const currentIndex = steps.value.findIndex((step) => step.isActual)
  if (currentIndex === -1 || currentIndex >= steps.value.length - 1) return

  const currentStep = steps.value[currentIndex]
  const nextStep = steps.value[currentIndex + 1]

  if (!currentStep || !nextStep) return

  currentStep.isActual = false
  nextStep.isActual = true
}

const openReservationModal = async () => {
  isDialogOpen.value = true
}

const handleFinishBuyProcess = async () => {
  const params: CreateReservationRequest = {
    DESDE: formatOnlyDate(
      props.availabilityCalendarData.dates?.start as string,
    ),
    HASTA: formatOnlyDate(props.availabilityCalendarData.dates?.end as string),
    HAB: props.roomData.id,
    CUANTOS: props.reservationData.guests.length.toString(),
    PAX: `${props.reservationData.personalData.name} ${props.reservationData.personalData.lastName}`,
    TELEFONO_CONTACTO: props.reservationData.personalData.phone,
    EMAIL_CONTACTO: props.reservationData.personalData.email,
    EMAIL_NOTIFICACIONES: props.reservationData.personalData.email,
    VOL_ORDEN: '',
    IMPORTE_COBRADO: props.roomData.price,
    IMPORTE_ADICIONAL: undefined,
    TRANSACCION_NRO: undefined,
    FAC_A_CUIT: undefined,
    FAC_A_RSOCIAL: undefined,
    FAC_A_SFISCAL: undefined,
    DNICUIT: props.reservationData.personalData.dni,
    DNICUIT_TIPO: '1',
    FECHA_NACIMIENTO: props.reservationData.personalData.birthDate,
    ORIGEN_WEB: 'WEB AG',
    PLATAFORMA_EXTERNA: undefined,
    ORDEN_EXTERNA: undefined,
    AG: `${user?.agency_code}`,
    ARRIBO: formatDate(props.availabilityCalendarData.dates?.start as string),
    TARJNUM: undefined,
    TARJVTO: undefined,
    TARJTIT: undefined,
    TARJSEG: undefined,
    RPAIS: props.reservationData.residencyData.country,
    RCPOSTAL: props.reservationData.residencyData.postalCode,
    RLOCALIDAD: props.reservationData.residencyData.locality,
    RESTADO: undefined,
    RDOMIC: props.reservationData.residencyData.address,
    ROBSV: props.reservationData.residencyData.specialComments ?? '',
    pasajeros: props.reservationData.guests.map((g) => ({
      nationality_id: g.country,
      birthdate: g.birthDate,
      dni: g.dni,
      dni_type: '1',
      name: g.name,
    })),
  }

  try {
    handleAppLoading(true)

    const res = await createReserve(params)
    reservationNumber.value = res.RESERVA
    const initReserveRes = await initReserve({
      reservation_number: reservationNumber.value!,
      agency_user_id: user?.id.toString()!,
    })

    const confirmParams: ConfirmReserve = {
      number_of_passengers: props.reservationData.guests.length,
      reservation_id: initReserveRes.reservation.id,
      room_number: props.roomData.id,
      agency_type: 1,
      user: {
        check_in: formatDate(
          props.availabilityCalendarData.dates?.start as string,
        ),
        check_out: formatDate(
          props.availabilityCalendarData.dates?.end as string,
        ),
        email: props.reservationData.personalData.email,
        last_name: props.reservationData.personalData.lastName,
        name: props.reservationData.personalData.name,
        phone: props.reservationData.personalData.phone,
      },
    }

    await confirmReserve(confirmParams)
    showToast('Reserva creada exitosamente', 'success')
    return true
  } catch (err: any) {
    showToast(err, 'error')
    await cancelReserve({ reservation_number: reservationNumber.value! })
    return false
  } finally {
    handleAppLoading(false)
  }
}
</script>

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 16px;
}
</style>
