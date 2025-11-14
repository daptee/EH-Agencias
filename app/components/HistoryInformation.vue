<template>
  <v-card elevation="0" class="py-4 px-8 rounded-lg">
    <span class="title-card">Historial de pedidos</span>
    <section class="mt-4 rows-container">
      <v-row
        v-if="props.reservationDetailHistory?.length"
        v-for="detailHistory in props.reservationDetailHistory"
        class="item-row"
      >
        <v-col cols="12" sm="8" class="d-flex align-center ga-4">
          <ToolkitBullet
            size="13"
            :border="
              BASE_STATUSES_LIST_HISTORY[
                detailHistory.status_id as StatusKeyHistory
              ].bullet.border
            "
            :center="
              BASE_STATUSES_LIST_HISTORY[
                detailHistory.status_id as StatusKeyHistory
              ].bullet.center
            "
          />
          <span>{{ detailHistory.status.name }}</span>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="d-flex value-span justify-end">
            {{ formatDate(detailHistory.created_at) }}hs</span
          >
        </v-col>
      </v-row>

      <ToolkitNoData v-else />
    </section>
  </v-card>
</template>

<script setup lang="ts">
import {
  BASE_STATUSES_LIST_HISTORY,
  type StatusKeyHistory,
} from '~/constants/status'
import type { HistoryInformationProps } from '~/types/HistoryInformation'
import { useDateFormatter } from '~/composables/useDateFormatter'
import ImgLogo from '~/assets/img/icons/logo-icon.svg'

const props = defineProps<HistoryInformationProps>()
const { formatDate } = useDateFormatter()
</script>

<style scoped lang="scss">
.item-row {
  border-bottom: 1px solid $lightGrey;
}
</style>
