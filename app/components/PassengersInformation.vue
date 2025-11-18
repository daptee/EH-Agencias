<template>
  <v-card elevation="0" class="py-4 rounded-lg">
    <span class="title-card px-8">Datos del huésped</span>

    <v-expansion-panels v-if="props.passengers.length" multiple class="mt-4">
      <v-expansion-panel
        v-for="(passenger, index) in props.passengers"
        elevation="0"
      >
        <v-expansion-panel-title class="text-title-expansion px-8">
          PASAJERO {{ index + 1 }}
        </v-expansion-panel-title>
        <v-expansion-panel-text class="expansion-content">
          <v-row class="pa-0 ma-0">
            <v-col cols="12" sm="4">
              <span class="title-span">Nombre: </span>
              <span class="value-span">{{
                passenger.NOMBRE === '' ? '-' : passenger.NOMBRE
              }}</span>
            </v-col>
            <v-col cols="12" sm="4">
              <span class="title-span">Fecha de nacimiento: </span>
              <span class="value-span">{{
                passenger.FNACIMIENTO === '' ? '-' : passenger.FNACIMIENTO
              }}</span>
            </v-col>
            <v-col cols="12" sm="4">
              <span class="title-span">DNI: </span>
              <span class="value-span">{{
                passenger.DOCUMENTO === '' ? '-' : passenger.DOCUMENTO
              }}</span>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div v-else class="px-8 mt-4">
      <ToolkitNoData class="px-8" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { PassengersInformationProps } from '~/types/PassengersInformation'

const props = defineProps<PassengersInformationProps>()
</script>

<style scoped lang="scss">
.text-title-expansion {
  color: $dryBrown;
  font-size: 12px;
}

.expansion-content {
  border-top: 1px solid $lightGrey;
  border-bottom: 1px solid $lightGrey;
}
</style>
