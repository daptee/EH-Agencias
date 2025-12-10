<template>
  <div class="w-100 d-flex flex-row justify-between align-center">
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="searchData"
            placeholder="Buscar..."
            variant="solo-filled"
            clearable
            background-color="lightGrey"
            hide-details
            density="comfortable"
            class="search-input"
            @keyup.enter="provideTitle"
            @click:clear="deleteFilter"
          >
            <template #append-inner>
              <v-icon color="ultraLightGrey" @click="provideTitle"
                >$search</v-icon
              >
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-spacer />

    <ToolkitContactModal />
    <v-btn color="transparent" elevation="0" @click.stop="logout">
      <v-icon class="ml-2" size="26">$exit</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const uiStore = useUiStore()
const { handleAppLoading } = uiStore
const { searchData } = storeToRefs(uiStore)

const provideTitle = () => console.log('headerSearch')
const deleteFilter = () => (searchData.value = '')
const logout = async () => {
  try {
    handleAppLoading(true)
    await auth.setLogout()
  } finally {
    navigateTo('/login')
    handleAppLoading(false)
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  border-radius: 100px !important;
  overflow: hidden;

  .v-field__field {
    border-radius: 100px !important;
  }
}
</style>
