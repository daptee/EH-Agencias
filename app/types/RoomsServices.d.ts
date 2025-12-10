export interface Room {
  CARACTERISTICAS: string
  CARACTERISTICAS_ENG: string
  CARACTERISTICAS_POR: string
  DESCRIPCION: string
  DESCRIPCION_ENG: string
  DESCRIPCION_POR: string
  DETALLE: string
  ESTADO: string
  ID: string
}

export interface AvailableRooms {
  id: string
  capacity: string
  price: string
  services: string[]
}

export interface CreateReservationRequest {
  DESDE: string
  HASTA: string
  HAB: string
  CUANTOS: string
  PAX: string
  TELEFONO_CONTACTO: string
  EMAIL_CONTACTO: string
  EMAIL_NOTIFICACIONES: string
  VOL_ORDEN: string
  IMPORTE_COBRADO: string
  IMPORTE_ADICIONAL?: string
  TRANSACCION_NRO?: string
  FAC_A_CUIT?: string
  FAC_A_RSOCIAL?: string
  FAC_A_SFISCAL?: string
  DNICUIT: string
  DNICUIT_TIPO: string
  FECHA_NACIMIENTO: string
  ORIGEN_WEB: string
  PLATAFORMA_EXTERNA?: string
  ORDEN_EXTERNA?: string
  AG: string
  ARRIBO: string
  TARJNUM?: string
  TARJVTO?: string
  TARJTIT?: string
  TARJSEG?: string
  RPAIS: string
  RCPOSTAL: string
  RLOCALIDAD: string
  RESTADO?: string
  RDOMIC: string
  ROBSV: string
  pasajeros: Pasajero[]
}

export interface CreateReservationResponse {
  RESERVA: string
  RESULT: string
}

export interface InitReserveParams {
  reservation_number: string
  agency_user_id: string
}

export interface InitReserveResponse {
  message: string
  reservation: {
    agency_user_id: string | null
    created_at: string | null
    deleted_at: string | null
    id: number
    reservation_number: string
    status: {
      created_at: string | null
      id: number
      name: string
      updated_at: string | null
    }
    status_id: number
    updated_at: string | null
  }
}
export interface CancelReserveParams {
  reservation_number: string
}

export interface ConfirmReserve {
  number_of_passengers: number
  reservation_id: number
  room_number: string
  agency_type: number
  user: {
    check_in: string
    check_out: string
    email: string
    last_name: string
    name: string
    phone: string
  }
}
