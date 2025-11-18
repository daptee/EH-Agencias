import type {
  AgencyResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
} from '~/types/Auth'

export const login = async (params: LoginRequest) => {
  const response = ref<LoginResponse>()

  try {
    const config = useRuntimeConfig()
    const res: LoginResponse = await $fetch(
      `${config.public.API_URL}/api/agency/login`,
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

export const logout = async () => {
  const response = ref<LogoutResponse>()
  const auth = useAuthStore()
  const token = auth.token

  try {
    const config = useRuntimeConfig()
    const res: LogoutResponse = await $fetch(
      `${config.public.API_URL}/api/agency/logout`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    response.value = res
    return res
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al cerrar sesión'
  }
}

export const verifyAgency = async (agencyCode: string) => {
  try {
    const config = useRuntimeConfig()

    const response: AgencyResponse[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/Agencias?AG=${agencyCode}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response.length ? response[0] : null
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al verificar agencia'
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
      `${config.public.API_URL}/api/agency/register`,
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
    throw error?.data?.message ?? 'Error al registrar usuario'
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
    throw error?.data?.message ?? 'Error al intentar restablecer la contraseña'
  }
}
