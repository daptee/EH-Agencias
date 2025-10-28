interface LoginResponse {
  message: string
  token?: string | null
}

interface RegisterResponse {
  message: string
  data: {
    client_type_id: number
    name: string
    lastName: string
    email: string
    password: string
    phone: string
    cuit: string | null
    status_id: number
    updated_at: string
    created_at: string
    id: number
    client_type: {
      id: number
      name: string
      created_at: string
      updated_at: string
      deleted_at: string | null
    }
  }
  metadaData: any | null
}

export const login = async (params: { email: string; password: string }) => {
  const response = ref<LoginResponse>()

  try {
    const config = useRuntimeConfig()
    const res: LoginResponse = await $fetch(
      `${config.public.API_URL}/api/login_super_admin`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: {
          email: params.email,
          password: params.password,
        },
      },
    )

    response.value = res
    return res
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al iniciar sesión'
  }
}

export const register = async (params: {
  email: string
  name: string
  lastname: string
  password: string
  phone: string | null
  notifications: boolean
}) => {
  const response = ref<RegisterResponse>()

  try {
    const config = useRuntimeConfig()
    const res: RegisterResponse = await $fetch(
      `${config.public.API_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: {
          email: params.email,
          name: params.name,
          lastName: params.lastname,
          password: params.password,
          phone: params.phone,
          notifications: params.notifications,
        },
      },
    )

    response.value = res
    return res
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al iniciar sesión'
  }
}

export const forgotPassword = async (params: { email: string }) => {
  const response = ref<RegisterResponse>()

  try {
    const config = useRuntimeConfig()
    const res: RegisterResponse = await $fetch(
      `${config.public.API_URL}/auth/client-forgot-password`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: {
          email: params.email,
        },
      },
    )

    response.value = res
    return res
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al iniciar sesión'
  }
}
