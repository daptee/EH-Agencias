import type { Nations } from '~/types/Nations'

export const getNations = async (): Promise<Nations[]> => {
  try {
    const config = useRuntimeConfig()
    const response: Nations[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/Naciones`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener nacionalidades'
  }
}
