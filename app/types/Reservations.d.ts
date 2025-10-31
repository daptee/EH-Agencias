export interface Rerservation {
  id: number
}

export interface ReservationData {
  personalData: PersonalData
}

export interface PersonalData {
  name: string
  lastName: string
  birthDate: string
  phone: string
  dni: string
  email: string
}
