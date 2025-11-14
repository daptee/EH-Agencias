<template>
  <v-app style="width: 100vw; max-width: 100vw">
    <AppMenuNav />
    <v-main class="main">
      <AppHeader />
      <NuxtPage class="nuxt-page" />
      <AppFooter />
    </v-main>
    <ToolkitLoading />
  </v-app>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}

.nuxt-page {
  flex: 1 0 auto;
}
</style>
