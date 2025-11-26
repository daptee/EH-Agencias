export interface Reservation {
  AGENCIA: string
  CUANTOS: string
  DESDE: string
  ESTADO: string
  FECHA_COMPRA: string
  HABITACION: string
  HASTA: string
  NOMBRE: string
  ORDEN_EXTERNA: string
  ORIGEN_WEB: string
  PLATAFORMA_EXTERNA: string
  REALIZO_CHECKIN: string
  REALIZO_CHECKOUT: string
  RESERVA: string
  RESIDE_PAIS: string
  VOL_ORDEN: string
}

export interface ReservationRequest {
  agency_code: string
  fromDate?: string
  toDate?: string
  roomId?: string
  status?: string
}

export interface ReservationDetail {
  CODIGO_INGRESO: string
  CUANTOS: string
  DNICUIT: string
  DNICUIT_TIPO: string
  EMAIL_CONTACTO: string
  EMAIL_NOTIFICACIONES: string
  ESTADO: string
  FAC_A_CUIT: string
  FAC_A_RSOCIAL: string
  FAC_A_SFISCAL: string
  FECHA_NACIMIENTO: string
  HABITACION: string
  IMPORTE_ADICIONAL: string
  IMPORTE_COBRADO: string
  NOMBRE: string
  ORDEN_EXTERNA: string
  ORIGEN_WEB: string
  PASAJEROS: Passenger[]
  PLATAFORMA_EXTERNA: string
  REALIZO_CHECKIN: string
  REALIZO_CHECKOUT: string
  RESERVA: string
  RESERVA_DESDE: string
  RESERVA_FECHA: string
  RESERVA_HASTA: string
  RESIDE_CPOSTAL: string
  RESIDE_DIRECCION: string
  RESIDE_ESTADO: string
  RESIDE_LOCALIDAD: string
  RESIDE_PAIS: string
  TARJ_NUMERO: string
  TARJ_TITULAR: string
  TARJ_VCMTO: string
  TELEFONO_CONTACTO: string
  TRANSACCION_NRO: string
  VOL_ORDEN: string
}

export interface Passenger {
  DOCUMENTO: string
  EDAD: string
  FNACIMIENTO: string
  ID: string
  NACIONALIDAD: string
  NACIONALIDADD: string
  NOMBRE: string
  TIPO: string
}

export interface Status {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface StatusHistoryItem {
  id: number
  reservation_id: number
  status_id: number
  created_at: string
  updated_at: string
  status: Status
}

export interface ReservationDetailHistory {
  id: number
  reservation_number: string
  status_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  status_history: StatusHistoryItem[]
  rejected_history: any[]
}

export interface ReservationDetailHistoryResponse {
  reservation: ReservationDetailHistory
}

export interface AvailabilityRequest {
  dateFrom: string
  dateTo: string
}

export interface AvailabilityResponse {
  HAB: string
  DISP: string
}
