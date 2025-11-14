import type { Room } from '~/types/RoomsServices'

export const getRooms = async (): Promise<Room[]> => {
  try {
    const config = useRuntimeConfig()
    const response: Room[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/Habitaciones`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener habitaciones'
  }
}
