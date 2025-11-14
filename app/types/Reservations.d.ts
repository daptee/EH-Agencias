export interface ReservationData {
  personalData: PersonalData
  guests: Guest[]
  residencyData: ResidencyData
}
export interface PersonalData {
  name: string
  lastName: string
  birthDate: string
  phone: string
  dniType: string
  dni: string
  email: string
}

export interface Guest {
  country: string
  name: string
  lastName: string
  birthDate: string
  dni: String
}

export interface ResidencyData {
  country: string
  postalCode: string
  address: string
  locality: string
  estimatedArrival?: string
  specialComments?: string
}
