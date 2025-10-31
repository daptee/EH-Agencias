<template>
  <div>
    <span class="primary--text underline mr-2" @click="isDialogOpen = true"
      >Ver servicios</span
    >

    <v-dialog v-model="isDialogOpen" max-width="500">
      <v-card class="pa-6">
        <div class="amenities">
          <div
            v-for="(item, index) in amenities"
            :key="index"
            class="amenities__item"
          >
            <v-icon size="18" color="primary" class="amenities__icon">
              $service_check
            </v-icon>
            <span class="amenities__text">{{ item }}</span>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const isDialogOpen = ref(false)

const amenities = [
  'Internet WIFI 100Mbps',
  'Smart TV',
  'Desayuno Premium',
  'Cerradura electrónica',
  'Caja fuerte',
  'Cámaras de seguridad',
  'Kitchenette',
  'Estacionamiento propio',
  'Libre de humo',
  'Servicio de lavandería',
  'Blanquería',
  'Botiquín Médico',
]
</script>

<style scoped lang="scss">
.primary--text {
  color: $primary !important;
  font-size: 16px;
}

.underline {
  text-decoration: underline;
  cursor: pointer;
}

.amenities {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
