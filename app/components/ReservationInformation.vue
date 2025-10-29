<template>
  <v-card elevation="0" class="py-4 px-8 rounded-lg">
    <span class="title-card">Información de reserva</span>
    <section class="mt-4 d-flex flex-column ga-2">
      <v-row class="ma-0">
        <span class="title-span">Fechas: </span>
        <span class="value-span">17/08/2025 al 17/09/2025</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">Personas: </span>
        <span class="value-span">2</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">N de habitación: </span>
        <span class="value-span">2</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">Hora de llegada aprox: </span>
        <span class="value-span">15hs</span>
      </v-row>
      <v-row class="ma-0">
        <span class="title-span">Método de pago: </span>
        <span class="value-span">Tarjeta de crédito</span>
      </v-row>

      <v-row class="ma-0 row-price">
        <span class="price-span">$321312</span>
        <span class="price-text-span">ARG</span>
      </v-row>
    </section>
  </v-card>
</template>

<style scoped lang="scss">
.row-price {
  padding: 10px 0;
  border-bottom: 1px solid $primary;
  border-top: 1px solid $primary;
}

.price-text-span {
  font-size: 18px;
  margin-left: 5px;
}
</style>
