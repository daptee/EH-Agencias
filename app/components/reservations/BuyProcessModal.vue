<template>
  <div>
    <v-btn variant="outlined" color="primary" @click="isDialogOpen = true">
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
          :reservation-data="props.reservationData"
        />

        <ReservationsBuyProcessFooter
          :steps="steps"
          @stopBuyProcess="stopBuyProcess()"
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

const props = defineProps<BuyProcessModalProps>()
const isDialogOpen = ref(false)

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

const stopBuyProcess = () => {
  closeProcessModal()
}
</script>

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 16px;
}
</style>
