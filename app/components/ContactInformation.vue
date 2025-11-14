<template>
  <v-card elevation="0" class="py-4 px-8 rounded-lg">
    <span class="title-card">Datos de contacto</span>
    <section class="mt-4">
      <v-row>
        <v-col cols="12" sm="4">
          <span class="title-span">Nombre: </span>
          <span class="value-span">{{
            props.name === '' ? '-' : props.name
          }}</span>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="title-span">Teléfono: </span>
          <span class="value-span">{{
            props.phone === '' ? '-' : props.phone
          }}</span>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="title-span">DNI: </span>
          <span class="value-span">{{
            props.dni === '' ? '-' : props.dni
          }}</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <span class="title-span">Email: </span>
          <span class="value-span">{{
            props.email === '' ? '-' : props.email
          }}</span>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="title-span">Nacionalidad: </span>
          <span class="value-span">{{
            props.nationality === '' ? '-' : props.nationality
          }}</span>
        </v-col>
        <v-col cols="12" sm="4">
          <span class="title-span">Localidad: </span>
          <span class="value-span">{{
            props.locality === '' ? '-' : props.locality
          }}</span>
        </v-col>
      </v-row>
    </section>
  </v-card>
</template>

<script setup lang="ts">
import type { ContactInformationProps } from '~/types/ContactInformation'

const props = defineProps<ContactInformationProps>()
</script>
