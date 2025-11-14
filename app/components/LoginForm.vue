<template>
  <form
    class="d-flex flex-column"
    novalidate
    autocomplete="new-password"
    @submit.prevent="onSubmit()"
  >
    <v-text-field
      v-model="email"
      placeholder="Usuario"
      :error-messages="errors.email"
      required
      variant="underlined"
      autocomplete="new-email"
    />

    <v-text-field
      v-model="password"
      placeholder="Contraseña"
      :error-messages="errors.password"
      required
      class="font-weight-medium"
      :append-inner-icon="showPassword ? 'mdi-collapse' : 'mdi-collapse'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
      variant="underlined"
      autocomplete="new-password"
    />

    <v-btn
      type="submit"
      large
      depressed
      block
      class="rounded-lg body-1 mt-4 font-weight-bold white--text"
      color="primary"
      :loading="isLoading"
    >
      ingresar
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { verifyAgency } from '~/services/auth/auth.service'

const auth = useAuthStore()
const isLoading = ref(false)
const showPassword = ref(false)
const { showToast } = useToast()

const loginSchema = z.object({
  email: z
    .string({ required_error: 'El campo email es obligatorio' })
    .email({ message: 'El email no es válido' })
    .min(1, { message: 'El campo email es obligatorio' }),
  password: z
    .string({ required_error: 'El campo contraseña es obligatorio' })
    .min(1, { message: 'El campo contraseña es obligatorio' }),
})

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  const params = {
    email: values.email,
    password: values.password,
  }

  isLoading.value = true
  try {
    await auth.setLogin(params)

    const currentUser = auth.user
    if (!currentUser) {
      await auth.setLogout()
      throw new Error('Error al iniciar sesión')
    }

    const agency = await verifyAgency(currentUser.agency_code)

    if (!agency || agency.ESTADO !== 'A') {
      await auth.setLogout()
      throw new Error('Agencia no autorizada')
    }

    await navigateTo('/')
    showToast('Sesión iniciada correctamente', 'success')
  } catch (err: any) {
    showToast(err.message || err, 'error')
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss">
.v-field--variant-filled .v-field__overlay {
  background-color: transparent !important;
}
</style>
