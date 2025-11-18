<template>
  <div class="d-flex align-center ga-3 mb-6">
    <v-icon>$date</v-icon>
    <span class="primary--text"
      >Recordá que para completar la reserva deberá abonarse la misma dentro de
      las 48hs</span
    >
  </div>

  <section class="d-flex flex-column ga-4">
    <span
      >Te dejamos los datos de cuenta para que puedas realizar el pago:</span
    >

    <div class="d-flex flex-column">
      <span class="bold-primary--text">CBU: XXXXXXXXXX</span>
      <span class="bold-primary--text">Nro de cuenta: XXXXXXXXXX</span>
      <span class="bold-primary--text">Banco Santander</span>
    </div>

    <span
      >Una vez que realices el pago te pedimos que nos compartas el comprobante
      a nuestros medios de contacto:</span
    >

    <div class="d-flex align-center">
      <v-icon size="40" color="primary">$email</v-icon>
      <div class="d-flex flex-column ml-4">
        <span class="bold-primary--text">Email</span>
        <span class="primary--text underline"
          >reservas@ehboutiqueexperience.com</span
        >
      </div>
    </div>

    <div class="d-flex align-center">
      <v-icon size="40" color="primary">$wsp</v-icon>
      <div class="d-flex flex-column ml-4">
        <span class="bold-primary--text">WP</span>
        <span class="primary--text underline">+54 9 2966 753463</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 16px;
  font-weight: 400;
}

.bold-primary--text {
  color: $primary !important;
  font-size: 16px;
  font-weight: 700;
}

.underline {
  text-decoration: underline;
  cursor: pointer;
}
</style>
