<template>
  <v-card elevation="0" class="py-4 rounded-lg">
    <span class="title-card px-8">Datos del huésped</span>

    <v-expansion-panels multiple class="mt-4">
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title class="text-title-expansion px-8">
          Pasajero 1
        </v-expansion-panel-title>
        <v-expansion-panel-text class="expansion-content">
          <v-row class="pa-0 ma-0">
            <v-col cols="12" sm="4">
              <span class="title-span">Nombre: </span>
              <span class="value-span">Alejandra Figueroa</span>
            </v-col>
            <v-col cols="12" sm="4">
              <span class="title-span">Teléfono: </span>
              <span class="value-span">11 2345 6789</span>
            </v-col>
            <v-col cols="12" sm="4">
              <span class="title-span">DNI: </span>
              <span class="value-span">40123456</span>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<style scoped lang="scss">
.text-title-expansion {
  color: $dryBrown;
}

.expansion-content {
  border-top: 1px solid $lightGrey;
  border-bottom: 1px solid $lightGrey;
}
</style>
