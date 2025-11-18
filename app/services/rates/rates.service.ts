import type { Rate } from '~/types/RatesServices'

export const getRates = async (): Promise<Rate[]> => {
  try {
    const config = useRuntimeConfig()
    const response: Rate[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/Tarifas`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener tarifas'
  }
}
