<template>
  <section class="d-flex justify-space-between align-center pt-11">
    <span class="dryBrown--text">
      <v-icon
        size="16"
        color="primary"
        v-if="!isPrevDisabled"
        @click="prevStep()"
        >$arrow_back_modal</v-icon
      >
      Paso {{ actualStep?.id }} de {{ steps.length }}
    </span>
    <div class="d-flex ga-4">
      <span class="cancel--text" @click="emit('stopBuyProcess')">Cancelar</span>
      <span
        class="primary--text underline"
        :class="{ disabled: isNextDisabled }"
        @click="!isNextDisabled && emit('nextStep')"
        >{{
          actualStep?.id === steps.length - 1 ? 'Finalizar' : 'Siguiente'
        }}</span
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import type {
  BuyProcessFooterEmits,
  BuyProcessFooterProps,
} from '~/types/BuyProcessFooter'

const props = defineProps<BuyProcessFooterProps>()
const emit = defineEmits<BuyProcessFooterEmits>()
const actualStep = computed(() => props.steps.find((step) => step.isActual))
const isNextDisabled = computed(() => !actualStep.value?.isCompleted)
const isPrevDisabled = computed(() => actualStep.value?.id === 1)

const prevStep = () => {
  const currentIndex = props.steps.findIndex((step) => step.isActual)
  if (currentIndex === -1 || currentIndex <= 0) return

  const currentStep = props.steps[currentIndex]
  const prevStep = props.steps[currentIndex - 1]

  if (!currentStep || !prevStep) return

  currentStep.isActual = false
  prevStep.isActual = true
}
</script>

<style scoped lang="scss">
.dryBrown--text {
  display: flex;
  align-items: center;
  gap: 4px;
  color: $dryBrown !important;
  font-weight: 600;
}

.cancel--text {
  color: $greyText !important;
  font-size: 16px;
  cursor: pointer;
}

.underline {
  text-decoration: underline;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: none;
  }
}
</style>
