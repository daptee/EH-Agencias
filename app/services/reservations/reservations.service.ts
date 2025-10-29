import type { Rerservation } from "~/types/Reservations"

export const fetchReservations = async (): Promise<Rerservation[]> => {
  try {
    const config = useRuntimeConfig()
    const response: Rerservation[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/Reservas`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener las reservas'
  }
}
