<template>
  <div>
    <div class="d-flex flex-column align-start">
      <div class="nav-header d-flex justify-space-between align-center pa-4 pa-sm-3">
        <div class="d-flex">
          <v-img
            v-if="isNavMini"
            width="32"
            height="32"
            class="ml-6"
            :src="ImgLogo"
            @click.stop="handleNavMini()"
          />
          <v-img
            v-else
            width="140"
            height="45"
            :src="ImgLogoText"
          />
        </div>
        <v-btn
          v-if="!isNavMini"
          icon
          color="transparent"
          elevation="0"
          class="menu-btn"
          @click.stop="handleNavMini()"
        >
          <v-icon size="32">$menu_hamb</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column pa-4 pa-sm-3 ml-4" 
          v-if="!isNavMini">
        <p
          class="text-subtitle-1 font-weight-medium primary--text text-truncate mb-1"
        >
          Administrador
        </p>
        <p
          class="text-caption blacktext--text text-truncate"
        >
          eh@boutiquexperience.com
        </p>
      </div>
    </div>
    <hr class="divider mt-2 mb-5">
  </div>
</template>

<script setup lang="ts">
import ImgLogo from '~/assets/img/icons/logo-icon.svg'
import ImgLogoText from '~/assets/img/icons/logo-text.svg'
import { useUiStore } from '~/stores/app';

const uiStore = useUiStore()
const  handleNavMini  = uiStore.handleNavMini
const { isNavMini } = storeToRefs(uiStore)
</script>

<style lang="scss" scoped>
.nav-header {
  height: 5.1rem;
  width: 100%;
}
.v-navigation-drawer--mini-variant{
  .menu-btn{
    display: none;
  }
}
.divider {
  @include backgroundTransparency($greytext, 0.5);
  border: 0;
  height: 0.5px;
}
</style>
