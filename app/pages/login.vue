<template>
  <div
    class="login-container d-flex flex-column justify-center align-center px-2"
  >
    <div class="opacity" />
    <v-card
      class="mx-auto py-8 card"
      :class="$vuetify.display.xs ? 'px-2' : 'px-8'"
      width="378"
      elevation="0"
      rounded="md"
    >
      <div class="d-flex flex-column align-center mt-5">
        <v-img
          :width="100"
          cover
          src="/png/logo.png"
        ></v-img>
      </div>
      <v-card-text class="mt-12">
        <LoginForm  />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'clean',
  name: 'Inicio de sesión',
  path: '/login'
})
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  @include bgImg("assets/img/bgMain.jpg", center, center, cover);
  .opacity {
    @include backgroundTransparency($white, 0.45);
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }
}
</style>
