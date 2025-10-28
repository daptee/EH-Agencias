<template>
  <v-app>
    <div class="layout-container">
      <aside class="sidebar">
        <AppMenuNav />
      </aside>

      <div class="main-content">
        <AppHeader />
        <NuxtPage />
      </div>
    </div>
  </v-app>
</template>

<style scoped lang="scss">
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  background-color: white;
  border-right: 1px solid #e0e0e0;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  > :first-child {
    flex-shrink: 0;
  }

  v-main {
    flex: 1;
    overflow-y: auto;
    background-color: #fafafa;
  }
}
</style>
