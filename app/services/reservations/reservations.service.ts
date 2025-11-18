import type {
  ReservationRequest,
  Reservation,
  ReservationDetail,
  ReservationDetailHistory,
  ReservationDetailHistoryResponse,
  AvailabilityRequest,
  AvailabilityResponse,
} from '~/types/ReservationsService'
import type {
  CreateReservationRequest,
  CreateReservationResponse,
} from '~/types/RoomsServices'

export const fetchReservations = async (
  params: ReservationRequest,
): Promise<Reservation[]> => {
  try {
    const config = useRuntimeConfig()
    const response: Reservation[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/Reservas`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        params: {
          AG: params.agency_code,
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener las reservas'
  }
}

export const fetchReservationDetail = async (
  RSV: string,
): Promise<ReservationDetail> => {
  try {
    const config = useRuntimeConfig()
    const response: ReservationDetail = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/ReservaxCodigo`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        params: {
          RSV: RSV,
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener el detalle de la reserva'
  }
}

export const fetchReservationDetailHistory = async (
  RSV: string,
): Promise<ReservationDetailHistory> => {
  try {
    const config = useRuntimeConfig()
    const response: ReservationDetailHistoryResponse = await $fetch(
      `${config.public.API_URL}/api/reservations/by/reservation_number/${RSV}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    return response?.reservation ?? []
  } catch (error: any) {
    throw (
      error?.data?.message ??
      'Error al obtener el historial del detalle de la reserva'
    )
  }
}

export const getAvailability = async (
  params: AvailabilityRequest,
): Promise<AvailabilityResponse[]> => {
  try {
    const config = useRuntimeConfig()
    const response: AvailabilityResponse[] = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/Disponibilidad`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        params: {
          FECHAD: params.dateFrom,
          FECHAH: params.dateTo,
        },
      },
    )

    return response
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al obtener disponibilidad'
  }
}

export const createReserve = async (params: CreateReservationRequest) => {
  const response = ref<any>()
  const auth = useAuthStore()
  const token = auth.token

  try {
    const config = useRuntimeConfig()
    const res: any = await $fetch(
      `${config.public.API_URL}/api/internal-api-eh/CreaReservaAgencias`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: params,
      },
    )

    response.value = res
    return res
  } catch (error: any) {
    throw error?.data?.message ?? 'Error al crear reserva'
  }
}
