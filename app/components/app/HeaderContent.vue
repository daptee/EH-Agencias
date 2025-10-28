<template>
  <div class="w-100 d-flex flex-row justify-between align-center">
    <v-container>
      <v-row>
        <v-col cols="10" sm="8" md="4">
          <v-text-field
            v-model="searchData"
            placeholder="Buscar..."
            height="56px"
            solo
            background-color="bgsearch"
            append-icon="$search"
            flat
            hide-details
            clearable
            class="text-subtitle-1 font-weight-medium rounded-pill"
            @click:append="headerSearch"
            @click:clear="clearSearch"
            @keyup.enter="headerSearch"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-spacer />
    <v-btn
      color="transparent"
      elevation="0"
      fab
      @click.stop="logout"
    >
      <v-icon class="ml-2" size="26">$exit</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const searchData = ref<string>('')

const headerSearch = () => {
  console.log('headerSearch')
}

const clearSearch = () => {
  searchData.value = ''
}

const logout = () => {
  console.log('logout')
}
</script>

<style lang="scss" scoped>
.sm_and_up-width {
  min-width: 378px;
}
.xs_only-width {
  width: 220px;
}
::v-deep {
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 0 24px;
  }
}
</style>
