<template>
  <div>
    <v-btn elevation="0" @click="opened = true">
      <v-icon class="ml-2" size="26">$contact</v-icon>
      <span class="contact-span">Contacto</span>
    </v-btn>

    <v-dialog v-model="opened" max-width="500" scrollable>
      <v-card class="px-12 py-10 d-flex justify-space-between ga-6">
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const opened = ref(false)
</script>

<style scoped lang="scss">
.contact-span {
  color: $primary !important;
  font-size: 10px;
}
</style>
