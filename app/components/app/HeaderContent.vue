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
              <v-icon color="ultraLightGrey" @click="provideTitle">$search</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-spacer />

    <v-btn color="transparent" elevation="0" @click.stop="logout">
      <v-icon class="ml-2" size="26">$exit</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const searchData = ref<string>('')

const provideTitle = () => console.log('headerSearch')
const deleteFilter = () => (searchData.value = '')
const logout = () => console.log('logout')
</script>

<style lang="scss" scoped>
.search-input {
  border-radius: 100px !important;
  overflow: hidden;

  .v-field__field {
    border-radius: 100px !important;
  }

  // Cambiar color de fondo al hacer focus
  &:focus-within .v-field__overlay {
    background-color: #ff0000 !important; // o usa tu variable SCSS
    opacity: 1 !important;
  }
}

</style>
